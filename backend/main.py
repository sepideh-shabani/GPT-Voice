# source venv/Scripts/activate
# uvicorn main:app
# uvicorn main:app --reload

# Main imports
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import openai

# Custom function imports
from functions.database import store_message, reset_messages
from functions.openai_requests import convert_audio_to_text, get_chat_response
from functions.text_to_speech import convert_text_to_speech


# Get Environment Vars
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")


# Initiate App
app = FastAPI()

# CORS - Origins
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:3000",
    "http://localhost:8080",
]

# CORS - Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Reset Messages
@app.get("/reset-messages")
async def reset_conversation():
    reset_messages()
    return {"message": "all conversation reset "}

@app.get("/post-audio/")
async def get_audio():

    # Get saved audio
    audio_input = open("voice.mp3", "rb")
    
    # Decode audio
    message_decoded = convert_audio_to_text(audio_input)

    # Guard: Ensure output
    if not message_decoded:
        return HTTPException(status_code=400, detail="Failed to decode audio")

    # Get chat response
    chat_response = get_chat_response(message_decoded)

    # Guard: Ensure output
    if not chat_response:
        return HTTPException(status_code=400, detail="Failed to chat response")

    # store_messages
    store_message(message_decoded, chat_response)

    audio_output = convert_text_to_speech(chat_response)

    # Guard: Ensure output
    if not audio_output:
        return HTTPException(status_code=400, detail="Failed to audio output")
    
   # Create a generator that yields chunks of data
    def iterfile():
        yield audio_output

    # Use for Post: Return output audio
    return StreamingResponse(iterfile(), media_type="application/octet-stream")

    return "Done"
