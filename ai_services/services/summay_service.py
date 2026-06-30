import ollama

def generate_summary(transcript: str):
    prompt = f"""
You are a summarization system.

Summarize the content in bullet points in Vietnamese.

Rules:
- Short
- Only key ideas
- No extra text

Transcript:
{transcript}
"""

    response = ollama.chat(
        model="qwen3:1.7b",
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]