# This script can be run manually to rotate the Fernet key immediately.
from app.key_manager import rotate_fernet_key

if __name__ == "__main__":
    rotate_fernet_key()
    print("Fernet key rotated!")
