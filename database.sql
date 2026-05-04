CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TABLE Users(
                      user_id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY ,
                      full_name VARCHAR(100) NOT NULL ,
                      email TEXT UNIQUE NOT NULL ,
                      phone VARCHAR(20) NULL ,
                      avatar TEXT NULL ,
                      cover_image TEXT NULL ,
                      date_of_birth DATE NULL ,
                      gender gender_type NULL ,
                      password_hash TEXT NULL ,
                      is_active BOOLEAN DEFAULT TRUE,
                      is_deleted BOOLEAN DEFAULT FALSE NOT NULL ,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE role_name AS ENUM ('ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_USER');
CREATE TABLE Roles(
                      role_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                      role_name role_name UNIQUE NOT NULL
);

CREATE TABLE UserRole(
                         user_id BIGINT NOT NULL ,
                         role_id BIGINT NOT NULL ,
                         PRIMARY KEY (user_id, role_id),
                         FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ,
                         FOREIGN KEY (role_id) REFERENCES Roles(role_id) ON DELETE CASCADE
);

CREATE TYPE account_type AS ENUM('LOCAL', 'GOOGLE', 'FACEBOOK', 'GITHUB');
CREATE TABLE UserAuthProviders(
                                  provider_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                  user_id BIGINT NOT NULL,
                                  provider account_type NOT NULL,
                                  provider_user_id TEXT NOT NULL,
                                  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                                  UNIQUE (user_id, provider) ,
                                  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                                  UNIQUE(provider, provider_user_id)
);

CREATE TABLE Categories(
                        category_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                        name TEXT UNIQUE NOT NULL ,
                        slug TEXT UNIQUE NOT NULL ,
                        parent_id BIGINT NULL ,
                        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                        is_deleted BOOLEAN DEFAULT FALSE NOT NULL ,
                        FOREIGN KEY (parent_id) REFERENCES Categories(category_id) ON DELETE SET NULL
);

CREATE TYPE course_level AS ENUM ('Beginner', 'Intermediate', 'Advanced');
CREATE TYPE course_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TABLE Courses(
                    course_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                    thumbnail_url TEXT NOT NULL ,
                    title TEXT NOT NULL ,
                    slug TEXT UNIQUE NOT NULL ,
                    description TEXT NOT NULL ,
                    base_price NUMERIC(10, 2) NOT NULL CHECK ( base_price >= 0 ),
                    level course_level NOT NULL ,
                    status course_status DEFAULT 'DRAFT' NOT NULL ,
                    CHECK (
                        (status = 'PUBLISHED' AND published_at IS NOT NULL)
                            OR
                        (status != 'PUBLISHED' AND published_at IS NULL)
                        ) ,
                    instructor_id BIGINT NOT NULL ,
                    is_deleted BOOLEAN DEFAULT FALSE NOT NULL ,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    published_at TIMESTAMPTZ NULL ,
                    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    FOREIGN KEY (instructor_id) REFERENCES Users(user_id)
);

CREATE TABLE Sections(
                    section_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                    course_id BIGINT NOT NULL ,
                    title TEXT NOT NULL ,
                    section_order INTEGER NOT NULL ,
                    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    is_deleted BOOLEAN DEFAULT FALSE NOT NULL ,
                    FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE ,
                    UNIQUE (course_id, section_order)
);

CREATE TABLE Lessons(
                    lesson_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                    section_id BIGINT NOT NULL ,
                    title TEXT NOT NULL ,
                    video_url TEXT NOT NULL ,
                    lesson_order INT NOT NULL ,
                    duration_seconds INTEGER NOT NULL CHECK ( duration_seconds > 0 ),
                    view_count INTEGER DEFAULT 0 NOT NULL CHECK ( view_count >= 0 ),
                    is_preview BOOLEAN DEFAULT FALSE NOT NULL ,
                    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    is_deleted BOOLEAN DEFAULT FALSE NOT NULL ,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    FOREIGN KEY (section_id) REFERENCES Sections(section_id) ON DELETE CASCADE ,
                    UNIQUE (section_id, lesson_order)
);

CREATE TABLE Tags(
                tag_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                name VARCHAR(50) UNIQUE NOT NULL ,
                is_deleted BOOLEAN DEFAULT FALSE NOT NULL ,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                slug TEXT UNIQUE NOT NULL
);

CREATE TYPE lesson_source_type AS ENUM ('Documentary', 'Resources');
CREATE TABLE LessonSource(
                        lesson_source_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                        lesson_id BIGINT NOT NULL ,
                        file_url TEXT NOT NULL ,
                        resource_type lesson_source_type NOT NULL ,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                        FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id) ON DELETE CASCADE
);

CREATE TABLE CourseCategories(
                            course_id BIGINT NOT NULL ,
                            category_id BIGINT NOT NULL ,
                            is_primary BOOLEAN DEFAULT FALSE NOT NULL ,
                            PRIMARY KEY (course_id, category_id),
                            FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE,
                            FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
);

