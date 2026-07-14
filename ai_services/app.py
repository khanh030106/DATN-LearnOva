import os
import tempfile

from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException

load_dotenv()

from services.whisper_service import transcribe_audio
from services.summay_service import generate_summary
from services.quiz_service import generate_questions
from services.gemini_summary_service import summarize_video
from services.gemini_quiz_service import generate_quiz

app = FastAPI(title="LearnOva AI Service", version="1.0.0")


async def _save_upload_to_temp(file: UploadFile) -> str:
    suffix = os.path.splitext(file.filename or "")[1] or ".mp4"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(await file.read())
        return tmp.name


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

@app.post("/summarize")
async def summarize(file: UploadFile = File(...)):
    tmp_path = await _save_upload_to_temp(file)

    try:
        summary = summarize_video(tmp_path)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    finally:
        os.remove(tmp_path)

    return {"summary": summary}

@app.post("/generate-quiz")
async def generate_quiz_endpoint(file: UploadFile = File(...)):
    tmp_path = await _save_upload_to_temp(file)

    try:
        quiz = generate_quiz(tmp_path)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    finally:
        os.remove(tmp_path)

    return quiz