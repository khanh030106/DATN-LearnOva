CREATE TABLE qa_likes (
    qa_id       BIGINT NOT NULL REFERENCES lessonqa(qa_id) ON DELETE CASCADE,
    user_id     BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (qa_id, user_id)
);
