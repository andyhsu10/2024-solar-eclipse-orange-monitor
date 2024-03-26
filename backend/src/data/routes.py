import hashlib
import json
from flask import Blueprint, jsonify, request

from src.config import settings
from src.firestore import db

data_bp = Blueprint("blueprint", __name__)


@data_bp.route("", methods=["POST"])
def create_data():
    auth_secret = request.headers.get("Authorization")
    received_checksum = request.headers.get("X-Checksum")
    if auth_secret != settings.API_SECRET:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    if not data:
        return jsonify({"error": "Empty JSON data"}), 400

    # Recompute checksum for validation
    payload_str = json.dumps(data, sort_keys=True, separators=(",", ":"))
    computed_checksum = hashlib.sha256(
        (payload_str + settings.API_SECRET).encode("utf-8")
    ).hexdigest()

    # Compare checksums
    if received_checksum != computed_checksum:
        return jsonify({"error": "Data integrity check failed"}), 400

    timestamp = data.get("ts")
    temperature = data.get("t")
    humidity = data.get("h")
    pressure = data.get("p")

    if (
        isinstance(timestamp, (int, float))
        and isinstance(temperature, (int, float))
        and isinstance(humidity, (int, float))
        and isinstance(pressure, (int, float))
    ):
        doc = db.collection(f"environmental_data_{settings.ENVIRONMENT}").document(
            str(timestamp)
        )
        doc_snapshot = doc.get()
        if not doc_snapshot.exists:
            doc.set(
                {
                    "t": temperature,
                    "h": humidity,
                    "p": pressure,
                    "version": settings.DATA_VERSION,
                }
            )
            last_three_digits = timestamp % 1000
            if last_three_digits < 500:
                # TODO: upload to GCS
                print(timestamp, last_three_digits)
                pass

        return jsonify({"message": "Data processed successfully"}), 200

    # Return a response
    return jsonify({"error": "Invalid JSON data"}), 400
