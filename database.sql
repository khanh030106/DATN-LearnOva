CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE account_type AS ENUM('LOCAL', 'GOOGLE', 'FACEBOOK', 'GITHUB');
CREATE TABLE Users(
                      user_id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY ,
                      full_name VARCHAR(100) NOT NULL ,
                      email TEXT NOT NULL ,
                      phone VARCHAR(10) NULL ,
                      avatar TEXT NULL ,
                      cover_image TEXT NULL ,
                      date_of_birth DATE NULL ,
                      gender gender_type NULL ,
                      password_hash TEXT NOT NULL ,
                      provider account_type NOT NULL ,
                      is_active BOOLEAN DEFAULT TRUE,
                      is_deleted BOOLEAN DEFAULT FALSE NOT NULL ,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE role_name AS ENUM ('ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_USER');
CREATE TABLE Roles(
                      role_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
                      role_name role_name NOT NULL
);

CREATE TABLE UserRole(
                         user_id BIGINT NOT NULL ,
                         role_id BIGINT NOT NULL ,
                         PRIMARY KEY (user_id, role_id),
                         FOREIGN KEY (user_id) REFERENCES Users(user_id),
                         FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

CREATE TABLE Categories(
    categories_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
    categories_name TEXT NOT NULL
);

CREATE TYPE course_level AS ENUM ('Beginner', 'Intermediate', 'Advanced');
CREATE TABLE Courses(
    course_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
    course_link TEXT NOT NULL ,
    course_image TEXT NOT NULL ,
    title TEXT NOT NULL ,
    description TEXT NOT NULL ,
    price NUMERIC(10, 2) NOT NULL ,
    level course_level NOT NULL ,
    is_deleted BOOLEAN DEFAULT FALSE ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NULL
);

CREATE TABLE CourseCategories(
    course_id BIGINT NOT NULL ,
    categories_id BIGINT NOT NULL ,
    PRIMARY KEY (course_id, categories_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    FOREIGN KEY (categories_id) REFERENCES Categories(categories_id)
);

CREATE TABLE CourseOwner(
    course_id BIGINT NOT NULL ,
    owner_id BIGINT NOT NULL ,
    PRIMARY KEY (course_id, owner_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);

CREATE TABLE Enrollment(
    course_id BIGINT NOT NULL ,
    user_id BIGINT NOT NULL ,
    progress INTEGER DEFAULT 0 NOT NULL ,
    enrolled_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    completed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NULL ,
    PRIMARY KEY (course_id, user_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Cart(
    cart_id BIGINT NOT NULL ,
    user_id BIGINT NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    PRIMARY KEY (cart_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE CartItems(
    cart_id BIGINT NOT NULL ,
    course_id BIGINT NOT NULL ,
    PRIMARY KEY (cart_id, course_id),
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE EmailVerificationTokens(
    token_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY  NOT NULL ,
    user_id BIGINT NOT NULL ,
    token TEXT NOT NULL ,
    expired_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    is_used BOOLEAN DEFAULT FALSE NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Notifications(
    notifications_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
    user_id BIGINT NOT NULL ,
    title TEXT NOT NULL ,
    content TEXT NOT NULL ,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE payment_method AS ENUM ('COD', 'E-WALLET');
CREATE TABLE PaymentHistory(
    payment_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
    course_id BIGINT NOT NULL ,
    payment_method payment_method NOT NULL ,
    amount NUMERIC(10, 2) NOT NULL ,
    payment_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Promotions(
    promotion_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
    promotion_name TEXT NOT NULL ,
    discount_percent INTEGER NOT NULL ,
    start_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    end_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE PromotionCourse(
    promotion_id BIGINT NOT NULL ,
    course_id BIGINT NOT NULL ,
    PRIMARY KEY (promotion_id, course_id),
    FOREIGN KEY (promotion_id) REFERENCES Promotions(promotion_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Review(
    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
    course_id BIGINT NOT NULL ,
    user_id BIGINT NOT NULL ,
    rating INTEGER NOT NULL ,
    comment TEXT NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TYPE discount_type AS ENUM('Fixed', 'Percent');
CREATE TABLE Vouchers(
    voucher_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL ,
    code TEXT NOT NULL ,
    description TEXT NOT NULL ,
    discount_type discount_type NOT NULL ,
    discount_value NUMERIC(10, 2) NOT NULL ,
    min_order_amount NUMERIC(10, 2) NOT NULL ,
    max_order_amount NUMERIC(10, 2) NOT NULL ,
    usage_limit INTEGER NOT NULL ,
    used_count INTEGER,
    start_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    end_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    is_active BOOLEAN DEFAULT TRUE NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE Wishlist(
    user_id BIGINT NOT NULL ,
    course_id BIGINT NOT NULL ,
    PRIMARY KEY (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);
