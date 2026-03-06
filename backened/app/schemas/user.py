from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    password: Optional[str] = None
    email: Optional[EmailStr] = None

class User(UserBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
