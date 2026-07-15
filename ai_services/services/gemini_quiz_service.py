import json
import os
import time

from google import genai
from google.genai import types

_client = None

QUIZ_SCHEMA = {
    "type": "object",
    "properties": {
        "questions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "question": {"type": "string"},
                    "options": {
                        "type": "array",
                        "items": {"type": "string"},
                        "minItems": 4,
                        "maxItems": 4,
                    },
                    "correctIndex": {"type": "integer"},
                },
                "required": ["question", "options", "correctIndex"],
            },
            "minItems": 5,
            "maxItems": 5,
        }
    },
    "required": ["questions"],
}

QUIZ_PROMPT = """
Tạo 5 câu hỏi trắc nghiệm bằng tiếng Việt dựa trên nội dung video bài giảng này.
Mỗi câu có đúng 4 lựa chọn, chỉ 1 đáp án đúng.
correctIndex là vị trí (0-3) của đáp án đúng trong mảng options.
Câu hỏi phải kiểm tra hiểu nội dung, không hỏi các chi tiết vụn vặt không quan trọng.
"""


def _get_client():
    global _client
    if _client is None:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY is not set")
        _client = genai.Client(api_key=api_key)
    return _client


def generate_quiz(file_path: str) -> dict:
    client = _get_client()

    uploaded_file = client.files.upload(file=file_path)

    while uploaded_file.state.name == "PROCESSING":
        time.sleep(2)
        uploaded_file = client.files.get(name=uploaded_file.name)

    if uploaded_file.state.name == "FAILED":
        raise RuntimeError(f"Gemini file processing failed: {uploaded_file.state}")

    try:
        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=[uploaded_file, QUIZ_PROMPT],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=QUIZ_SCHEMA,
            ),
        )
        return json.loads(response.text)
    finally:
        client.files.delete(name=uploaded_file.name)
