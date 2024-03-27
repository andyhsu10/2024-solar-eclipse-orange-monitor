import hashlib
import json
import math
from flask import Blueprint, jsonify, request
from google.cloud.firestore import FieldFilter

from src.config import settings
from src.firestore import db

data_bp = Blueprint("blueprint", __name__)


@data_bp.route("", methods=["GET", "POST"])
def get_or_create_data():
    data_ref = db.collection(f"environmental_data_{settings.ENVIRONMENT}")
    # [POST] /data
    if request.method == "POST":
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
            doc = data_ref.document(str(timestamp))
            doc_snapshot = doc.get()
            if not doc_snapshot.exists:
                doc.set(
                    {
                        "t": temperature,
                        "h": humidity,
                        "p": pressure,
                        "vs": settings.DATA_VERSION,
                    }
                )
                last_three_digits = timestamp % 1000
                if last_three_digits < 500:
                    # TODO: upload to GCS
                    print(timestamp, last_three_digits)
                    pass

            return jsonify({"message": "Data processed successfully"}), 201

        # Return a response
        return jsonify({"error": "Invalid JSON data"}), 400

    # [GET] /data
    data = (
        data_ref.where(filter=FieldFilter("version", "==", settings.DATA_VERSION))
    ).get()
    interval = get_interval(len(data))
    response_data = list()
    for i in range(len(data) - 1, -1, -interval):
        d = data[i].to_dict()
        response_data.append(
            {
                "t": d.get("t"),
                "ts": int(data[i].id),
                "h": d.get("h"),
                "p": d.get("p"),
            }
        )
    return jsonify({"success": True, "data": response_data}), 200


def get_interval(num: int) -> int:
    if num <= 1000:
        return 1

    interval = math.floor(math.log10(num)) - 1
    return interval
