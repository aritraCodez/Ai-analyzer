import PyPDF2
from docx import Document
import io

class TextExtractor:
    @staticmethod
    def extract_from_pdf(file_content: bytes) -> str:
        text = ""
        try:
            reader = PyPDF2.PdfReader(io.BytesIO(file_content))
            for page in reader.pages:
                text += page.extract_text() + "\n"
        except Exception as e:
            print(f"Error extracting PDF: {e}")
        return text

    @staticmethod
    def extract_from_docx(file_content: bytes) -> str:
        text = ""
        try:
            doc = Document(io.BytesIO(file_content))
            for para in doc.paragraphs:
                text += para.text + "\n"
        except Exception as e:
            print(f"Error extracting DOCX: {e}")
        return text

    @classmethod
    def extract(cls, file_content: bytes, filename: str) -> str:
        if filename.lower().endswith('.pdf'):
            return cls.extract_from_pdf(file_content)
        elif filename.lower().endswith('.docx'):
            return cls.extract_from_docx(file_content)
        return ""
