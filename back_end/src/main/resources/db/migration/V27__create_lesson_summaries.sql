CREATE TABLE lesson_summaries (
    summary_id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lesson_id       BIGINT NOT NULL UNIQUE,
    content         TEXT NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,

    CONSTRAINT fk_lesson_summaries_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
);
