from faster_whisper import WhisperModel

# load model 1 lần (quan trọng)
model = WhisperModel("base", device="cpu")

def transcribe_audio(file_path: str):
    segments, info = model.transcribe(file_path)

    text = ""

    for segment in segments:
        text += segment.text + " "

    return text.strip()