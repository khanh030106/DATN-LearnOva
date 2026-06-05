import CourseLoadCard from "./cards/courseLoad/CourseLoadCard";
import StudentEnrollmentCard from "./cards/studentEnrollment/StudentEnrollmentCard";
import RevenueSummaryCard from "./cards/revenueSummary/RevenueSummaryCard";
import "./InstructorStatistics.css";

const instructorStatisticsData = [
  {
    id: "course-load",
    render: (props) => <CourseLoadCard {...props} />,
    title: "Managed Courses",
    value: "33",
    note: "Number of courses currently managed by instructors.",
  },
  {
    id: "student-enrollment",
    render: (props) => <StudentEnrollmentCard {...props} />,
    title: "Student Enrollment",
    value: "5.680",
    note: "Total number of student enrollments in existing classes.",
  },
  {
    id: "revenue-summary",
    render: (props) => <RevenueSummaryCard {...props} />,
    title: "System Revenue",
    value: "608.000.000 đ",
    note: "Estimated total revenue from active instructors.",
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
