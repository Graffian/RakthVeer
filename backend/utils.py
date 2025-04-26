from pydantic import BaseModel



class donorLoginCred(BaseModel):
        phoneNumber : int
        name : str
        age : int
        bloodGroup : str
        bloodType : str
        image: str
        timestamp: str
class donorRankCred(BaseModel):
    name: str
    contactNumber: int
    bloodGroup: str
    unitsRequired: int
    hospitalName: str
    reason: str
class donorLocationCred(BaseModel):
    latitude:float
    longitude:float