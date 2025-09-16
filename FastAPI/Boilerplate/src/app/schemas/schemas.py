from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
from typing import Annotated

class SecretCreate(BaseModel):
    id: int
    Secret: Annotated[str, Field(min_length=2, max_length=20, examples=["TopSecretCodeToShareWithYourFriends6688"])]

    class Config:
        orm_mode = True
