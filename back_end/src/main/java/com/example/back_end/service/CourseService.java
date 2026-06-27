package com.example.back_end.service;

import com.example.back_end.dto.response.CreateLessonResponse;
import com.example.back_end.dto.response.TeacherCoursesResponse;
import com.example.back_end.dto.resquest.CreateDraftCourseRequest;
import com.example.back_end.dto.resquest.CreateLessonRequest;
import com.example.back_end.dto.resquest.CreateSectionRequest;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.Section;
import com.example.back_end.entity.User;
import com.example.back_end.entity.enums.CourseStatus;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.SectionRepository;
import com.example.back_end.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

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
                .findByEmailAndIsDeletedFalse(email, false)
                .orElseThrow(() -> new RuntimeException("User not found"));

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
                .findByEmailAndIsDeletedFalse(email, false)
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

}