CREATE TABLE CourseTags(
                        course_id BIGINT NOT NULL ,
                        tag_id BIGINT NOT NULL ,
                        PRIMARY KEY (course_id, tag_id) ,
                        FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE,
                        FOREIGN KEY (tag_id) REFERENCES  Tags(tag_id) ON DELETE CASCADE
);

CREATE TABLE Enrollment(
                        course_id BIGINT NOT NULL ,
                        user_id BIGINT NOT NULL ,
                        enrolled_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                        progress_percent INTEGER DEFAULT 0 NOT NULL CHECK ( progress_percent BETWEEN 0 AND 100),
                        completed_at TIMESTAMPTZ NULL ,
                        CHECK (
                            (completed_at IS NOT NULL AND progress_percent = 100)
                                OR
                            (completed_at IS NULL AND progress_percent < 100)
                            ) ,
                        PRIMARY KEY (course_id, user_id),
                        FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE,
                        FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE LessonProgress(
                            user_id BIGINT NOT NULL ,
                            lesson_id BIGINT NOT NULL ,
                            is_completed BOOLEAN DEFAULT FALSE NOT NULL ,
                            watched_seconds INTEGER DEFAULT 0 NOT NULL CHECK ( watched_seconds >= 0 ),
                            PRIMARY KEY (user_id, lesson_id) ,
                            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ,
                            FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id) ON DELETE CASCADE
);

CREATE TABLE Cart(
                user_id BIGINT NOT NULL ,
                course_id BIGINT NOT NULL ,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                PRIMARY KEY (user_id, course_id),
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
);

