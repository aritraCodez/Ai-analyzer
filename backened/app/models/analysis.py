from sqlalchemy import Column, String, DateTime, Float, ForeignKey, JSON, Boolean, Text
from sqlalchemy.sql import func
from app.db.database import Base

# SQLAlchemy Model
class AnalysisResultTable(Base):
    __tablename__ = "analysis_results"
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    resume_id = Column(String, ForeignKey("resumes.id"), nullable=False)
    jd_text = Column(Text, nullable=False)
    ats_score = Column(Float, nullable=False)
    missing_skills = Column(JSON, default=[])
    match_level = Column(String, nullable=True)
    is_passed = Column(Boolean, default=False) 
    created_at = Column(DateTime(timezone=True), server_default=func.now())
