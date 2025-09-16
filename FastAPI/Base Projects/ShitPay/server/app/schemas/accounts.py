
from enum import StrEnum
from typing import Annotated

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class AccountType(StrEnum):
  CURRENT = "current acc"
  SAVINGS = "savings acc"

class AccountBase(BaseModel):
    model_config = ConfigDict(extra="forbid")

  
    shit_id: Annotated[str,
    Field(min_length=3, max_length=10,
    pattern=r"^[a-z0-9@#$_-]+$",
    title="ID used for transactions",
    examples=["shit@123"])]
  
    active: bool | None = True

class Account(AccountBase):
    hashed_pin: int
  
    balance: Annotated[int,
    Field(ge=0, title="Account balance", default=0, examples=[1000])] 
  
    credit_limit: Annotated[int, 
    Field(ge=0, le=80000, title="Credit limit",
    default=10000, examples=[10000])]
  
    credit_score: Annotated[int,
    Field(ge=0, le=850, title="Credit score", default=0, examples=[750])]


  




### Account CURD Schemas
#### Account Create
class AccountCreate(Account):
    model_config = ConfigDict(extra="forbid")
  
    pin: Annotated[int,
    Field(ge=1000, le=9999,
    pattern=r"^\d{4}$",
    title="4 digit pin",
    description="Secured Pin used for transactions",
    examples=[1234])]

class AccountCreateInternal(Account):
    hashed_pin: int


#### Account Update
class AccountUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")
  
    shit_id: Annotated[str | None,
    Field(min_length=3, max_length=10,
    pattern=r"^[a-z0-9@#$_-]+$",
    title="ID used for transactions",
    examples=["shit@123"])]

class AccountPinChange(BaseModel):
    model_config = ConfigDict(extra="forbid")
  
    pin: Annotated[int | None,
    Field(ge=1000, le=9999,
    pattern=r"^\d{4}$",
    title="4 digit pin",
    description="Secured Pin used for transactions",
    examples=[1234])]

class AccountActive(BaseModel):
    active: bool | None = None

class AccountBalanceChange(BaseModel):
    balance: Annotated[int | None,
    Field(ge=0, title="Account balance", default=0, examples=[1000])]

class AccountCreditLimitChange(BaseModel):
    credit_limit: Annotated[int | None,
    Field(ge=0, le=80000, title="Credit limit",
    examples=[10000])]

class AccountCreditScoreChange(BaseModel):
    credit_score: Annotated[int | None,
    Field(ge=0, le=850, title="Credit score", examples=[750])]

#### Account Read

class AccountRead(Account):
    id: int
    user_uuid: str
    user_id: int
  
    shit_id: Annotated[str,
    Field(min_length=3, max_length=10,
    title="ID used for transactions",
    examples=["shit@123"])]
  
    active: bool | None = True
  
    balance: Annotated[int,
    Field(ge=0, title="Account balance", examples=[1000])]
    credit_limit: Annotated[int,
    Field(ge=0, le=80000, title="Credit limit", examples=[10000])]
    credit_score: Annotated[int,
    Field(ge=0, le=850, title="Credit score", examples=[750])]

#### Account Delete

class AccountDelete(BaseModel):
    is_deleted: bool
