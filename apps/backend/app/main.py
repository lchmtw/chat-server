from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from types import FunctionType
from random import choices
import string

import structlog

from .core.config import settings
from .core.logging import logger

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_PATH}/openapi.json",
)

# Set up CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

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

@app.get("/health")
async def health_check():
    logger.debug("Health check called")
    return {"status": "healthy"} 