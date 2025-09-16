from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..database import Base

class Secret(Base):
    __tablename__ = 't1'

    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)
    secret = Column(String, index=True, unique=True)
    
    t2 = relationship("Chat", back_populates="t1", cascade="all, delete-orphan")

class Chat(Base):
    __tablename__ = 't2'

    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)
    secret_id = Column(Integer, ForeignKey("t1.id"))  # ForeignKey column

    secret = relationship("Secret", back_populates="t2")
