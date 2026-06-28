# LearnOva AI Feature - Progress Summary

## Goal

Xây dựng tính năng AI cho nền tảng học tập LearnOva (giống Udemy).

Sau khi phân tích các lựa chọn, quyết định tập trung vào:

- AI Summary (Tóm tắt bài học)
- AI Quiz Generation (Sinh câu hỏi trắc nghiệm)

Không làm chatbot ở giai đoạn đầu vì:

- Scope lớn
- Khó đánh giá chất lượng
- Ít giá trị hơn so với Summary + Quiz trong DATN

---

# Architecture Decision

## Các hướng đã cân nhắc

### Option 1

Teacher nhập nội dung bài học

```text
Teacher Content
    ↓
AI Summary
    ↓
AI Quiz
```

Vấn đề:

- Teacher có thể nhập thiếu
- Teacher có thể nhập sai
- Không phản ánh đúng nội dung video

=> Loại bỏ

---

### Option 2

AI đọc trực tiếp video

```text
Video
 ↓
Transcript
 ↓
Summary
 ↓
Quiz
```

Ưu điểm:

- Dữ liệu thực tế
- Không phụ thuộc teacher

=> Chọn

---

### Option 3

Teacher bắt buộc upload subtitle

```text
Subtitle
 ↓
Summary
 ↓
Quiz
```

Vấn đề:

- Tăng công sức cho giảng viên
- Nhiều người không có subtitle

=> Không chọn

---

### Final Decision

Hybrid Approach

```text
Nếu có subtitle
    ↓
Dùng subtitle

Nếu không có subtitle
    ↓
Whisper sinh transcript
```

---

# AI Stack

## Ollama

Vai trò:

```text
Model Runtime
```

Tương tự:

```text
Spring Boot
    ↓
Tomcat

Qwen
    ↓
Ollama
```

---

## Qwen3:4b

Vai trò:

```text
Transcript
 ↓
Summary
 ↓
Quiz
```

Là LLM chính của hệ thống.

---

## FFmpeg

Vai trò:

```text
Video
 ↓
Audio
```

Ví dụ:

```bash
ffmpeg -i lesson.mp4 lesson.wav
```

---

## Faster-Whisper

Vai trò:

```text
Audio
 ↓
Transcript
```

Speech-to-Text engine.

---

## Python

Vai trò:

```text
AI Service
```

Chứa toàn bộ logic:

- Whisper
- Summary
- Quiz

---

# Project Structure

Quyết định tách AI thành service riêng.

```text
DATN-LearnOva
│
├── backend
│
├── frontend
│
└── ai_services
```

Không nhúng AI trực tiếp vào Spring Boot.

---

# Environment Setup

## Installed

### Ollama

Đã cài thành công.

---

### Qwen3:4b

Đã pull thành công.

Test:

```bash
ollama run qwen3:4b
```

Kết quả:

AI trả lời bình thường.

---

### FFmpeg

Đã cài thành công.

Test:

```bash
ffmpeg -version
```

PASS.

---

### Python

Đã cài Python 3.13.

PASS.

---

# AI Service Setup

## Create Virtual Environment

```bash
python -m venv venv
```

Activate:

```bash
venv\Scripts\activate
```

PASS.

---

## Install Faster Whisper

```bash
pip install faster-whisper
```

PASS.

---

# Whisper Testing

## Test Import

File:

```python
from faster_whisper import WhisperModel

print("Faster Whisper imported successfully!")
```

Result:

```text
Faster Whisper imported successfully!
```

PASS.

---

## Test Model Loading

File:

```python
model = WhisperModel(
    "small",
    device="cpu",
    compute_type="int8"
)
```

Result:

```text
Model loaded successfully!
```

PASS.

---

# Video Transcript Test

## Test File

```text
test.mp4
```

Thời lượng:

```text
~7 phút
```

---

## Code

```python
segments, info = model.transcribe(
    "test.mp4",
    language="vi"
)
```

---

## Result

Whisper sinh transcript thành công.

Ví dụ:

```text
Tây Ban Nha...
De La Fuente...
Yamal...
Olmo...
Rodri...
```

Có lỗi tên riêng nhưng nội dung tổng thể vẫn hiểu được.

Đánh giá:

```text
Human Readability:
~4/10

LLM Understanding:
~8.5/10
```

=> Đủ tốt để Summary và Quiz.

PASS.

---

# Current AI Pipeline

Đã hoàn thành:

```text
Video
 ↓
Whisper
 ↓
Transcript
```

---

# Next Steps

## Summary Generation

```text
Transcript
 ↓
Qwen3:4b
 ↓
Summary
```

Output dự kiến:

```text
- Ý chính 1
- Ý chính 2
- Ý chính 3
- Ý chính 4
- Ý chính 5
```

---

## Quiz Generation

```text
Transcript
 ↓
Qwen3:4b
 ↓
Quiz
```

Output dự kiến:

```json
[
  {
    "question": "Spring Boot là gì?",
    "options": [
      "A",
      "B",
      "C",
      "D"
    ],
    "correctAnswer": 0
  }
]
```

---

# Final Production Architecture

```text
Lesson Video
      ↓
  FFmpeg
      ↓
    Audio
      ↓
Faster-Whisper
      ↓
 Transcript
      ↓
    Qwen
      ↓
 ┌──────────┐
 │ Summary  │
 └──────────┘
      ↓
 ┌──────────┐
 │   Quiz   │
 └──────────┘
      ↓
 AI Service API
      ↓
 Spring Boot
      ↓
 Database
      ↓
 Frontend
```

---

# Progress Status

Completed:

- [x] Chọn hướng AI
- [x] Thiết kế kiến trúc
- [x] Cài Ollama
- [x] Cài Qwen3:4b
- [x] Cài FFmpeg
- [x] Cài Faster-Whisper
- [x] Tạo AI Service
- [x] Test Whisper
- [x] Sinh transcript từ video

Remaining:

- [ ] Summary bằng Qwen
- [ ] Quiz bằng Qwen
- [ ] REST API cho AI Service
- [ ] Kết nối Spring Boot
- [ ] UI Summary
- [ ] UI Quiz

Estimated Completion:

```text
AI Feature Progress ≈ 65-70%
```