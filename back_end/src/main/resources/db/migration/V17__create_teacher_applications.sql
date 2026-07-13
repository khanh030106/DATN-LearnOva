CREATE TABLE teacher_applications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    specialization VARCHAR(255) NOT NULL,
    experience TEXT NOT NULL,
    portfolio_link VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    rejection_reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    reviewed_at TIMESTAMP
);
