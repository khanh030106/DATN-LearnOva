DO $$
DECLARE
    v_user1_id BIGINT;
    v_user2_id BIGINT;
    v_teacher_role_id BIGINT;
BEGIN
    SELECT role_id INTO v_teacher_role_id FROM roles WHERE role_name = 'ROLE_TEACHER';

    INSERT INTO users (full_name, email, password_hash, is_active, is_deleted, created_at, updated_at)
    VALUES (
        'Trần Minh Anh',
        'tran.minhanh.instructor@learnova.local',
        '$2a$10$ETeZPKS4yoYPN8T60/NRMOivr0m/1CUYGnjwBtaLzs/7AHqeH7eBm',
        true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )
    RETURNING user_id INTO v_user1_id;

    INSERT INTO userrole (user_id, role_id) VALUES (v_user1_id, v_teacher_role_id);

    INSERT INTO instructor_profile (instructor_id, headline, description, expertise, created_at, updated_at)
    VALUES (
        v_user1_id,
        'Senior Data Scientist & AI Instructor',
        'Chuyên gia Data Science với hơn 8 năm kinh nghiệm làm việc tại các công ty công nghệ, đam mê giảng dạy Machine Learning và AI ứng dụng thực tế.',
        'Python,Machine Learning,Data Science,Deep Learning',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    );

    INSERT INTO users (full_name, email, password_hash, is_active, is_deleted, created_at, updated_at)
    VALUES (
        'Lê Hoàng Nam',
        'le.hoangnam.instructor@learnova.local',
        '$2a$10$ETeZPKS4yoYPN8T60/NRMOivr0m/1CUYGnjwBtaLzs/7AHqeH7eBm',
        true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )
    RETURNING user_id INTO v_user2_id;

    INSERT INTO userrole (user_id, role_id) VALUES (v_user2_id, v_teacher_role_id);

    INSERT INTO instructor_profile (instructor_id, headline, description, expertise, created_at, updated_at)
    VALUES (
        v_user2_id,
        'UI/UX Design Lead',
        'Design lead với nhiều năm kinh nghiệm xây dựng hệ thống thiết kế cho các sản phẩm số, tận tâm hướng dẫn học viên tư duy thiết kế lấy người dùng làm trung tâm.',
        'Figma,UI Design,UX Research,Design Systems',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    );
END $$;
