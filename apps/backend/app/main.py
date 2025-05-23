from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from types import FunctionType
from fastapi.openapi.utils import get_openapi
from random import choices
import string
import json
import structlog

from .core.config import settings
from .core.logging import logger
from .features.chat.router import router as chat_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_PATH}/openapi.json",
    
)

# Set up CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(chat_router)

@app.middleware("http")
async def add_logs_and_trace(request: Request, call_next: FunctionType):
    '''Generate a request id for each request and add it to the context.'''
    request_id="".join(choices(string.ascii_uppercase+string.digits,k=6))
    structlog.contextvars.bind_contextvars(path=request.url.path, request_id=request_id)
    try:
        result = await call_next(request)
        # Log the error if the status code is 400 or higher
        if hasattr(result, 'status_code') and result.status_code >= 400:
            logger.error(f"HTTP Error: {result.status_code}")
        return result
    except Exception as e:
        # Log the error if an exception is raised
        logger.error("Unexpected error occurred", exc_info=e)
        return Response(status_code=500, content="Internal Server Error")

@app.get("/")
async def root():
    logger.info("Root endpoint called")
    return {"message": "Welcome to the API"}

@app.get(f"{settings.API_V1_PATH}/health")
async def health_check():
    logger.debug("Health check called")
    return {"status": "healthy"} 

def get_openapi_json():
    openapi = get_openapi(
        title=settings.PROJECT_NAME,
        version="1.0.0",
        description="This is my API description",
        routes=app.routes,
        )
    with open("openapi.json", "w") as f:
        json.dump(openapi, f)
    return openapi

get_openapi_json()