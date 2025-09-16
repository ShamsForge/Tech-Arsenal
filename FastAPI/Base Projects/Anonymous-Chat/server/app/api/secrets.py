from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.utils import hash_secret, verify_secret
from app.key_manager import get_latest_key_and_version
from app.models.models import Secret
from app.database import get_db

from ..key_manager import rotate_fernet_key

router = APIRouter(
    prefix="/secret",
    tags=["secret"]
)

@router.post("/")
def create_secret(secret: str, db: Session = Depends(get_db)):
    #check if intruder64 message is passed
    if secret == "intruder64":
        rotate_fernet_key()
        return ["Key Changed!"]

    key, key_version = get_latest_key_and_version()
    db_secrets = db.query(Secret).all()
    for s in db_secrets:
        if not s.secret:
            continue
        try:
            if verify_secret(secret, s.secret):
                raise HTTPException(status_code=400, detail="Secret already exists")
        except Exception:
            continue
    # Create a new secret with key_version
    hashed_secret = hash_secret(secret)
    new_secret = Secret(secret=hashed_secret, key_version=key_version)
    db.add(new_secret)
    db.commit()
    db.refresh(new_secret)
    return {"message": f"New secret is created as: {secret}", "id": new_secret.id, "key_version": key_version}

@router.delete("/delete/{secret_id}")
def delete_secret(secret: str, db: Session = Depends(get_db)):
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
    db.delete(matched_secret)
    db.commit()
    return {"Message": f"Secret deleted, Good Business", "id": matched_secret.id}