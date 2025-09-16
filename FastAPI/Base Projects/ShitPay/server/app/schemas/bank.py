import datetime
from typing import Annotated

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class TransactionMoney(BaseModel):
  money = Annotated[int,
  Field(ge=0, title="Money to be transferred", examples=[1000])]

class TransactionTracking(BaseModel):
  money_from = Annotated[str,
  Field(min_length=3, max_length=10,
        pattern=r"^[a-z0-9@#$_-]+$",
        title="ID used for transactions",
        examples=["shit@123"])]
  money_to = Annotated[str,
  Field(min_length=3, max_length=10,
        pattern=r"^[a-z0-9@#$_-]+$",
        title="ID used for transactions",
        examples=["shit@123"])]

class TransactionDesc(BaseModel):
  transfer_desc: Annotated[str | None,
  Field(min_length=3, max_length=100,
        pattern=r"^[a-zA-Z0-9\s]+$",
        title="Description of the transaction",
        examples=["Transfer to Shams Joe"])]

class TransactionDate(BaseModel):
  transfer_date: datetime.datetime