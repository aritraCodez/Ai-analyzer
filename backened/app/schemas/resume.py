from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ResumeBase(BaseModel):
    filename: str
    content: Optional[str] = None
    user_id: str

class ResumeCreate(BaseModel):
    filename: str
    content: Optional[str] = None
    user_id: str

class Resume(ResumeBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
