import ollama
import json

def generate_questions(transcript: str):
    prompt = f"""
Create 5 quiz questions from the transcript.

Return ONLY JSON:

{{
  "questions": [
    "question 1",
    "question 2",
    "question 3",
    "question 4",
    "question 5"
  ]
}}

Transcript:
{transcript}
"""

    response = ollama.chat(
        model="qwen3:1.7b",
        format="json",
        messages=[{"role": "user", "content": prompt}]
    )

    return json.loads(response["message"]["content"])["questions"]