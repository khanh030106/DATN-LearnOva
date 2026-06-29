package com.example.back_end.service;

import com.example.back_end.dto.response.CourseResponse;
import com.example.back_end.entity.Course;
import com.example.back_end.entity.User;
import com.example.back_end.entity.Wishlist;
import com.example.back_end.entity.WishlistId;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.repository.CourseRepository;
import com.example.back_end.repository.UserRepository;
import com.example.back_end.repository.WishlistRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WishlistService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final WishlistRepository wishlistRepository;

    public List<CourseResponse> getUserWishlist(String email) {
        User user = findActiveUser(email);
        return wishlistRepository.findByUser_Id(user.getId()).stream()
                .map(wishlist -> toCourseResponse(wishlist.getCourse()))
                .toList();
    }

    public void addCourseToWishlist(String email, Long courseId) {
        User user = findActiveUser(email);
        if (wishlistRepository.existsByUser_IdAndCourse_Id(user.getId(), courseId)) {
            return;
        }

        Course course = courseRepository.findByIdAndIsDeletedFalse(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        Wishlist wishlist = new Wishlist();
        WishlistId id = new WishlistId();
        id.setUserId(user.getId());
        id.setCourseId(course.getId());

        wishlist.setId(id);
        wishlist.setUser(user);
        wishlist.setCourse(course);
        wishlist.setCreatedAt(Instant.now());

        wishlistRepository.save(wishlist);
    }

    public void removeCourseFromWishlist(String email, Long courseId) {
        User user = findActiveUser(email);
        wishlistRepository.deleteByUser_IdAndCourse_Id(user.getId(), courseId);
    }

    private CourseResponse toCourseResponse(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getTitle(),
                course.getThumbnailKey(),
                course.getBasePrice(),
                course.getLevel() != null ? course.getLevel().name() : null,
                course.getInstructor() != null ? course.getInstructor().getFullName() : null
        );
    }

    private User findActiveUser(String email) {
        return userRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
