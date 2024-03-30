from google.cloud import storage

from src.config import settings

client = storage.Client()
bucket = client.get_bucket(settings.GCS_BUCKET_NAME)
