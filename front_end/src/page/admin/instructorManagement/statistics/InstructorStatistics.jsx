import CourseLoadCard from "./cards/courseLoad/CourseLoadCard";
import StudentEnrollmentCard from "./cards/studentEnrollment/StudentEnrollmentCard";
import RevenueSummaryCard from "./cards/revenueSummary/RevenueSummaryCard";
import "./InstructorStatistics.css";

const formatMoney = (v) => {
  if (v == null) return "0 VND";
  return new Intl.NumberFormat("vi-VN").format(v) + " VND";
};

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
        <div style={{ 
          padding: "12px", 
          marginBottom: "16px", 
          backgroundColor: "#fee", 
          color: "#c00", 
          borderRadius: "4px",
          border: "1px solid #fcc"
        }}>
          {error}
        </div>
      )}
      <div className="instructorStatisticsGrid">
        <div>
          <CourseLoadCard title="Managed Courses" value={isLoading ? "—" : String(stats.totalCourses)} note="Number of courses currently managed by instructors." />
        </div>
        <div>
          <StudentEnrollmentCard title="Student Enrollment" value={isLoading ? "—" : new Intl.NumberFormat("vi-VN").format(stats.totalStudents)} note="Total number of student enrollments in existing classes." />
        </div>
        <div>
          <RevenueSummaryCard title="System Revenue" value={isLoading ? "—" : formatMoney(stats.totalRevenue)} note="Estimated total revenue from active instructors." />
        </div>
      </div>
    </section>
  );
};

export default InstructorStatistics;
