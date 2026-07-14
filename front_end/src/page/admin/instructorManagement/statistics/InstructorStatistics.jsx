import CourseLoadCard from "./cards/courseLoad/CourseLoadCard";
import StudentEnrollmentCard from "./cards/studentEnrollment/StudentEnrollmentCard";
import RevenueSummaryCard from "./cards/revenueSummary/RevenueSummaryCard";
import "./InstructorStatistics.css";

const formatCurrency = (value) => {
  const amount = Number(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(amount) ? amount : 0);
};

const formatNumber = (value) =>
  new Intl.NumberFormat("vi-VN").format(value == null ? 0 : Number(value) || 0);

const getInstructorStats = (instructors) => ({
  totalCourses: instructors.reduce((sum, instructor) => sum + (instructor.numberOfClasses ?? 0), 0),
  totalStudents: instructors.reduce((sum, instructor) => sum + (instructor.totalStudents ?? 0), 0),
  totalRevenue: instructors.reduce((sum, instructor) => sum + Number(instructor.totalRevenue ?? 0), 0),
});

const InstructorStatistics = ({ instructors = [], isLoading = false, error = "" }) => {
  const stats = getInstructorStats(instructors);

  return (
    <section className="instructorStatistics" aria-label="Instructor statistics">
      {error && (
        <div className="instructorStatistics__error">
          {error}
        </div>
      )}
      <div className="instructorStatisticsGrid">
        <div>
          <CourseLoadCard title="Managed Courses" value={isLoading ? "—" : String(stats.totalCourses)} note="Number of courses currently managed by instructors." />
        </div>
        <div>
          <StudentEnrollmentCard title="Student Enrollment" value={isLoading ? "—" : formatNumber(stats.totalStudents)} note="Total number of student enrollments in existing classes." />
        </div>
        <div>
          <RevenueSummaryCard title="System Revenue" value={isLoading ? "—" : formatCurrency(stats.totalRevenue)} note="Estimated total revenue from active instructors." />
        </div>
      </div>
    </section>
  );
};

export default InstructorStatistics;
