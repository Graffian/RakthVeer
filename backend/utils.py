from pydantic import BaseModel



class donorLoginCred(BaseModel):
        phoneNumber : int
        name : str
        age : int
        bloodGroup : str
        bloodType : str
        image: str
        timestamp: str
    