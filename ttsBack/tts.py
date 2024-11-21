# text_to_speech.py
from pathlib import Path
from openai import OpenAI
from flask import send_file

# OpenAI 클라이언트 설정

# github에 안올려져서 주석함
client = OpenAI(api_key="OPENAI_API_KEY")

def textToSpeech(text):
    try:
        speech_file_path = Path(__file__).parent / "speech.mp3"
        
        response = client.audio.speech.create(
            model="tts-1", 
            voice="alloy", 
            input=text 
        )

        response.stream_to_file(speech_file_path)

        current_dir = Path(__file__).parent
        mp3_file = list(current_dir.glob('speech.mp3'))
        return send_file('speech.mp3', mimetype='audio/mpeg')
    except Exception as e:
        print(f"Error: {e}")