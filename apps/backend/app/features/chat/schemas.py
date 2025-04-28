from pydantic import BaseModel, Field
from typing import Literal
from uuid import uuid4

class Message(BaseModel):
    content: str
    role: Literal["user", "assistant"]
    id: str = Field(default_factory=lambda: str(uuid4()))