from sqlalchemy import Column, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

# SQLAlchemy Model
class ResumeTable(Base):
    __tablename__ = "resumes"
    id = Column(String, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    content = Column(Text, nullable=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship (Optional, depends on project complexity)
    # owner = relationship("UserTable", back_populates="resumes")
