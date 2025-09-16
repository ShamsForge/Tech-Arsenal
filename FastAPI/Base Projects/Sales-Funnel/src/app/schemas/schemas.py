from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
from typing import Annotated

class FormSchema(BaseModel):
    id: int
    name: Annotated[str, Field(min_length=2, max_length=40, pattern=r'^[A-Za-z\s]+$',
    description="Name must contain only letters and spaces", examples=["Gustavo Fring"])]
    email: EmailStr
    phone: Annotated[str, Field(min_length=10, max_length=15, pattern=r'^\+?[0-9\s]+$',
    description="Phone number must be a valid format, can include country code", examples=["+1 234-567-890"])]
    location: Annotated[str, Field(min_length=2, max_length=100,
    description="Location must be a valid address or city name")]
    languages: Annotated[str, Field(min_length=2, max_length=100,
    description="Languages must be a comma-separated list of languages", examples=["English, Spanish, French"])]
    
    discord: Optional[Annotated[str, Field(min_length=2, max_length=100,
    description="Discord username must be a valid format")]]
    instagran: Optional[Annotated[str, Field(min_length=2, max_length=100,
    description="Instagram username must be a valid format")]]
    linkedin: Optional[Annotated[str, Field(min_length=2, max_length=100,
    description="LinkedIn profile URL must be a valid format")]]
    github: Optional[Annotated[str, Field(min_length=2, max_length=100,
    description="GitHub username must be a valid format")]]
    twitter: Optional[Annotated[str, Field(min_length=2, max_length=100,
    description="Twitter username must be a valid format")]]

    education: Annotated[str, Field(min_length=2, max_length=200,
    description="Education details must be a valid format", examples=["Bachelor of Science in Computer Science from XYZ University"])]
    hobbies: Annotated[str, Field(min_length=2, max_length=200, examples=["Reading, Traveling, Coding"],
    description="Hobbies must be a comma-separated list of hobbies")]
    skills: Annotated[str, Field(min_length=2, max_length=200,
    description="Skills must be a comma-separated list of skills", examples=["Python, JavaScript, SQL"])]
    certifications: Annotated[str, Field(min_length=2, max_length=200, description="Certifications must be a comma-separated list of certifications",
    examples=["AWS Certified Solutions Architect, Google Data Analytics Professional Certificate"])]
    work_profile: Annotated[str, Field(min_length=2, max_length=200,
    description="Work profile must be a valid format", examples=["Software Engineer at ABC Corp"])]
    work_experience: Annotated[str, Field(min_length=2, max_length=500,
    description="Work experience must be a valid format", examples=["5 years of experience in software development, specializing in web applications"])]
    
    Ambitions: Annotated[str, Field(min_length=2, max_length=200,
    description="Ambitions must be a valid format", examples=["To become a lead software engineer and mentor junior developers"])]
    
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Timestamp when the form was created")


    class Config:
        orm_mode = True
