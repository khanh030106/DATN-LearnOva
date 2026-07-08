package com.example.back_end.service.admin;

import com.example.back_end.dto.response.admin.AdminDashboardResponse;
import com.example.back_end.repository.admin.AdminCourseRepository;
import com.example.back_end.repository.admin.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private static final List<String> MONTH_LABELS = List.of(
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
    );

    private final AdminUserRepository adminUserRepository;
    private final AdminCourseRepository adminCourseRepository;

    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboard(Integer year) {
        int selectedYear = year != null ? year : LocalDate.now(ZoneOffset.UTC).getYear();
        long totalUsers = adminUserRepository.countByIsDeletedFalse();
        long totalTeachers = adminUserRepository.countActiveTeachers();
        long totalCourses = adminCourseRepository.countByIsDeletedFalse();
        BigDecimal totalRevenue = adminCourseRepository.sumPaidRevenue();

        return new AdminDashboardResponse(
                new AdminDashboardResponse.Statistics(
                        totalUsers,
                        totalTeachers,
                        totalCourses,
                        totalRevenue == null ? BigDecimal.ZERO : totalRevenue
                ),
                getGrowthSeries(selectedYear),
                getRoleDistribution(),
                getRecentUsers(),
                getFeaturedInstructors(),
                List.of()
        );
    }

    private List<AdminDashboardResponse.GrowthPoint> getGrowthSeries(int year) {
        Map<Integer, Long> totalsByMonth = new LinkedHashMap<>();

        for (Object[] row : adminUserRepository.countActiveUsersByMonth(year)) {
            totalsByMonth.put(toInt(row[0]), toLong(row[1]));
        }

        return MONTH_LABELS.stream()
                .map(month -> {
                    int monthNumber = MONTH_LABELS.indexOf(month) + 1;
                    return new AdminDashboardResponse.GrowthPoint(
                            month,
                            totalsByMonth.getOrDefault(monthNumber, 0L)
                    );
                })
                .toList();
    }

    private List<AdminDashboardResponse.RoleDistributionItem> getRoleDistribution() {
        Map<String, Long> totals = new LinkedHashMap<>();
        totals.put("ROLE_USER", 0L);
        totals.put("ROLE_TEACHER", 0L);
        totals.put("ROLE_ADMIN", 0L);

        for (Object[] row : adminUserRepository.countActiveUsersByRoleName()) {
            totals.put(String.valueOf(row[0]), toLong(row[1]));
        }

        return List.of(
                new AdminDashboardResponse.RoleDistributionItem("Students", totals.get("ROLE_USER")),
                new AdminDashboardResponse.RoleDistributionItem("Instructors", totals.get("ROLE_TEACHER")),
                new AdminDashboardResponse.RoleDistributionItem("Administrators", totals.get("ROLE_ADMIN"))
        );
    }

    private List<AdminDashboardResponse.RecentUser> getRecentUsers() {
        return adminUserRepository.findRecentActiveUserRows()
                .stream()
                .map(row -> new AdminDashboardResponse.RecentUser(
                        toLong(row[0]),
                        firstPresent((String) row[1], (String) row[2], "User #" + row[0]),
                        firstPresent((String) row[2], "-", "-"),
                        getRoleLabel(String.valueOf(row[3]))
                ))
                .toList();
    }

    private List<AdminDashboardResponse.FeaturedInstructor> getFeaturedInstructors() {
        List<Object[]> rows = adminCourseRepository.findFeaturedInstructorRows();

        return rows.stream()
                .map(row -> {
                    int rank = rows.indexOf(row) + 1;
                    BigDecimal averageRating = toBigDecimal(row[5]).setScale(1, RoundingMode.HALF_UP);

                    return new AdminDashboardResponse.FeaturedInstructor(
                            toLong(row[0]),
                            firstPresent((String) row[1], (String) row[2], "Instructor #" + row[0]),
                            toLong(row[4]),
                            averageRating.doubleValue(),
                            rank,
                            firstPresent((String) row[3], "", "")
                    );
                })
                .toList();
    }

    private String getRoleLabel(String roleName) {
        return switch (roleName) {
            case "ROLE_ADMIN" -> "Administrator";
            case "ROLE_TEACHER" -> "Instructor";
            default -> "Student";
        };
    }

    private String firstPresent(String first, String second, String fallback) {
        if (first != null && !first.isBlank()) {
            return first;
        }
        if (second != null && !second.isBlank()) {
            return second;
        }
        return fallback;
    }

    private int toInt(Object value) {
        return value instanceof Number number ? number.intValue() : 0;
    }

    private long toLong(Object value) {
        return value instanceof Number number ? number.longValue() : 0L;
    }

    private BigDecimal toBigDecimal(Object value) {
        if (value instanceof BigDecimal decimal) {
            return decimal;
        }
        if (value instanceof Number number) {
            return BigDecimal.valueOf(number.doubleValue());
        }
        return BigDecimal.ZERO;
    }
}
