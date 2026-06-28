package com.example.back_end.service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.back_end.dto.response.PublicCourseResponse;
import com.example.back_end.dto.response.TeacherCoursesResponse;
import com.example.back_end.dto.resquest.CreateDraftCourseRequest;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.CourseStatus;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public Long createDraftCourse(
            CreateDraftCourseRequest request,
            String email
    ) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Course course = new Course();

        course.setTitle(request.title());
        course.setDescription(request.description());
        course.setLanguage(request.language());
        course.setLevel(request.level());
        course.setBasePrice(request.basePrice());
        course.setRequirements(request.requirements());
        course.setWhatYouLearn(request.whatYouLearn());
        course.setThumbnailKey(request.thumbnailKey());
        course.setStatus(CourseStatus.DRAFT);
        course.setInstructor(instructor);
        course.setIsDeleted(false);
        course.setSlug(UUID.randomUUID().toString());
        course.setCreatedAt(Instant.now());
        course.setUpdatedAt(Instant.now());

        courseRepository.save(course);

        return course.getId();
    }

    public List<TeacherCoursesResponse> getMyCourses(String email) {

        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow();

        return courseRepository
                .findByInstructorIdAndIsDeletedFalseOrderByCreatedAtDesc(
                        instructor.getId()
                )
                .stream()
                .map(course -> new TeacherCoursesResponse(
                        course.getId(),
                        course.getTitle(),
                        course.getThumbnailKey(),
                        course.getStatus(),
                        course.getBasePrice(),
                        course.getCreatedAt()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PublicCourseResponse> getPublishedCourses() {
        return courseRepository
                .findByStatusAndIsDeletedFalseOrderByCreatedAtDesc(CourseStatus.PUBLISHED)
                .stream()
                .map(this::toPublicCourseResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PublicCourseResponse getPublishedCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .filter(item -> item.getStatus() == CourseStatus.PUBLISHED)
                .filter(item -> !Boolean.TRUE.equals(item.getIsDeleted()))
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        return toPublicCourseResponse(course);
    }

    private PublicCourseResponse toPublicCourseResponse(Course course) {
        return new PublicCourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getInstructor().getFullName(),
                course.getBasePrice(),
                course.getLevel(),
                course.getStatus(),
                course.getThumbnailKey()
        );
    }

}
