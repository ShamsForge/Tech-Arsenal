import os
import base64
from cryptography.fernet import Fernet
from datetime import datetime, timedelta
import threading
import time



KEY_FILE = os.path.join(os.path.dirname(__file__), 'fernet.key')
SALT_FILE = os.path.join(os.path.dirname(__file__), 'fernet.salt')
KEY_HISTORY_FILE = os.path.join(os.path.dirname(__file__), 'fernet.key.history')
KEY_VERSION_FILE = os.path.join(os.path.dirname(__file__), 'fernet.key.versions')


def generate_salt(length: int = 16) -> bytes:
    return os.urandom(length)

def generate_fernet_key(salt: bytes = None) -> bytes:
    if salt is None:
        salt = generate_salt()
    key = base64.urlsafe_b64encode(os.urandom(32))
    return key, salt

def save_key_and_salt(key: bytes, salt: bytes):
    with open(KEY_FILE, 'wb') as f:
        f.write(key)
    with open(SALT_FILE, 'wb') as f:
        f.write(salt)
    # Save key to history and versioning
    history = []
    versions = []
    if os.path.exists(KEY_HISTORY_FILE):
        with open(KEY_HISTORY_FILE, 'rb') as f:
            history = f.read().split(b'\n')
        history = [h for h in history if h]
    if os.path.exists(KEY_VERSION_FILE):
        with open(KEY_VERSION_FILE, 'r') as f:
            versions = [int(x) for x in f.read().split('\n') if x]
    
    new_version = (versions[-1] + 1) if versions else 1
    history.append(key)
    versions.append(new_version)
    #save
    with open(KEY_HISTORY_FILE, 'wb') as f:
        f.write(b'\n'.join(history))
    with open(KEY_VERSION_FILE, 'w') as f:
        f.write('\n'.join(str(v) for v in versions))
def load_key_history():
    if not os.path.exists(KEY_HISTORY_FILE) or not os.path.exists(KEY_VERSION_FILE):
        return []
    with open(KEY_HISTORY_FILE, 'rb') as f:
        history = f.read().split(b'\n')
    with open(KEY_VERSION_FILE, 'r') as f:
        versions = [int(x) for x in f.read().split('\n') if x]
    return list(zip(versions, [h for h in history if h]))

def get_latest_key_and_version():
    if not os.path.exists(KEY_FILE) or not os.path.exists(KEY_VERSION_FILE):
        key, salt = generate_fernet_key()
        save_key_and_salt(key, salt)
    with open(KEY_FILE, 'rb') as f:
        key = f.read()
    with open(KEY_VERSION_FILE, 'r') as f:
        versions = [int(x) for x in f.read().split('\n') if x]
    return key, versions[-1] if versions else 1

def load_key_and_salt():
    if not os.path.exists(KEY_FILE) or not os.path.exists(SALT_FILE):
        key, salt = generate_fernet_key()
        save_key_and_salt(key, salt)
        return key, salt
    with open(KEY_FILE, 'rb') as f:
        key = f.read()
    with open(SALT_FILE, 'rb') as f:
        salt = f.read()
    return key, salt

def rotate_fernet_key():
    key, salt = generate_fernet_key()
    save_key_and_salt(key, salt)
    print(f"[Key Rotation] New Fernet key generated at {datetime.now()}")
    return key, salt

def schedule_key_rotation(interval_hours=6):
    def rotate_periodically():
        while True:
            time.sleep(interval_hours * 3600)
            rotate_fernet_key()
    t = threading.Thread(target=rotate_periodically, daemon=True)
    t.start()

# On startup
rotate_fernet_key()
schedule_key_rotation()
