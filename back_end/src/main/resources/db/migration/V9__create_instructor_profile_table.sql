CREATE TABLE instructor_profile (
                                    instructor_id BIGINT PRIMARY KEY,

                                    headline VARCHAR(255),

                                    description TEXT,

                                    expertise VARCHAR(255),

                                    avatarKey TEXT,

                                    social_links JSONB,

                                    created_at TIMESTAMP DEFAULT NOW(),

                                    updated_at TIMESTAMP DEFAULT NOW(),

                                    CONSTRAINT fk_instructor_profile_user
                                        FOREIGN KEY (instructor_id)
                                            REFERENCES users(user_id)
                                            ON DELETE CASCADE
);
