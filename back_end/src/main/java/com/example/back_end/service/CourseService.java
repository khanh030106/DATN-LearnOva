package com.example.back_end.service;

import com.example.back_end.dto.response.CreateLessonResponse;
import com.example.back_end.dto.response.TeacherCoursesResponse;
import com.example.back_end.dto.resquest.CreateDraftCourseRequest;
import com.example.back_end.dto.resquest.CreateLessonRequest;
import com.example.back_end.dto.resquest.CreateSectionRequest;
import com.example.back_end.entity.Category;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Coursecategory;
import com.example.back_end.entity.CoursecategoryId;
import com.example.back_end.entity.Section;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.CourseStatus;
import com.example.back_end.exception.BusinessException;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.CoursecategoryRepository;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.SectionRepository;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.repository.admin.AdminCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CoursecategoryRepository coursecategoryRepository;
    private final AdminCategoryRepository categoryRepository;

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

        if (request.categoryId() != null) {
            Category category = categoryRepository.findActiveById(request.categoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

            CoursecategoryId ccId = new CoursecategoryId();
            ccId.setCourseId(course.getId());
            ccId.setCategoryId(category.getId());

            Coursecategory cc = new Coursecategory();
            cc.setId(ccId);
            cc.setCourse(course);
            cc.setCategory(category);
            cc.setIsPrimary(true);

            coursecategoryRepository.save(cc);
        }

        return course.getId();
    }

    public void updateCourseStatus(Long courseId, String email, String status) {
        User instructor = userRepository
                .findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        if (!course.getInstructor().getId().equals(instructor.getId())) {
            throw new BusinessException("You don't have permission to modify this course");
        }

        CourseStatus newStatus;
        try {
            newStatus = CourseStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BusinessException("Invalid course status: " + status);
        }

        course.setStatus(newStatus);
        course.setUpdatedAt(Instant.now());
        if (newStatus == CourseStatus.PUBLISHED && course.getPublishedAt() == null) {
            course.setPublishedAt(OffsetDateTime.now());
        }
        courseRepository.save(course);
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
                .map(course -> {
                    String categoryName = course.getCoursecategories().stream()
                            .filter(cc -> Boolean.TRUE.equals(cc.getIsPrimary()))
                            .findFirst()
                            .map(cc -> cc.getCategory().getName())
                            .orElse(null);

                    long lessonCount = course.getSections().stream()
                            .filter(s -> !Boolean.TRUE.equals(s.getIsDeleted()))
                            .flatMap(s -> s.getLessons().stream())
                            .filter(l -> !Boolean.TRUE.equals(l.getIsDeleted()))
                            .count();

                    return new TeacherCoursesResponse(
                            course.getId(),
                            course.getTitle(),
                            course.getThumbnailKey(),
                            course.getStatus(),
                            course.getBasePrice(),
                            course.getCreatedAt(),
                            categoryName,
                            lessonCount
                    );
                })
                .toList();
    }

}
