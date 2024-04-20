from flask import Flask, request, jsonify
from flask_cors import CORS
import json
# import model
import sys
sys.path.append('DiseasePredictorModel')
import DiseasePredictor as dp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/analyse_symptoms', methods=['POST'])
def analyse_symptoms():
    data = request.json
    symptoms = dp.createInput(data['selectedSymptoms'])
    dp.predict(symptoms)
    return jsonify({'message': 'Symptoms submitted'})
if __name__ == '__main__':
    app.run(debug=True)
