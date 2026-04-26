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
                         FOREIGN KEY (user_id) REFERENCES Users(user_id),
                         FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);