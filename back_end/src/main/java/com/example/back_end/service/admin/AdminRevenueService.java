package com.example.back_end.service.admin;

import com.example.back_end.dto.response.admin.AdminRevenueCourseRankingResponse;
import com.example.back_end.dto.response.admin.AdminRevenueInstructorRankingResponse;
import com.example.back_end.repository.admin.AdminRevenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminRevenueService {

    private final AdminRevenueRepository adminRevenueRepository;

    public Page<AdminRevenueCourseRankingResponse> getTopRevenueCourses(Pageable pageable) {
        return adminRevenueRepository.findTopRevenueCourses(pageable)
                .map(row -> new AdminRevenueCourseRankingResponse(
                        row.getCourseId(),
                        row.getTitle(),
                        row.getInstructorId(),
                        row.getInstructor(),
                        row.getCategoryId(),
                        row.getCategory(),
                        row.getStudents(),
                        row.getRevenue(),
                        row.getShare()
                ));
    }

    public Page<AdminRevenueInstructorRankingResponse> getTopEarningInstructors(Pageable pageable) {
        return adminRevenueRepository.findTopEarningInstructors(pageable)
                .map(row -> new AdminRevenueInstructorRankingResponse(
                        row.getInstructorId(),
                        row.getInstructor(),
                        row.getTotalCourses(),
                        row.getTotalStudents(),
                        row.getRevenue(),
                        row.getAvgPerCourse(),
                        row.getShare()
                ));
    }
}
