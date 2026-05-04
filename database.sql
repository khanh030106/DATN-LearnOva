CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION immutable_unaccent(text)
    RETURNS TEXT AS $$
SELECT unaccent($1);
$$ LANGUAGE SQL IMMUTABLE PARALLEL SAFE;
-- ============================================================
--  SECTION 1: USERS & AUTH
-- ============================================================

CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TABLE Users (
                       user_id       BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
                       full_name     VARCHAR(100) NOT NULL,
                       email         TEXT UNIQUE NOT NULL,
                       phone         VARCHAR(20) NULL,
                       avatar        TEXT NULL,
                       cover_image   TEXT NULL,
                       date_of_birth DATE NULL,
                       gender        gender_type NULL,
                       password_hash TEXT NULL,
                       is_active     BOOLEAN DEFAULT TRUE,
                       is_deleted    BOOLEAN DEFAULT FALSE NOT NULL,
                       created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                       updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE role_name AS ENUM ('ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_USER');
CREATE TABLE Roles (
                       role_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                       role_name role_name UNIQUE NOT NULL
);

CREATE TABLE UserRole (
                          user_id BIGINT NOT NULL,
                          role_id BIGINT NOT NULL,
                          PRIMARY KEY (user_id, role_id),
                          FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                          FOREIGN KEY (role_id) REFERENCES Roles(role_id) ON DELETE CASCADE
);

CREATE TYPE account_type AS ENUM ('LOCAL', 'GOOGLE', 'FACEBOOK', 'GITHUB');
CREATE TABLE UserAuthProviders (
                                   provider_id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                   user_id          BIGINT NOT NULL,
                                   provider         account_type NOT NULL,
                                   provider_user_id TEXT NOT NULL,
                                   created_at       TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                                   UNIQUE (user_id, provider),
                                   UNIQUE (provider, provider_user_id),
                                   FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TYPE verification_type AS ENUM ('ACTIVE_ACCOUNT', 'RESET_PASSWORD');
CREATE TABLE VerificationTokens (
                                    token_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                                    user_id    BIGINT NOT NULL,
                                    token      TEXT UNIQUE NOT NULL,
                                    token_type verification_type NOT NULL,
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                    expired_at TIMESTAMPTZ NOT NULL,
                                    is_used    BOOLEAN DEFAULT FALSE NOT NULL,
                                    CHECK (expired_at > created_at),
                                    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


-- ============================================================
--  SECTION 2: CATEGORIES & TAGS
-- ============================================================

CREATE TABLE Categories (
                            category_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                            name          TEXT UNIQUE NOT NULL,
                            slug          TEXT UNIQUE NOT NULL,
                            parent_id     BIGINT NULL,
                            display_order INTEGER NOT NULL DEFAULT 0,
                            created_at    TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            is_deleted    BOOLEAN DEFAULT FALSE NOT NULL,
                            FOREIGN KEY (parent_id) REFERENCES Categories(category_id) ON DELETE SET NULL
);

CREATE TABLE Tags (
                      tag_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                      name       VARCHAR(50) UNIQUE NOT NULL,
                      slug       TEXT UNIQUE NOT NULL,
                      is_deleted BOOLEAN DEFAULT FALSE NOT NULL,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- ============================================================
--  SECTION 3: COURSES, SECTIONS & LESSONS
-- ============================================================

CREATE TYPE course_level  AS ENUM ('Beginner', 'Intermediate', 'Advanced');
CREATE TYPE course_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TABLE Courses (
                         course_id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                         thumbnail_url  TEXT NOT NULL,
                         title          TEXT NOT NULL,
                         slug           TEXT UNIQUE NOT NULL,
                         description    TEXT NOT NULL,
                         language       VARCHAR(10) NOT NULL DEFAULT 'vi',
                         requirements   TEXT[] NULL,
                         what_you_learn TEXT[] NULL,
                         base_price     NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
                         level          course_level NOT NULL,
                         status         course_status DEFAULT 'DRAFT' NOT NULL,
                         instructor_id  BIGINT NOT NULL,
                         is_deleted     BOOLEAN DEFAULT FALSE NOT NULL,
                         created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                         published_at   TIMESTAMPTZ NULL,
                         updated_at     TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,

    -- Full-text search vector
                         search_vector  TSVECTOR GENERATED ALWAYS AS (
                             to_tsvector('simple',
                                         immutable_unaccent(coalesce(title, '')) || ' ' ||
                                         immutable_unaccent(coalesce(description, ''))
                             )
                             ) STORED,

                         CHECK (
                             (status = 'PUBLISHED' AND published_at IS NOT NULL)
                                 OR (status != 'PUBLISHED' AND published_at IS NULL)
                             ),
                         FOREIGN KEY (instructor_id) REFERENCES Users(user_id)
);

CREATE TABLE Sections (
                          section_id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                          course_id     BIGINT NOT NULL,
                          title         TEXT NOT NULL,
                          section_order FLOAT NOT NULL,
                          created_at    TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          is_deleted    BOOLEAN DEFAULT FALSE NOT NULL,
                          UNIQUE (course_id, section_order),
                          FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
);

CREATE TABLE Lessons (
                         lesson_id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                         section_id       BIGINT NOT NULL,
                         title            TEXT NOT NULL,
                         video_url        TEXT NOT NULL,
                         lesson_order     FLOAT NOT NULL,
                         duration_seconds INTEGER NOT NULL CHECK (duration_seconds > 0),
                         view_count       INTEGER DEFAULT 0 NOT NULL CHECK (view_count >= 0),
                         is_preview       BOOLEAN DEFAULT FALSE NOT NULL,
                         created_at       TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                         is_deleted       BOOLEAN DEFAULT FALSE NOT NULL,
                         updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                         UNIQUE (section_id, lesson_order),
                         FOREIGN KEY (section_id) REFERENCES Sections(section_id) ON DELETE CASCADE
);

CREATE TYPE lesson_source_type AS ENUM ('Documentary', 'Resources');
CREATE TABLE LessonSources (
                               lesson_source_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                               lesson_id        BIGINT NOT NULL,
                               file_url         TEXT NOT NULL,
                               resource_type    lesson_source_type NOT NULL,
                               created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                               FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id) ON DELETE CASCADE
);


-- ============================================================
--  SECTION 4: COURSE RELATIONS
-- ============================================================

CREATE TABLE CourseCategories (
                                  course_id   BIGINT NOT NULL,
                                  category_id BIGINT NOT NULL,
                                  is_primary  BOOLEAN DEFAULT FALSE NOT NULL,
                                  PRIMARY KEY (course_id, category_id),
                                  FOREIGN KEY (course_id)   REFERENCES Courses(course_id)      ON DELETE CASCADE,
                                  FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
);

CREATE TABLE CourseTags (
                            course_id BIGINT NOT NULL,
                            tag_id    BIGINT NOT NULL,
                            PRIMARY KEY (course_id, tag_id),
                            FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE,
                            FOREIGN KEY (tag_id)    REFERENCES Tags(tag_id)        ON DELETE CASCADE
);


-- ============================================================
--  SECTION 5: VOUCHERS → ORDERS → ORDER ITEMS → ENROLLMENTS
--  Thứ tự bắt buộc do FK dependency
-- ============================================================

CREATE TYPE discount_type AS ENUM ('Fixed', 'Percent');
CREATE TABLE Vouchers (
                          voucher_id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                          code                    TEXT UNIQUE NOT NULL,
                          description             TEXT NOT NULL,
                          discount_type           discount_type NOT NULL,
                          discount_value          NUMERIC(10, 2) NOT NULL CHECK (discount_value > 0),
                          minimum_order           NUMERIC(10, 2) NOT NULL CHECK (minimum_order >= 0),
                          maximum_discount_amount NUMERIC(10, 2) NOT NULL CHECK (maximum_discount_amount >= 0),
                          usage_limit             INTEGER NOT NULL CHECK (usage_limit >= 0),
                          used_count              INTEGER DEFAULT 0 NOT NULL CHECK (used_count >= 0),
                          start_date              TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          end_date                TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          is_active               BOOLEAN DEFAULT TRUE NOT NULL,
                          created_by              BIGINT NULL,
                          created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          updated_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          CHECK (
                              (discount_type = 'Percent' AND discount_value <= 100)
                                  OR (discount_type = 'Fixed')
                              ),
                          CHECK (used_count <= usage_limit),
                          CHECK (end_date > start_date),
                          FOREIGN KEY (created_by) REFERENCES Users(user_id)
);

CREATE TYPE order_status AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELLED');
CREATE TABLE Orders (
                        order_id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                        user_id         BIGINT NOT NULL,
                        voucher_id      BIGINT NULL,
                        subtotal        NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
                        discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
                        total_amount    NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
                        status          order_status DEFAULT 'PENDING' NOT NULL,
                        created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        updated_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        FOREIGN KEY (user_id)    REFERENCES Users(user_id)       ON DELETE CASCADE,
                        FOREIGN KEY (voucher_id) REFERENCES Vouchers(voucher_id) ON DELETE SET NULL
);

CREATE TABLE OrderItems (
                            order_item_id  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                            order_id       BIGINT NOT NULL,
                            course_id      BIGINT NOT NULL,
                            original_price NUMERIC(10, 2) NOT NULL CHECK (original_price >= 0),
                            price          NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
                            UNIQUE (order_id, course_id),
                            FOREIGN KEY (order_id)  REFERENCES Orders(order_id)  ON DELETE CASCADE,
                            FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Enrollments (
                             course_id        BIGINT NOT NULL,
                             user_id          BIGINT NOT NULL,
                             order_id         BIGINT NOT NULL,
                             enrolled_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                             progress_percent INTEGER DEFAULT 0 NOT NULL CHECK (progress_percent BETWEEN 0 AND 100),
                             completed_at     TIMESTAMPTZ NULL,
                             CHECK (
                                 (completed_at IS NOT NULL AND progress_percent = 100)
                                     OR (completed_at IS NULL AND progress_percent < 100)
                                 ),
                             PRIMARY KEY (course_id, user_id),
                             FOREIGN KEY (order_id)  REFERENCES Orders(order_id)   ON DELETE RESTRICT,
                             FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE,
                             FOREIGN KEY (user_id)   REFERENCES Users(user_id)     ON DELETE CASCADE
);

CREATE TABLE LessonProgress (
                                user_id         BIGINT NOT NULL,
                                lesson_id       BIGINT NOT NULL,
                                is_completed    BOOLEAN DEFAULT FALSE NOT NULL,
                                watched_seconds INTEGER DEFAULT 0 NOT NULL CHECK (watched_seconds >= 0),
                                PRIMARY KEY (user_id, lesson_id),
                                FOREIGN KEY (user_id)   REFERENCES Users(user_id)     ON DELETE CASCADE,
                                FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id) ON DELETE CASCADE
);


-- ============================================================
--  SECTION 6: PAYMENTS
-- ============================================================

CREATE TYPE payment_method AS ENUM ('MOMO', 'VNPAY', 'PAYPAL');
CREATE TYPE payment_status AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');
CREATE TABLE Payments (
                          payment_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                          order_id       BIGINT NOT NULL,
                          amount         NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
                          currency       CHAR(3) NOT NULL DEFAULT 'VND',
                          payment_method payment_method NOT NULL,
                          transaction_id TEXT UNIQUE NULL,
                          status         payment_status DEFAULT 'PENDING' NOT NULL,
                          paid_at        TIMESTAMPTZ NULL,
                          updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);


-- ============================================================
--  SECTION 7: PROMOTIONS
-- ============================================================

CREATE TABLE Promotions (
                            promotion_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                            promotion_name   TEXT NOT NULL,
                            discount_percent INTEGER NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
                            start_date       TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            end_date         TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            is_active        BOOLEAN DEFAULT TRUE NOT NULL,
                            created_at       TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            created_by       BIGINT NULL,
                            updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                            CHECK (end_date > start_date),
                            FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE TABLE PromotionCourses (
                                  promotion_id BIGINT NOT NULL,
                                  course_id    BIGINT NOT NULL,
                                  PRIMARY KEY (promotion_id, course_id),
                                  FOREIGN KEY (promotion_id) REFERENCES Promotions(promotion_id) ON DELETE CASCADE,
                                  FOREIGN KEY (course_id)    REFERENCES Courses(course_id)       ON DELETE CASCADE
);


-- ============================================================
--  SECTION 8: REVIEWS, CART, WISHLIST
-- ============================================================

CREATE TABLE Reviews (
                         review_id  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                         course_id  BIGINT NOT NULL,
                         user_id    BIGINT NOT NULL,
                         rating     INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
                         comment    TEXT NULL,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                         UNIQUE (user_id, course_id),
                         FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE,
                         FOREIGN KEY (user_id)   REFERENCES Users(user_id)     ON DELETE CASCADE
);

CREATE TABLE Cart (
                      user_id    BIGINT NOT NULL,
                      course_id  BIGINT NOT NULL,
                      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                      PRIMARY KEY (user_id, course_id),
                      FOREIGN KEY (user_id)   REFERENCES Users(user_id)     ON DELETE CASCADE,
                      FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
);

CREATE TABLE Wishlist (
                          user_id    BIGINT NOT NULL,
                          course_id  BIGINT NOT NULL,
                          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                          PRIMARY KEY (user_id, course_id),
                          FOREIGN KEY (user_id)   REFERENCES Users(user_id)     ON DELETE CASCADE,
                          FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
);


-- ============================================================
--  SECTION 9: NOTIFICATIONS & AUDIT
-- ============================================================

CREATE TABLE Notifications (
                               notification_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
                               user_id         BIGINT NOT NULL,
                               title           TEXT NOT NULL,
                               content         TEXT NOT NULL,
                               is_read         BOOLEAN DEFAULT FALSE NOT NULL,
                               created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                               FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE AuditLogs (
                           audit_log_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                           user_id      BIGINT NULL,
                           action       TEXT NOT NULL,
                           entity_name  TEXT NOT NULL,
                           entity_id    BIGINT NOT NULL,
                           old_data     JSONB NULL,
                           new_data     JSONB NULL,
                           created_at   TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
                           FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- ============================================================
--  SECTION 11: INDEXES
-- ============================================================

-- Users
CREATE INDEX idx_users_active             ON Users(user_id) WHERE is_deleted = FALSE AND is_active = TRUE;

-- Courses
CREATE INDEX idx_courses_active           ON Courses(course_id) WHERE is_deleted = FALSE;
CREATE INDEX idx_courses_price            ON Courses(base_price);
CREATE INDEX idx_courses_level            ON Courses(level);
CREATE INDEX idx_courses_title            ON Courses(title);
CREATE INDEX idx_courses_slug             ON Courses(slug);
CREATE INDEX idx_courses_instructor       ON Courses(instructor_id);

-- Sections & Lessons
CREATE INDEX idx_sections_course          ON Sections(course_id);
CREATE INDEX idx_lessons_section          ON Lessons(section_id);

-- Course relations
CREATE INDEX idx_course_categories_course ON CourseCategories(course_id);
CREATE INDEX idx_course_categories_cat    ON CourseCategories(category_id);
CREATE INDEX idx_course_tags_course       ON CourseTags(course_id);
CREATE INDEX idx_course_tags_tag          ON CourseTags(tag_id);
CREATE UNIQUE INDEX uq_course_primary_category ON CourseCategories(course_id) WHERE is_primary = TRUE;

-- Orders & Payments
CREATE INDEX idx_orders_user              ON Orders(user_id);
CREATE INDEX idx_orders_status_pending    ON Orders(status) WHERE status = 'PENDING';
-- Index tổng quát cho các status khác (dashboard admin)
CREATE INDEX idx_orders_status            ON Orders(status);
CREATE INDEX idx_order_items_order        ON OrderItems(order_id);
CREATE INDEX idx_order_items_course       ON OrderItems(course_id);
CREATE INDEX idx_payments_order           ON Payments(order_id);

-- Enrollments & Progress
CREATE INDEX idx_enrollment_user_id       ON Enrollments(user_id);
CREATE INDEX idx_enrollment_course_id     ON Enrollments(course_id);
CREATE INDEX idx_enrollments_order        ON Enrollments(order_id);
CREATE INDEX idx_lesson_progress_user     ON LessonProgress(user_id);
CREATE INDEX idx_lesson_progress_lesson   ON LessonProgress(lesson_id);

-- Vouchers & Promotions
CREATE INDEX idx_vouchers_active          ON Vouchers(end_date) WHERE is_active = TRUE;
CREATE INDEX idx_promotions_dates         ON Promotions(start_date, end_date);
CREATE INDEX idx_promotion_course_course  ON PromotionCourses(course_id);

-- Reviews
CREATE INDEX idx_review_course            ON Reviews(course_id);
CREATE INDEX idx_review_user              ON Reviews(user_id);

-- Notifications
CREATE INDEX idx_notif_user_id            ON Notifications(user_id);
CREATE INDEX idx_notif_unread             ON Notifications(user_id) WHERE is_read = FALSE;

-- Wishlist
CREATE INDEX idx_wishlist_user_id         ON Wishlist(user_id);

-- Auth
CREATE INDEX idx_email_token              ON VerificationTokens(token);
CREATE INDEX idx_email_token_user         ON VerificationTokens(user_id) WHERE is_used = FALSE;
CREATE INDEX idx_user_role_role           ON UserRole(role_id);

-- Audit
CREATE INDEX idx_audit_user               ON AuditLogs(user_id);
CREATE INDEX idx_audit_entity             ON AuditLogs(entity_name, entity_id);


-- ============================================================
--  SECTION 12: TRIGGERS
-- ============================================================

-- ------------------------------------------------------------
--  12.1 Auto-update updated_at
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at      BEFORE UPDATE ON Users      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_courses_updated_at    BEFORE UPDATE ON Courses    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_sections_updated_at   BEFORE UPDATE ON Sections   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_lessons_updated_at    BEFORE UPDATE ON Lessons    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_orders_updated_at     BEFORE UPDATE ON Orders     FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_vouchers_updated_at   BEFORE UPDATE ON Vouchers   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_promotions_updated_at BEFORE UPDATE ON Promotions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_reviews_updated_at    BEFORE UPDATE ON Reviews    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON Categories FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ------------------------------------------------------------
--  12.2 Chỉ user đã enrolled mới được track LessonProgress
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION check_lesson_progress_enrollment()
    RETURNS TRIGGER AS $$
DECLARE
    v_course_id BIGINT;
BEGIN
    SELECT s.course_id INTO v_course_id
    FROM Lessons l
             JOIN Sections s ON l.section_id = s.section_id
    WHERE l.lesson_id = NEW.lesson_id;

    IF NOT EXISTS (
        SELECT 1 FROM Enrollments
        WHERE user_id = NEW.user_id AND course_id = v_course_id
    ) THEN
        RAISE EXCEPTION 'User % chưa enrolled vào course %', NEW.user_id, v_course_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_lesson_progress_enrollment
    BEFORE INSERT ON LessonProgress
    FOR EACH ROW EXECUTE FUNCTION check_lesson_progress_enrollment();


-- ------------------------------------------------------------
--  12.3 Chỉ user đã enrolled mới được Review
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION check_review_enrollment()
    RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM Enrollments
        WHERE user_id = NEW.user_id AND course_id = NEW.course_id
    ) THEN
        RAISE EXCEPTION 'User % chưa enrolled vào course % nên không thể review',
            NEW.user_id, NEW.course_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_review_enrollment
    BEFORE INSERT ON Reviews
    FOR EACH ROW EXECUTE FUNCTION check_review_enrollment();


-- ------------------------------------------------------------
--  12.4 Tự động tăng Vouchers.used_count khi Order → PAID
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION sync_voucher_used_count()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'PAID'
        AND OLD.status != 'PAID'
        AND NEW.voucher_id IS NOT NULL
    THEN
        UPDATE Vouchers
        SET used_count = used_count + 1
        WHERE voucher_id = NEW.voucher_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_voucher_used_count
    AFTER UPDATE ON Orders
    FOR EACH ROW EXECUTE FUNCTION sync_voucher_used_count();


-- ------------------------------------------------------------
--  Trigger này chạy sau mỗi INSERT/UPDATE trên LessonProgress
--  Đảm bảo progress_percent luôn khớp với số lesson đã hoàn thành
--  Không cần application tự tính và update
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION sync_enrollment_progress()
    RETURNS TRIGGER AS $$
DECLARE
    v_course_id      BIGINT;
    v_total_lessons  INTEGER;
    v_done_lessons   INTEGER;
    v_new_percent    INTEGER;
BEGIN
    -- Xác định course từ lesson
    SELECT s.course_id INTO v_course_id
    FROM Lessons l
             JOIN Sections s ON l.section_id = s.section_id
    WHERE l.lesson_id = NEW.lesson_id;

    -- Tổng số lesson của course (không tính lesson đã xóa)
    SELECT COUNT(*) INTO v_total_lessons
    FROM Lessons l
             JOIN Sections s ON l.section_id = s.section_id
    WHERE s.course_id = v_course_id
      AND l.is_deleted = FALSE
      AND s.is_deleted = FALSE;

    -- Số lesson user đã hoàn thành
    SELECT COUNT(*) INTO v_done_lessons
    FROM LessonProgress lp
             JOIN Lessons l ON lp.lesson_id = l.lesson_id
             JOIN Sections s ON l.section_id = s.section_id
    WHERE lp.user_id = NEW.user_id
      AND s.course_id = v_course_id
      AND lp.is_completed = TRUE
      AND l.is_deleted = FALSE
      AND s.is_deleted = FALSE;

    -- Tính phần trăm, tránh chia 0
    IF v_total_lessons = 0 THEN
        v_new_percent := 0;
    ELSE
        v_new_percent := FLOOR(v_done_lessons * 100.0 / v_total_lessons);
    END IF;

    -- Cập nhật progress và completed_at nếu đạt 100%
    UPDATE Enrollments
    SET
        progress_percent = v_new_percent,
        completed_at = CASE
                           WHEN v_new_percent = 100 AND completed_at IS NULL THEN CURRENT_TIMESTAMP
                           WHEN v_new_percent < 100 THEN NULL
                           ELSE completed_at
            END
    WHERE user_id = NEW.user_id AND course_id = v_course_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_enrollment_progress
    AFTER INSERT OR UPDATE OF is_completed ON LessonProgress
    FOR EACH ROW EXECUTE FUNCTION sync_enrollment_progress();


-- ------------------------------------------------------------
--  Tránh data vô lý: xem 9999 giây video dài 300 giây
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION check_watched_seconds()
    RETURNS TRIGGER AS $$
DECLARE
    v_duration INTEGER;
BEGIN
    SELECT duration_seconds INTO v_duration
    FROM Lessons
    WHERE lesson_id = NEW.lesson_id;

    IF NEW.watched_seconds > v_duration THEN
        -- Tự clamp về duration thay vì raise exception
        -- Tránh lỗi do network lag hoặc player report thừa vài giây
        NEW.watched_seconds := v_duration;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_watched_seconds
    BEFORE INSERT OR UPDATE OF watched_seconds ON LessonProgress
    FOR EACH ROW EXECUTE FUNCTION check_watched_seconds();


-- ============================================================
--  SECTION 13: MATERIALIZED VIEW — Course Rating Summary
--  Tránh tính AVG(rating) realtime mỗi lần load trang course
-- ============================================================

CREATE MATERIALIZED VIEW CourseRatingSummary AS
SELECT
    course_id,
    COUNT(*)                                AS review_count,
    ROUND(AVG(rating)::NUMERIC, 2)          AS avg_rating,
    COUNT(*) FILTER (WHERE rating = 5)      AS star_5,
    COUNT(*) FILTER (WHERE rating = 4)      AS star_4,
    COUNT(*) FILTER (WHERE rating = 3)      AS star_3,
    COUNT(*) FILTER (WHERE rating = 2)      AS star_2,
    COUNT(*) FILTER (WHERE rating = 1)      AS star_1
FROM Reviews
GROUP BY course_id;

CREATE UNIQUE INDEX ON CourseRatingSummary(course_id);

-- Tự động refresh sau mỗi thay đổi trên Reviews
-- FOR EACH STATEMENT: refresh 1 lần dù nhiều row thay đổi cùng lúc
CREATE OR REPLACE FUNCTION refresh_course_rating_summary()
    RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY CourseRatingSummary;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_refresh_rating_summary
    AFTER INSERT OR UPDATE OR DELETE ON Reviews
    FOR EACH STATEMENT
EXECUTE FUNCTION refresh_course_rating_summary();

-- Cách query:
-- SELECT * FROM CourseRatingSummary WHERE course_id = 1;
