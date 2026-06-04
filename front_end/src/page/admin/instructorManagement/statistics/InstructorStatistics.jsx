import CourseLoadCard from "./cards/courseLoad/CourseLoadCard";
import StudentEnrollmentCard from "./cards/studentEnrollment/StudentEnrollmentCard";
import RevenueSummaryCard from "./cards/revenueSummary/RevenueSummaryCard";
import "./InstructorStatistics.css";

// Dữ liệu tổng quan để map ra 3 khối thống kê.
const instructorStatisticsData = [
  {
    id: "course-load",
    render: (props) => <CourseLoadCard {...props} />,
    title: "Khóa học phụ trách",
    value: "33",
    note: "Số lượng khóa học đang được giảng viên quản lý.",
  },
  {
    id: "student-enrollment",
    render: (props) => <StudentEnrollmentCard {...props} />,
    title: "Học viên đăng ký",
    value: "5.680",
    note: "Tổng số lượt học viên tham gia các lớp hiện có.",
  },
  {
    id: "revenue-summary",
    render: (props) => <RevenueSummaryCard {...props} />,
    title: "Doanh thu hệ thống",
    value: "608.000.000 đ",
    note: "Tổng doanh thu ước tính từ các giảng viên đang hoạt động.",
  },
];

const InstructorStatistics = () => {
  return (
    <section className="instructorStatistics" aria-label="Thống kê giảng viên">
      <div className="instructorStatisticsGrid">
        {instructorStatisticsData.map(({ id, render, ...statProps }) => (
          <div key={id}>{render(statProps)}</div>
        ))}
      </div>
    </section>
  );
};

export default InstructorStatistics;