CREATE TYPE verification_type AS ENUM ('ACTIVE_ACCOUNT', 'RESET_PASSWORD');
CREATE TABLE VerificationTokens(
                                    token_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY  NOT NULL ,
                                    user_id BIGINT NOT NULL ,
                                    token TEXT UNIQUE NOT NULL ,
                                    token_type verification_type NOT NULL ,
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                                    expired_at TIMESTAMPTZ NOT NULL ,
                                    CHECK ( expired_at > created_at ) ,
                                    is_used BOOLEAN DEFAULT FALSE NOT NULL ,
                                    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Notifications(
                        notification_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                        user_id BIGINT NOT NULL ,
                        title TEXT NOT NULL ,
                        content TEXT NOT NULL ,
                        is_read BOOLEAN DEFAULT FALSE NOT NULL ,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                        FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TYPE order_status AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELLED');
CREATE TABLE Orders(
                    order_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                    user_id BIGINT NOT NULL ,
                    voucher_id BIGINT NULL ,
                    total_amount NUMERIC(10, 2) NOT NULL CHECK ( total_amount >= 0 ),
                    status order_status DEFAULT 'PENDING' NOT NULL ,
                    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                    FOREIGN KEY (voucher_id) REFERENCES Vouchers(voucher_id) ON DELETE SET NULL
);

CREATE TABLE OrderItems(
                           order_item_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                           order_id BIGINT NOT NULL,
                           course_id BIGINT NOT NULL,
                           price NUMERIC(10,2) NOT NULL CHECK ( price >= 0 ),
                           UNIQUE (order_id, course_id) ,
                           FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
                           FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TYPE payment_method AS ENUM ('MOMO', 'VNPAY', 'PAYPAL');
CREATE TYPE payment_status AS ENUM('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');
CREATE TABLE Payments(
                            payment_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                            order_id BIGINT NOT NULL,
                            amount NUMERIC(10,2) NOT NULL CHECK ( amount >= 0 ),
                            payment_method payment_method NOT NULL ,
                            transaction_id TEXT UNIQUE NULL,
                            status payment_status DEFAULT 'PENDING' NOT NULL ,
                            paid_at TIMESTAMPTZ NULL ,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                            FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);

CREATE TABLE Promotions(
                        promotion_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                        promotion_name TEXT NOT NULL ,
                        discount_percent INTEGER NOT NULL CHECK ( discount_percent > 0 AND discount_percent <= 100) ,
                        start_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                        end_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                        is_active BOOLEAN DEFAULT TRUE NOT NULL ,
                        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                        created_by BIGINT NULL ,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                        FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE SET NULL ,
                        CHECK ( end_date > start_date )
);

CREATE TABLE PromotionCourse(
                            promotion_id BIGINT NOT NULL ,
                            course_id BIGINT NOT NULL ,
                            PRIMARY KEY (promotion_id, course_id),
                            FOREIGN KEY (promotion_id) REFERENCES Promotions(promotion_id) ON DELETE CASCADE,
                            FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
);

CREATE TABLE Review(
                    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                    course_id BIGINT NOT NULL ,
                    user_id BIGINT NOT NULL ,
                    rating INTEGER CHECK ( rating BETWEEN 1 AND 5) NOT NULL ,
                    comment TEXT NULL ,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE,
                    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ,
                    UNIQUE (user_id, course_id)
);

CREATE TYPE discount_type AS ENUM('Fixed', 'Percent');
CREATE TABLE Vouchers(
                    voucher_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                    code TEXT UNIQUE NOT NULL ,
                    description TEXT NOT NULL ,
                    discount_type discount_type NOT NULL ,
                    discount_value NUMERIC(10, 2) NOT NULL CHECK ( discount_value > 0 ),
                    CHECK (
                        (discount_type = 'Percent' AND discount_value <= 100)
                            OR
                        (discount_type = 'Fixed')
                        ) ,
                    minimum_order NUMERIC(10, 2) NOT NULL CHECK ( minimum_order >= 0 ),
                    maximum_discount_amount NUMERIC(10, 2) NOT NULL CHECK ( maximum_discount_amount >= 0 ),
                    usage_limit INTEGER NOT NULL CHECK ( usage_limit >= 0 ),
                    used_count INTEGER DEFAULT 0 NOT NULL CHECK ( used_count >= 0 ),
                    CHECK ( used_count <= usage_limit ) ,
                    start_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    end_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    CHECK ( end_date > start_date ) ,
                    is_active BOOLEAN DEFAULT TRUE NOT NULL ,
                    created_by BIGINT NULL ,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    FOREIGN KEY (created_by) REFERENCES Users(user_id)
);

CREATE TABLE Wishlist(
                    user_id BIGINT NOT NULL ,
                    course_id BIGINT NOT NULL ,
                    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
                    PRIMARY KEY (user_id, course_id),
                    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                    FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
);

CREATE TABLE AuditLogs(
                          audit_log_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                          user_id BIGINT NULL,
                          action TEXT NOT NULL,
                          entity_name TEXT NOT NULL,
                          entity_id BIGINT NOT NULL,
                          old_data JSONB NULL,
                          new_data JSONB NULL,
                          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE INDEX idx_users_active ON Users(user_id)  WHERE is_deleted = FALSE AND is_active = TRUE;
CREATE INDEX idx_courses_active ON Courses(course_id) WHERE is_deleted = FALSE;
CREATE INDEX idx_courses_price ON Courses(base_price);
CREATE INDEX idx_courses_level ON Courses(level);
CREATE INDEX idx_enrollment_user_id ON Enrollment(user_id);
CREATE INDEX idx_course_categories_cat ON CourseCategories(category_id);
CREATE INDEX idx_notif_user_id ON Notifications(user_id);
CREATE INDEX idx_notif_unread ON Notifications(user_id)  WHERE is_read = FALSE;
CREATE INDEX idx_vouchers_active ON Vouchers(end_date) WHERE is_active = TRUE;
CREATE INDEX idx_promotions_dates ON Promotions(start_date, end_date);
CREATE INDEX idx_wishlist_user_id ON Wishlist(user_id);
CREATE INDEX idx_email_token ON VerificationTokens(token);
CREATE INDEX idx_email_token_user ON VerificationTokens(user_id)  WHERE is_used = FALSE;
CREATE INDEX idx_courses_title ON Courses(title);
CREATE INDEX idx_lessons_section ON Lessons(section_id);
CREATE INDEX idx_course_tags_tag ON CourseTags(tag_id);
CREATE INDEX idx_orders_user ON Orders(user_id);
CREATE INDEX idx_payments_order ON Payments(order_id);
CREATE INDEX idx_courses_slug ON Courses(slug);
CREATE INDEX idx_sections_course ON Sections(course_id);
CREATE UNIQUE INDEX uq_course_primary_category ON CourseCategories(course_id) WHERE is_primary = TRUE;
CREATE INDEX idx_courses_instructor ON Courses(instructor_id);
CREATE INDEX idx_promotion_course_course ON PromotionCourse(course_id);
CREATE INDEX idx_order_items_order ON OrderItems(order_id);
CREATE INDEX idx_lesson_progress_user ON LessonProgress(user_id);
CREATE INDEX idx_review_course  ON Review(course_id);
CREATE INDEX idx_enrollment_course_id  ON Enrollment(course_id);
CREATE INDEX idx_lesson_progress_lesson ON LessonProgress(lesson_id);
CREATE INDEX idx_user_role_role ON UserRole(role_id);
CREATE INDEX idx_course_categories_course ON CourseCategories(course_id);
CREATE INDEX idx_course_tags_course  ON CourseTags(course_id);
CREATE INDEX idx_order_items_course  ON OrderItems(course_id);
CREATE INDEX idx_review_user ON Review(user_id);
CREATE INDEX idx_audit_user  ON AuditLogs(user_id);
CREATE INDEX idx_audit_entity ON AuditLogs(entity_name, entity_id);



