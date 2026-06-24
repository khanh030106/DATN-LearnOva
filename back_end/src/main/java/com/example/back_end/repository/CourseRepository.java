package com.example.back_end.repository;

import com.example.back_end.dto.response.CourseResponse;
import com.example.back_end.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

	@Query("SELECT new com.example.back_end.dto.response.CourseResponse("
			+ "c.id, c.title, c.thumbnailUrl, c.basePrice, CAST(c.level AS string), u.fullName) "
			+ "FROM Course c JOIN c.instructor u "
			+ "WHERE c.isDeleted = false AND c.status = 'PUBLISHED'")
	List<CourseResponse> findAllPublishedWithInstructor();
}