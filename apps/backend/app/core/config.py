from typing import Literal
from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Backend API"
    API_V1_PATH: str = "/api"
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000"]
    LOG_LEVEL: Literal['CRITICAL','FATAL','WARNING','WARN','INFO','DEBUG','NOTSET'] = "DEBUG"
    
    # Environment
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    

settings = Settings() 