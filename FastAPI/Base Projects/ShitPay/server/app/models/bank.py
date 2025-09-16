
from uuid import UUID

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String

from .base import Base
from .users import User


class Bank(Base):
  __tablename__ = 'banks'
  id = Column(Integer, autoincrement=True, nullable=False,
              unique=True, primary_key=True, init=False)
  user_uuid = Column(String, ForeignKey(User.uuid), primary_key=True)
  shit_id = Column(String, ForeignKey(User.shit_id), index=True)
  username = Column(String, ForeignKey(User.username), index=True)

class transfer(Base):
  __tablename__ = 'transfers'
  id = Column(Integer, autoincrement=True, nullable=False,
              unique=True, primary_key=True, init=False)
  money = Column(Integer, default=0)
  money_from = Column(String, default="None")
  money_to = Column(String, default="None")
  transfer_desc = Column(String, default="None")
  transfer_date = Column(String, default="None")



# Future models
class investments(Base):
  __tablename__ = 'investments'
  pass

class Loan(Base):
  __tablename__ = 'loans'
  pass


