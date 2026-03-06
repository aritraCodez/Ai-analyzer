from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# Create FastAPI app
app = FastAPI(
    title="automation API",
    description="A complete automation system ",
    version="1.0.0"
)


# Add CORS middleware
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "automation API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
