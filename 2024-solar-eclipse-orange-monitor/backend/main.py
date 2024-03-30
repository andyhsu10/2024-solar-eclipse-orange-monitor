from flask import jsonify

from src import create_app
from src.config import settings
from src.data.routes import data_bp

app = create_app()

# Register routes
app.register_blueprint(data_bp, url_prefix="/data")


@app.errorhandler(404)
def not_found():
    return jsonify({"message": "Page not found"}), 404


@app.route("/")
def hello_world():
    return jsonify({"message": "Hello World!"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=settings.PORT)
