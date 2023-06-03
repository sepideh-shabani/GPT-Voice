import requests

api_key = "2c631dba-489b-4773-9ac3-ece8172bbca1"

def convert_text_to_speech():


    url = 'https://developer.voicemaker.in/voice/api'

    headers = {
   "Authorization": "Bearer a9933800-01da-11ee-901a-3d3220f7323a",
    "content-type": "application/json"
    }

    payload = {
        "Engine": "neural", "VoiceId": "ai3-Jony", 
        "LanguageCode": "en-US",
        "Text": "Welcome to the Air.",
        "OutputFormat": "mp3",
        "SampleRate": "48000",
        "Effect": "default", "MasterSpeed": "0", "MasterVolume": "0",
        "MasterPitch": "0" 
        }

    r = requests.post(url, json=payload, headers=headers)
    data = r.json()
    print(data)
