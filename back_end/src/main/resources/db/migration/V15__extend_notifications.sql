ALTER TABLE notifications
    ADD COLUMN type text NOT NULL DEFAULT 'GENERIC',
    ADD COLUMN link text,
    ADD COLUMN metadata jsonb;

ALTER TABLE notifications
    ALTER COLUMN type DROP DEFAULT;

CREATE INDEX idx_notifications_user_created ON notifications (user_id, created_at DESC);
CREATE INDEX idx_notifications_user_unread ON notifications (user_id) WHERE is_read = false;
