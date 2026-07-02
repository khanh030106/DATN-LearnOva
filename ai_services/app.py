from fastapi import FastAPI
from services.whisper_service import transcribe_audio
from services.summary_service import generate_summary
from services.quiz_service import generate_questions

app = FastAPI(title="LearnOva AI Service", version="1.0.0")

@app.get("/health")
def health():
    return {
        "status": "ok"
    }

@app.post("/process-video")
def process_video():
    file_path = "sample.mp3"

    transcript = transcribe_audio(file_path)
    summary = generate_summary(transcript)
    questions = generate_questions(transcript)

    return {
        "transcript": transcript,
        "summary": summary,
        "questions": questions
    }