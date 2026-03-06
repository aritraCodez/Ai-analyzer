from jose import jwt, JWTError
from fastapi import HTTPException, status
from app.core.config import settings

def verify_token(token: str):
    try:
        # Use SUPABASE_JWT_SECRET for decoding Supabase tokens
        payload = jwt.decode(token, settings.SUPABASE_JWT_SECRET, algorithms=["HS256"], options={"verify_aud": False})
        return payload
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
