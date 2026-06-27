ALTER TABLE lessonsources ADD COLUMN IF NOT EXISTS content_type VARCHAR(100);
ALTER TABLE lessonsources ADD COLUMN IF NOT EXISTS file_size_bytes BIGINT;
