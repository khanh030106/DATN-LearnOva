package com.example.back_end.repository.admin;

import com.example.back_end.entity.OrderItem;
import java.math.BigDecimal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdminRevenueRepository extends JpaRepository<OrderItem, Long> {

    interface CourseRankingProjection {
        Long getCourseId();
        String getTitle();
        Long getInstructorId();
        String getInstructor();
        Long getCategoryId();
        String getCategory();
        Long getStudents();
        BigDecimal getRevenue();
        BigDecimal getShare();
    }

    interface InstructorRankingProjection {
        Long getInstructorId();
        String getInstructor();
        Long getTotalCourses();
        Long getTotalStudents();
        BigDecimal getRevenue();
        BigDecimal getAvgPerCourse();
        BigDecimal getShare();
    }

    @Query(
            value = """
                    SELECT
                        ranked.course_id AS "courseId",
                        ranked.title AS title,
                        ranked.instructor_id AS "instructorId",
                        ranked.instructor AS instructor,
                        ranked.category_id AS "categoryId",
                        ranked.category AS category,
                        ranked.students AS students,
                        ranked.revenue AS revenue,
                        ROUND((ranked.revenue / NULLIF(SUM(ranked.revenue) OVER (), 0)) * 100, 2) AS share
                    FROM (
                        SELECT
                            c.course_id,
                            c.title,
                            u.user_id AS instructor_id,
                            u.full_name AS instructor,
                            cate.category_id,
                            cate.name AS category,
                            COUNT(DISTINCT e.user_id) AS students,
                            COALESCE(SUM(o.total_amount), 0) AS revenue
                        FROM courses c
                        LEFT JOIN users u
                               ON c.instructor_id = u.user_id
                        LEFT JOIN course_categories cc
                               ON c.course_id = cc.course_id
                        LEFT JOIN categories cate
                               ON cc.category_id = cate.category_id
                        JOIN order_items oi
                               ON c.course_id = oi.course_id
                        JOIN orders o
                               ON oi.order_id = o.order_id
                              AND o.status = 'PAID'
                        JOIN payments p
                               ON p.order_id = o.order_id
                              AND p.status = 'SUCCESS'
                        LEFT JOIN enrollments e
                               ON c.course_id = e.course_id
                        WHERE c.is_deleted = FALSE
                        GROUP BY
                            c.course_id,
                            c.title,
                            u.user_id,
                            u.full_name,
                            cate.category_id,
                            cate.name
                    ) ranked
                    ORDER BY ranked.revenue DESC
                    """,
            countQuery = """
                    SELECT COUNT(*)
                    FROM (
                        SELECT
                            c.course_id,
                            cate.category_id
                        FROM courses c
                        LEFT JOIN course_categories cc
                               ON c.course_id = cc.course_id
                        LEFT JOIN categories cate
                               ON cc.category_id = cate.category_id
                        JOIN order_items oi
                               ON c.course_id = oi.course_id
                        JOIN orders o
                               ON oi.order_id = o.order_id
                              AND o.status = 'PAID'
                        JOIN payments p
                               ON p.order_id = o.order_id
                              AND p.status = 'SUCCESS'
                        WHERE c.is_deleted = FALSE
                        GROUP BY c.course_id, cate.category_id
                    ) counted
                    """,
            nativeQuery = true
    )
    Page<CourseRankingProjection> findTopRevenueCourses(Pageable pageable);

    @Query(
            value = """
                    SELECT
                        ranked.instructor_id AS "instructorId",
                        ranked.instructor AS instructor,
                        ranked.total_courses AS "totalCourses",
                        ranked.total_students AS "totalStudents",
                        ranked.revenue AS revenue,
                        ranked.avg_per_course AS "avgPerCourse",
                        ROUND((ranked.revenue / NULLIF(SUM(ranked.revenue) OVER (), 0)) * 100, 2) AS share
                    FROM (
                        SELECT
                            u.user_id AS instructor_id,
                            u.full_name AS instructor,
                            COUNT(DISTINCT c.course_id) AS total_courses,
                            COUNT(DISTINCT e.user_id) AS total_students,
                            COALESCE(SUM(o.total_amount), 0) AS revenue,
                            ROUND(
                                COALESCE(SUM(o.total_amount), 0) /
                                NULLIF(COUNT(DISTINCT c.course_id), 0),
                                2
                            ) AS avg_per_course
                        FROM users u
                        JOIN user_role ur
                          ON ur.user_id = u.user_id
                        JOIN roles r
                          ON r.role_id = ur.role_id
                        LEFT JOIN courses c
                          ON c.instructor_id = u.user_id
                         AND c.is_deleted = FALSE
                        JOIN order_items oi
                          ON oi.course_id = c.course_id
                        JOIN orders o
                          ON o.order_id = oi.order_id
                         AND o.status = 'PAID'
                        JOIN payments p
                          ON p.order_id = o.order_id
                         AND p.status = 'SUCCESS'
                        LEFT JOIN enrollments e
                          ON e.course_id = c.course_id
                        WHERE r.role_name = 'ROLE_TEACHER'
                        GROUP BY
                            u.user_id,
                            u.full_name
                    ) ranked
                    ORDER BY ranked.revenue DESC
                    """,
            countQuery = """
                    SELECT COUNT(*)
                    FROM (
                        SELECT u.user_id
                        FROM users u
                        JOIN user_role ur
                          ON ur.user_id = u.user_id
                        JOIN roles r
                          ON r.role_id = ur.role_id
                        LEFT JOIN courses c
                          ON c.instructor_id = u.user_id
                         AND c.is_deleted = FALSE
                        JOIN order_items oi
                          ON oi.course_id = c.course_id
                        JOIN orders o
                          ON o.order_id = oi.order_id
                         AND o.status = 'PAID'
                        JOIN payments p
                          ON p.order_id = o.order_id
                         AND p.status = 'SUCCESS'
                        WHERE r.role_name = 'ROLE_TEACHER'
                        GROUP BY u.user_id
                    ) counted
                    """,
            nativeQuery = true
    )
    Page<InstructorRankingProjection> findTopEarningInstructors(Pageable pageable);
}
