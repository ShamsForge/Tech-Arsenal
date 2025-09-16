from fastapi import FastAPI
from app.api import chat, incognito, secrets
from app.configs import settings
from app.database import Base, engine
from app import key_manager  # Ensure key rotation runs on startup

# Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(forms.router)


@app.get("/health", tags=['health'])
def health():
    return {"status": "ok"}


