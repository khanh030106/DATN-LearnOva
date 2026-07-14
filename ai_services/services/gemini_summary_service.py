import os
import time

from google import genai

_client = None


def _get_client():
    global _client
    if _client is None:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError("GEMINI_API_KEY is not set")
        _client = genai.Client(api_key=api_key)
    return _client


SUMMARY_PROMPT = """
Bạn là hệ thống tóm tắt bài giảng.
Hãy tóm tắt nội dung video này bằng tiếng Việt, dạng gạch đầu dòng.

Yêu cầu:
- Ngắn gọn
- Chỉ nêu ý chính
- Không thêm văn bản thừa
"""


def summarize_video(file_path: str) -> str:
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
            contents=[uploaded_file, SUMMARY_PROMPT],
        )
        return response.text
    finally:
        client.files.delete(name=uploaded_file.name)
