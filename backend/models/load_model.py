import joblib
import os

model_path = os.path.join(os.path.dirname(__file__), "human_recog_model.joblib")

human_recog_model = joblib.load(model_path)