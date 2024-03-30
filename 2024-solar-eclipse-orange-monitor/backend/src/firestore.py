from google.cloud import firestore

from src.config import settings

db = firestore.Client(project=settings.GCP_PROJECT_ID)
