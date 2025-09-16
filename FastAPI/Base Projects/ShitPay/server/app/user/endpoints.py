from fastapi import FastAPI
from FastAPI import APIRouter

router = APIRouter(
    prefix="/user",
    tags=["user"],
) 

@router.post("/signup")
async def signup():