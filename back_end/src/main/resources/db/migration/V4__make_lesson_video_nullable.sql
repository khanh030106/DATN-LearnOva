-- V4: Allow lesson draft creation without video
-- Make video_url nullable and set duration_seconds default to 0

ALTER TABLE lessons
    ALTER COLUMN duration_seconds SET DEFAULT 0;

ALTER TABLE lessons
    ALTER COLUMN duration_seconds DROP NOT NULL;

-- Remove the CHECK constraint on duration_seconds if it exists
-- (original schema had CHECK (duration_seconds > 0))
ALTER TABLE lessons
    DROP CONSTRAINT IF EXISTS lessons_duration_seconds_check;

delete from flyway_schema_history where installed_rank = 4