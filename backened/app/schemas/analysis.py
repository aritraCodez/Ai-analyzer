from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AnalysisResultBase(BaseModel):
    user_id: str
    resume_id: str
    jd_text: str
    ats_score: float
    missing_skills: List[str]
    match_level: str
    is_passed: Optional[bool] = False

class AnalysisResultCreate(BaseModel):
    user_id: str
    resume_id: str
    jd_text: str
    ats_score: float
    missing_skills: List[str]
    match_level: str
    is_passed: Optional[bool] = False

class AnalysisResult(AnalysisResultBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
