from sentence_transformers import SentenceTransformer, util
import torch
import re

class ResumeAnalyzer:
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(model_name)

    def preprocess_text(self, text: str) -> str:
        # Lowercase and remove extra whitespace
        text = text.lower()
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def calculate_score(self, resume_text: str, jd_text: str) -> dict:
        resume_clean = self.preprocess_text(resume_text)
        jd_clean = self.preprocess_text(jd_text)

        # Generate embeddings
        resume_embedding = self.model.encode(resume_clean, convert_to_tensor=True)
        jd_embedding = self.model.encode(jd_clean, convert_to_tensor=True)

        # Compute cosine similarity
        cosine_score = util.cos_sim(resume_embedding, jd_embedding).item()
        
        # Scale score to 0-100
        ats_score = round(cosine_score * 100, 2)
        
        # Simple keyword-based skill gap (Improve this later with NLP)
        jd_keywords = set(re.findall(r'\b\w{3,}\b', jd_clean))
        resume_keywords = set(re.findall(r'\b\w{3,}\b', resume_clean))
        
        missing_skills = list(jd_keywords - resume_keywords)
        # Sort and limit missing skills for better UI
        missing_skills = sorted(missing_skills, key=len, reverse=True)[:10]

        return {
            "score": ats_score,
            "missing_skills": missing_skills,
            "match_level": self._get_match_level(ats_score)
        }

    def _get_match_level(self, score: float) -> str:
        if score >= 85: return "Excellent"
        if score >= 70: return "Good"
        if score >= 50: return "Average"
        return "Poor"
