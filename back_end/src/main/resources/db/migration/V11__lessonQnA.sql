CREATE TABLE lessonqa (
                          qa_id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                          lesson_id           BIGINT NOT NULL,
                          user_id             BIGINT NOT NULL,
                          parent_id           BIGINT NULL,
                          content             TEXT NOT NULL,
                          type                VARCHAR(10) DEFAULT 'QUESTION',
                          is_solved           BOOLEAN DEFAULT FALSE,
                          is_pinned           BOOLEAN DEFAULT FALSE,
                          like_count          INTEGER DEFAULT 0,
                          created_at          TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          updated_at          TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          is_deleted          BOOLEAN DEFAULT FALSE NOT NULL,
                          reply_to_user_id    BIGINT NULL,
                          root_id             BIGINT NULL,
                          level               INTEGER DEFAULT 0,

                          CONSTRAINT fk_lessonqa_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE,
                          CONSTRAINT fk_lessonqa_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                          CONSTRAINT fk_lessonqa_parent FOREIGN KEY (parent_id) REFERENCES lessonqa(qa_id) ON DELETE CASCADE,
                          CONSTRAINT fk_lessonqa_reply_to_user FOREIGN KEY (reply_to_user_id) REFERENCES users(user_id) ON DELETE SET NULL
);