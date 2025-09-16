from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..database import Base

class Form(Base):
    __tablename__ = 'FormData'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(String, index=True)
    location = Column(String, index=True)
    languages = Column(String, index=True)

    discord = Column(String, index=True, nullable=True)
    instagran = Column(String, index=True, nullable=True)
    linkedin = Column(String, index=True, nullable=True)
    github = Column(String, index=True, nullable=True)
    twitter = Column(String, index=True, nullable=True)

    education = Column(String, index=True)
    hobbies = Column(String, index=True)
    skills = Column(String, index=True)
    certifications = Column(String, index=True)    
    work_profile = Column(String, index=True)
    work_experience = Column(String, index=True)

    Ambitions = Column(String, index=True)
