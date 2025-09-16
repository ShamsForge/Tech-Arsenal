from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..database import Base

class Secret(Base):
    __tablename__ = 'secrets'

    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)
    secret = Column(String, index=True, unique=True)
    key_version = Column(Integer, nullable=True, default=None)  # For key versioning

    # Relationship to Chat
    chats = relationship("Chat", back_populates="secret", cascade="all, delete-orphan")

class Chat(Base):
    __tablename__ = 'chats'

    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)
    secret_id = Column(Integer, ForeignKey("secrets.id"))  # ForeignKey column
    stored_chats = Column(String, index=True)
    key_version = Column(Integer, nullable=True, default=None)  # For key versioning

    secret = relationship("Secret", back_populates="chats")

class Incognito(Base):
    __tablename__ = 'incognito'

    id = Column(Integer, primary_key=True, index=True, nullable=False, autoincrement=True)
    secret_id = Column(Integer, ForeignKey("secrets.id"))  # ForeignKey column
    disable = Column(Boolean, default=False)

