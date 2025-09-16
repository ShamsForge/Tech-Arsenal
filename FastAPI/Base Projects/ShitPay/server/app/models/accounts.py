import uuid
from enum import StrEnum
from uuid import UUID

from sqlalchemy import Boolean, CheckConstraint, Column, ForeignKey, Integer, String
from sqlalchemy.sql.sqltypes import UUID

from .base import Base
from .users import User


class AccountType(StrEnum):
    CURRENT = "current acc"
    SAVINGS = "savings acc"

class Accounts(Base):
  __tablename__ = 'accounts'

    
  id = Column(Integer, autoincrement=True, nullable=False,
              unique=True, primary_key=True, init=False)
  user_uuid = Column(UUID, ForeignKey(User.uuid), primary_key=True)
  user_id = Column(Integer, ForeignKey(User.id), nullable=False)
    
  shit_id = Column(String, ForeignKey(User.shit_id), index=True)
  hashed_pin = Column(Integer, ForeignKey(User.hashed_pin), index=True)
  active = Column(Boolean, default=True)
    
    ## Account features
  balance = Column(Integer, default=0)
  credit_limit = Column(Integer, default=10000, min=0, max=80000)
  credit_score = Column(Integer, default=0, min=0, max=850)


