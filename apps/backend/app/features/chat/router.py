from fastapi import APIRouter
from app.core.logging import logger
from uuid import uuid4
from random import choices

from .schemas import Message

router = APIRouter(prefix="/chat")

@router.post("/", response_model=Message)
async def chat(payload: Message):
    logger.info(f"Chat request received: {payload}")
    responses = [
        "Hi there!",
        "How can I help you today?",
        "What's on your mind?",
        "I'm here to help you!",
    ]
    return Message(id=str(uuid4()), content=choices(responses, k=1)[0], role="assistant")
