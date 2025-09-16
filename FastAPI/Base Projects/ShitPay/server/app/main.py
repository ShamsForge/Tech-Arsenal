from fastapi import FastAPI
from user.endpoints import router as user_router

app = FastAPI(
    title="Shit Pay", 
    version="0.0.1", 
    summary="I'm Tired of getting shit rewards on Google pay",
    description="A fake payment API for broke teams feel rich in their dreams"
)

@app.get("/")
async def root():
    return ('This is the root of the application')

# Routers (/user)
app.include_router(user_router)
