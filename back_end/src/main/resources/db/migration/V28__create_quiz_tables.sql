CREATE TABLE quizzes (
    quiz_id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lesson_id       BIGINT NOT NULL UNIQUE,
    created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,

    CONSTRAINT fk_quizzes_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
);

CREATE TABLE quiz_questions (
    question_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quiz_id         BIGINT NOT NULL,
    question_text   TEXT NOT NULL,
    order_index     INTEGER NOT NULL,

    CONSTRAINT fk_quiz_questions_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
);

CREATE TABLE quiz_options (
    option_id       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    question_id     BIGINT NOT NULL,
    option_text     TEXT NOT NULL,
    is_correct      BOOLEAN DEFAULT FALSE NOT NULL,
    order_index     INTEGER NOT NULL,

    CONSTRAINT fk_quiz_options_question FOREIGN KEY (question_id) REFERENCES quiz_questions(question_id) ON DELETE CASCADE
);

CREATE TABLE quiz_attempts (
    attempt_id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quiz_id         BIGINT NOT NULL,
    user_id         BIGINT NOT NULL,
    score           INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,

    CONSTRAINT fk_quiz_attempts_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    CONSTRAINT fk_quiz_attempts_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE quiz_answers (
    answer_id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    attempt_id          BIGINT NOT NULL,
    question_id         BIGINT NOT NULL,
    selected_option_id  BIGINT NULL,
    is_correct           BOOLEAN NOT NULL,

    CONSTRAINT fk_quiz_answers_attempt FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(attempt_id) ON DELETE CASCADE,
    CONSTRAINT fk_quiz_answers_question FOREIGN KEY (question_id) REFERENCES quiz_questions(question_id) ON DELETE CASCADE,
    CONSTRAINT fk_quiz_answers_option FOREIGN KEY (selected_option_id) REFERENCES quiz_options(option_id) ON DELETE SET NULL
);
