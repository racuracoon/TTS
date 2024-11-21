from flask import Flask, request, jsonify, send_file
from pathlib import Path
from openai import OpenAI
from flask_cors import CORS
from tts import textToSpeech

app = Flask(__name__)
CORS(app)

@app.route('/tts', methods=['POST'])
def tts():
    if request.is_json:
        # POST 형식으로 받은 데이터를 파싱
        data = request.get_json()
        text = data.get('text', 'No text provided')  
        response = textToSpeech(text)

        # return jsonify(response), response['status']
        return response

if __name__ == '__main__':
    app.run(debug=True) 
