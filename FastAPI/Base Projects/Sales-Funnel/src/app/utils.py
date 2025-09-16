from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash(secret: str) -> str:
    return pwd_context.hash(secret)

def verify(secret: str, hashed_secret: str) -> bool:
    return pwd_context.verify(secret, hashed_secret)

