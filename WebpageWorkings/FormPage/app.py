from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/save_symptoms', methods=['POST'])
def save_symptoms():
    data = request.json  # Extract JSON data from the request
    # Process the data here (e.g., save to a file)
    with open('selected_symptoms.json', 'w') as file:
        json.dump(data, file)  # Save the JSON data to a file
    return jsonify({'message': 'Symptoms saved successfully'})

if __name__ == '__main__':
    app.run(debug=True)
