CREATE TABLE reports (
                         report_id                BIGSERIAL PRIMARY KEY,
                         reporter_id              BIGINT NOT NULL REFERENCES users(user_id),
                         course_id                BIGINT NOT NULL REFERENCES courses(course_id),
                         lesson_id                BIGINT NULL REFERENCES lessons(lesson_id),
                         reported_instructor_id   BIGINT NULL REFERENCES users(user_id),
                         category_id              BIGINT NOT NULL REFERENCES report_categories(category_id),
                         reason                   TEXT NOT NULL,
                         description              TEXT NOT NULL,
                         status                   TEXT NOT NULL DEFAULT 'PENDING',
                         teacher_visible          BOOLEAN NOT NULL DEFAULT FALSE,
                         created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
                         updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);