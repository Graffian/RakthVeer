import joblib
import os

model_path = os.path.join(os.path.dirname(__file__), "human_recog_model.joblib")

human_recog_model = joblib.load(model_path)


model_path_shortage_predict = os.path.join(os.path.dirname(__file__), "shortage_predict_model.joblib")

shortage_predict_model = joblib.load(model_path_shortage_predict)


model_path_donation_prob = os.path.join(os.path.dirname(__file__) ,"donation_prob_model.joblib" )
donation_prob_model = joblib.load(model_path_donation_prob)