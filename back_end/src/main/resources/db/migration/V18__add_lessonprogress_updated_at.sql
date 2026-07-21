ALTER TABLE lessonprogress
    ADD COLUMN updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP;
