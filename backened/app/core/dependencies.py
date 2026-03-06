from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.auth import verify_token

security = HTTPBearer()

async def get_current_user(auth: HTTPAuthorizationCredentials = Depends(security)):
    """
    Extracts the user from the Supabase JWT token.
    """
    token = auth.credentials
    payload = verify_token(token)
    
    # Supabase JWT payload contains 'sub' as the user ID
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID not found in token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # You can also extract metadata or email if needed
    # user_email = payload.get("email")
    
    return {"id": user_id, "email": payload.get("email"), "metadata": payload.get("user_metadata")}
