from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Secret, Incognito 
from typing import Dict, List
from app.utils import hash_secret, verify_secret
from app.key_manager import get_latest_key_and_version
from app.rotate_key import rotate_fernet_key

router = APIRouter(
    prefix="/incognito",
    tags=["incognito"]
)


# In-memory store for incognito messages
incognito_sessions: Dict[str, List[str]] = {}

@router.post("/{secret}")
def incognito_message(secret: str, message: str, db: Session = Depends(get_db)):
    # Secure: fetch all secrets and verify
    db_secrets = db.query(Secret).all()
    matched_secret = None
    for s in db_secrets:
        if not s.secret:
            continue
        try:
            if verify_secret(secret, s.secret):
                matched_secret = s
                break
        except Exception:
            continue
    if not matched_secret:
        raise HTTPException(status_code=404, detail="Secret not found")

    #check if intruder64 message is passed
    if message == "intruder64":
        rotate_fernet_key()
        return []

    # Store message in memory (append, don't overwrite)
    if secret not in incognito_sessions:
        incognito_sessions[secret] = []
    incognito_sessions[secret].append(message)
    # Return the full message history for this secret
    return {"messages": incognito_sessions[secret]}


@router.post("/{secret}/disable")
def disable_incognito(secret: str, db: Session = Depends(get_db)):
    # Secure: fetch all secrets and verify
    db_secrets = db.query(Secret).all()
    matched_secret = None
    for s in db_secrets:
        if not s.secret:
            continue
        try:
            if verify_secret(secret, s.secret):
                matched_secret = s
                break
        except Exception:
            continue
    if not matched_secret:
        raise HTTPException(status_code=404, detail="Secret not found")
    # Remove messages for this secret
    incognito_sessions.pop(secret, None)
    return {"status": f"Incognito chat disabled for {secret}. Messages deleted."}