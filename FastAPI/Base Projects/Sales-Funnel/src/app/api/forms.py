from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime

from app.database import get_db
from app.models.models import Form
from app.schemas.schemas import FormSchema

router = APIRouter(
    prefix="/forms",
    tags=["forms"]
)

router.post("/contacts", response_model=FormSchema)
def create_form_submission(submission: FormSchema, db: Depends(get_db)):
    # Create a new form submission
    new_submission = Form(
        name=submission.name,
        email=submission.email,
        phone=submission.phone,
        location=submission.location,
        languages=submission.languages,
    
        instagran=submission.instagram,
        discord=submission.discord,

        created_at=datetime.utcnow()
    )
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    
    return [f"Thank you {new_submission.name} for your submission! We will get back to you soon."]


router.post("/recruits", response_model=FormSchema)
def create_form_submission(submission: FormSchema, db: Depends(get_db)):
    # Create a new form submission
    new_submission = Form(
        name=submission.name,
        email=submission.email,
        phone=submission.phone,
        location=submission.location,
        languages=submission.languages,
    
        discord=submission.discord,
        github=submission.github,
        linkedin=submission.linkedin,
        twitter=submission.twitter,

        education=submission.education,
        hobbies=submission.hobbies,
        skills=submission.skills,
        certifications=submission.certifications,
        work_profile=submission.work_profile,
        work_experience=submission.work_experience,

        created_at=datetime.utcnow()
    )
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    
    return [f"Thank you {new_submission.name} for your submission! We will get back to you soon."]