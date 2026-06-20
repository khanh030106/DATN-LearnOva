import { useEffect, useState } from "react";
import CourseLoadCard from "./cards/courseLoad/CourseLoadCard";
import StudentEnrollmentCard from "./cards/studentEnrollment/StudentEnrollmentCard";
import RevenueSummaryCard from "./cards/revenueSummary/RevenueSummaryCard";
import "./InstructorStatistics.css";
import { getAdminInstructorsApi } from "../../../../api/AdminInstructorApi.js";
import { useAxiosPrivate } from "../../../../hook/UseAxiosPrivate.js";

const formatMoney = (v) => {
  if (v == null) return "0 đ";
  return new Intl.NumberFormat("vi-VN").format(v) + " đ";
};

const InstructorStatistics = () => {
  const axiosPrivate = useAxiosPrivate();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await getAdminInstructorsApi(axiosPrivate);
        if (!Array.isArray(data)) return;
        const totalCourses = data.reduce((sum, i) => sum + (i.numberOfClasses ?? 0), 0);
        const totalStudents = data.reduce((sum, i) => sum + (i.totalStudents ?? 0), 0);
        const totalRevenue = data.reduce((sum, i) => sum + Number(i.totalRevenue ?? 0), 0);
        if (mounted) setStats({ totalCourses, totalStudents, totalRevenue });
      } catch (error) {
        console.error("Error fetching instructor statistics:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [axiosPrivate]);

  return (
    <section className="instructorStatistics" aria-label="Thống kê giảng viên">
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
