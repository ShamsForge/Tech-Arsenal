from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, ConfigDict, EmailStr, Field
from sqlalchemy.sql.sqltypes import UUID


# Base User Models = 2
class UserBase(BaseModel):
    fullname: Annotated[str,
    Field(min_length=3, max_length=30,
    pattern=r"^[a-zA-Z\s]+$",
    examples=["Shams Joe"])]

    username:  Annotated[str,
    Field(min_length=3, max_length=20,
    pattern=r"^[a-zA-Z0-9_]+$",
    examples=["ShamsJoe_33"])]
    
    email: Annotated[EmailStr,
    Field(pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    examples=["user@userson.com"])]
    



class User(UserBase):

    user_uuid: UUID
    hashed_password: str
    
    country_code: Annotated[int,
    Field(ge=1, le=3,
    pattern=r"^\+\d{1,3}$",
    title="Country code")]
    
    phone_number: Annotated[int,
    Field(gt=9, lt=11, 
    pattern=r"^\d{10}$",
    title="Phone number")]
    
    recovery_email: Annotated[EmailStr | None,
    Field(pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    default=None,
    title="Recovery email used for account recovery",
    examples=["user@userson.com"])]
    
    
    created_at: datetime
    active: bool | None = True
    email_verified: bool | None = False
    superuser: bool | None = False
    is_deleted: bool | None = False






# CURD Schemas + internal schemas = 8

## UserCreate
class UserCreate(UserBase):
    model_config = ConfigDict(extra="forbid")

    password: Annotated[str,
    Field(pattern=r"^.{8,}|[0-9]+|[A-Z]+|[a-z]+|[^a-zA-Z0-9]+$",
    title='''Password must contain at least 8 characters,
    one uppercase letter,
    one lowercase letter,
    one number and one special character''',
    examples=["Str1ngst!"])]

class UserCreateInternal(UserBase):
    hashed_password: str


## UserUpdate
class UserUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    
    fullname: Annotated[str | None,
    Field(min_length=3, max_length=30,
    pattern=r"^[a-zA-Z\s]+$",
    default=None,
    examples=["Shams Joe"])]
    
    username: Annotated[str | None,
    Field(min_length=3, max_length=20,
    pattern=r"^[a-zA-Z0-9_]+$",
    default=None,
    examples=["ShamsJoe_33"])]

    email: Annotated[EmailStr | None,
    Field(pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    default=None,
    examples=["user@userson.com"])]

    country_code: Annotated[int | None,
    Field(ge=1, le=3,
    pattern=r"^\+\d{1,3}$",
    default=None,
    title="Country code")]

    phone_number: Annotated[int | None,
    Field(gt=9, lt=11, 
    pattern=r"^\d{10}$",
    default=None,
    title="Phone number")]

    recovery_email: Annotated[EmailStr | None,
    Field(pattern=r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    default=None,
    title="Recovery email used for account recovery",
    examples=["user@userson.com"])]

    
class UserActive(BaseModel):
    active: bool

class UserEmailVerification(BaseModel):
    email_verified: bool

class UserSuperuser(BaseModel):
    superuser: bool


## User Read
class UserRead(BaseModel):
    id: int
    uuid: str
    
    fullname: Annotated[str,
    Field(min_length=3, max_length=30,
    examples=["Shams Joe"])]

    username:  Annotated[str,
    Field(min_length=3, max_length=20,
    examples=["ShamsJoe_33"])]

    email: Annotated[EmailStr,
    Field(examples=["user@userson.com"])]

    shit_id: Annotated[str,
    Field(min_length=3, max_length=10,
    title="ID used for transactions",
    examples=["shit@123"])]

    country_code: Annotated[int,
    Field(ge=1, le=3,
    title="Country code")]

    phone_number: Annotated[int,
    Field(gt=9, lt=11,
    title="Phone number")]

    created_at: datetime

## User Delete
class UserDelete(BaseModel):
    is_deleted: bool