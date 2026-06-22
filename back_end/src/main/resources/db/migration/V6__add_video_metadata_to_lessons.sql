ALTER TABLE lessons ADD COLUMN IF NOT EXISTS video_original_filename TEXT;
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS video_content_type VARCHAR(100);
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS video_size_bytes BIGINT;
