

from cryptography.fernet import Fernet
from passlib.context import CryptContext
from app.key_manager import load_key_and_salt, load_key_history, get_latest_key_and_version

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Always load the latest key on import
FERNET_KEY, FERNET_SALT = load_key_and_salt()
fernet = Fernet(FERNET_KEY)

def hash_secret(secret):
    return pwd_context.hash(secret)

def hash_chats(message):
    return pwd_context.hash(message)


def verify_secret(secret, hashed_secret):
    return pwd_context.verify(secret, hashed_secret)

def verify_chat(message, hash_chats):
    return pwd_context.verify(message, hash_chats)


def encrypt_chat(message: str):
    # Use the latest key and version
    global fernet, FERNET_KEY, FERNET_SALT
    FERNET_KEY, FERNET_SALT = load_key_and_salt()
    key, version = get_latest_key_and_version()
    fernet = Fernet(key)
    encrypted = fernet.encrypt(message.encode()).decode()
    return encrypted, version

def decrypt_chat(encrypted_message: str, key_version: int = None) -> str:
    # If key_version is provided, use only that key; else try all
    from cryptography.fernet import InvalidToken
    if key_version is not None:
        key_history = load_key_history()
        for v, key in key_history:
            if v == key_version:
                try:
                    f = Fernet(key)
                    return f.decrypt(encrypted_message.encode()).decode()
                except InvalidToken:
                    break
        raise ValueError("Decryption failed with provided key version.")
    else:
        key_history = load_key_history()
        for v, key in key_history:
            try:
                f = Fernet(key)
                return f.decrypt(encrypted_message.encode()).decode()
            except InvalidToken:
                continue
        raise ValueError("Decryption failed with all known keys.")