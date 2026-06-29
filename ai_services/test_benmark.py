import time
import ollama

start = time.time()

response = ollama.chat(
    model="qwen3:4b",
    messages=[
        {
            "role": "user",
            "content": """
Trả lời trực tiếp.

Không suy luận.
Không giải thích cách suy nghĩ.
Không hiển thị reasoning.
Không hiển thị thinking.

Spring Boot là gì?
"""
        }
    ]
)

end = time.time()

print(response["message"]["content"])
print(f"Time: {end - start:.2f}s")