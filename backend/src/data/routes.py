from flask import Blueprint, abort

data_bp = Blueprint("blueprint", __name__)


@data_bp.route("", methods=["POST"])
def create_data():
    abort(404)
