from faster_whisper import WhisperModel

print("Loading model...")

model = WhisperModel(
    "small",
    device="cpu",
    compute_type="int8"
)

print("Transcribing...")

segments, info = model.transcribe(
    "test.mp4",
    language="vi"
)

print("\n=== TRANSCRIPT ===\n")

for segment in segments:
    print(segment.text)