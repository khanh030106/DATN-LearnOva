package com.example.back_end.tool;

import com.example.back_end.entity.Enrollment;
import com.example.back_end.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

/**
 * One-off tool: for every user enrolled in more than 5 courses, randomly
 * keep only 3-5 enrollments and delete the rest.
 *
 * Usage: mvn spring-boot:run -Dspring-boot.run.profiles=trim-enrollments
 */
@Component
@Profile("trim-enrollments")
@RequiredArgsConstructor
@Slf4j
public class EnrollmentTrimmer implements CommandLineRunner {

    private static final int MIN_KEEP = 3;
    private static final int MAX_KEEP = 5;

    private final EnrollmentRepository enrollmentRepository;
    private final ApplicationContext applicationContext;

    @Override
    public void run(String... args) {
        List<Long> userIds = enrollmentRepository.findDistinctUserIds();

        int usersTrimmed = 0;
        int enrollmentsRemoved = 0;

        for (Long userId : userIds) {
            List<Enrollment> enrollments = enrollmentRepository.findByUserIdWithCourseAndInstructor(userId);

            if (enrollments.size() <= MAX_KEEP) {
                continue;
            }

            int keepCount = ThreadLocalRandom.current().nextInt(MIN_KEEP, MAX_KEEP + 1);

            Collections.shuffle(enrollments);
            List<Enrollment> toRemove = enrollments.subList(keepCount, enrollments.size());

            enrollmentRepository.deleteAll(toRemove);

            enrollmentsRemoved += toRemove.size();
            usersTrimmed++;

            log.info("User {}: kept {} of {} enrollments", userId, keepCount, enrollments.size());
        }

        log.info("Trimmed {} users, removed {} enrollments in total", usersTrimmed, enrollmentsRemoved);

        System.exit(SpringApplication.exit(applicationContext, () -> 0));
    }

}
