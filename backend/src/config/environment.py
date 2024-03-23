from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # environment variables
    ENVIRONMENT: str = "development"
    DEBUG: bool = False
    PORT: int = 8080

    API_SECRET: str

    GCP_PROJECT_ID: str
    GCS_BUCKET_NAME: str

    # config
    model_config = SettingsConfigDict(
        case_sensitive=True, env_file=".env", extra="ignore"
    )
