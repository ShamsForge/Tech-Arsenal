from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from passlib.context import CryptContext

from app.models.models import Secret, Chat
from app.schemas.schemas import ChatSchema
from app.database import get_db
from app.utils import encrypt_chat, decrypt_chat
from app.rotate_key import rotate_fernet_key

router = APIRouter(
    prefix="/chat",
    tags=["chat"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_secret(secret, hashed_secret):
    return pwd_context.verify(secret, hashed_secret)


@router.post("/{secret}", response_model=list[ChatSchema])
def chat_message(secret: str, message: str, db: Session = Depends(get_db)):
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

    encrypted_chat, key_version = encrypt_chat(message)

    # Create a new chat entry with key_version
    new_chat = Chat(stored_chats=encrypted_chat, secret_id=matched_secret.id, key_version=key_version)
    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)

    # Return the chat history for the secret, decrypting with correct key_version
    chats = db.query(Chat).filter(Chat.secret_id == matched_secret.id).all()
    for chat in chats:
        chat.stored_chats = decrypt_chat(chat.stored_chats, getattr(chat, 'key_version', None))
    return chats