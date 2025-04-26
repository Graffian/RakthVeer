from fastapi import FastAPI
from utils import donorLoginCred
from fastapi.middleware.cors import CORSMiddleware
import base64
from preprocess import predict_human_or_object
from models.load_model import donation_prob_model
from utils import donorRankCred
from utils import donorLocationCred
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

location = []
@app.get("/")
def home():
    return {"msg" : "hi"}

@app.post("/api/login/cred")
async def pic_handle(donor_cred : donorLoginCred):
    base_64 = donor_cred.image
    print(base_64)
    base_64 = base_64.split("base64,")[1]
    base_64 = base64.b64decode(base_64)
    with open(f"uploads/image-{donor_cred.phoneNumber}.webp" , "wb") as f:
         f.write(base_64)
    return {"prediction" : predict_human_or_object()}

@app.post("/api/donor")
async def donor_rank(donor_rank_cred : donorRankCred):
    print(donor_rank_cred)
    
@app.post("/api/donor/location")
async def donor_location(donor_location : donorLocationCred):
    print(donor_location)