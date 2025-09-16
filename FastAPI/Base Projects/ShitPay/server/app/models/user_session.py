from datetime import datetime
from uuid import UUID

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String

from .base import Base
from .users import User  # For the foreign key relationship


class UserSession(Base):
    __tablename__ = "user_sessions"
    id = Column(Integer, autoincrement=True, nullable=False,
                unique=True, primary_key=True, init=False)
    user_uuid = Column(UUID, ForeignKey(User.uuid), primary_key=True)
    shit_id = Column(String, ForeignKey(User.shit_id), index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    token = Column(String, nullable=False,
                   unique=True)  # Session token (e.g., JWT)
    created_at = Column(DateTime,
                        default=datetime.utcnow)  # When session started
    expires_at = Column(DateTime, nullable=False)  # When session expires
    ip_address = Column(String, nullable=True)  # Login IP for security
    device_info = Column(String, nullable=True)  # Device/browser details

