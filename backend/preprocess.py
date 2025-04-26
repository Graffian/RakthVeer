import os
import cv2 as cv
import numpy as np
import asyncio
import tensorflow as tf
import keras
from models.load_model import human_recog_model

def predict_human_or_object():
    img_path = os.listdir("./uploads")[0]
    path = f"./uploads/{img_path}"
    image = cv.imread(path)
    resized_img = cv.resize(image , (250,250))
    resized_img = np.array(resized_img)
    resized_img = np.expand_dims(resized_img , axis=0)
    prediction = human_recog_model.predict(resized_img)
    if prediction>0.5:
        return "human"
    else:
        return "object"
    


