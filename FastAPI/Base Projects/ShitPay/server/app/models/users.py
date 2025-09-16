import datetime
from enum import StrEnum
from uuid import UUID

from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.sql.sqltypes import UUID

from .base import Base


class User(Base):
  __tablename__ = 'users'
  id = Column(Integer, autoincrement=True, nullable=False,
              unique=True, primary_key=True, init=False)
  uuid = Column(UUID, primary_key=True, unique=True)
  shit_id = Column(String, index=True)
  email = Column(String, unique=True, index=True)
  username = Column(String, unique=True, index=True)
  hashed_password = Column(String)
  hashed_pin = Column(Integer, min=4, max=4)
  fullname = Column(String, nullable=True)
  country_code = Column(String)
  phone_number = Column(String)
  recovery_email = Column(String, nullable=True)
  created_at = Column(String, default=datetime.datetime.now(datetime.UTC))
  active = Column(Boolean, default=True)
  email_verified = Column(Boolean, nullable=False, default=False)
  superuser = Column(Boolean, default=False)
  is_deleted = Column(Boolean, nullable=False, default=False)
  
  
