import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../../../hook/UseAxiosPrivate.js";
import { getAdminCoursesApi } from "../../../api/admin/CourseApi.js";
import { getAdminInstructorsApi } from "../../../api/admin/InstructorApi.js";
import CourseFilters from "./filters/CourseFilters";
import CourseStatistics from "./statistics/CourseStatistics";
import CourseTable from "./courseTable/CourseTable";
import "./Course.css";

const mergeInstructorOptions = (apiInstructors = [], courseData = []) => {
  const instructorMap = new Map();

  apiInstructors.forEach((instructor) => {
    const instructorId = instructor.instructorId ?? instructor.id;
    if (!instructorId) return;

    instructorMap.set(String(instructorId), {
      instructorId,
      fullName:
        instructor.fullName ||
        instructor.email ||
        instructor.instructorName ||
        `Instructor #${instructorId}`,
      email: instructor.email,
    });
  });

  courseData.forEach((course) => {
    if (!course.instructorId || instructorMap.has(String(course.instructorId))) {
      return;
    }

    instructorMap.set(String(course.instructorId), {
      instructorId: course.instructorId,
      fullName: course.instructorName || `Instructor #${course.instructorId}`,
    });
  });

  return Array.from(instructorMap.values());
};

const Course = () => {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");
        const courseData = await getAdminCoursesApi(axiosPrivate);
        const normalizedCourses = Array.isArray(courseData) ? courseData : [];

        let instructorData = [];
        try {
          instructorData = await getAdminInstructorsApi(axiosPrivate);
        } catch (instructorError) {
          instructorData = [];
        }

        if (isMounted) {
          setCourses(normalizedCourses);
          setInstructors(
            mergeInstructorOptions(
              Array.isArray(instructorData) ? instructorData : [],
              normalizedCourses,
            ),
          );
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError?.response?.data?.message || "Không tải được danh sách khóa học.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCourses();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate]);

  return (
    <section className="coursePage" aria-label="Quản lý khóa học">
      <div className="courseContent">
        <CourseStatistics courses={courses} loading={loading} />
        <CourseFilters onAddCourse={() => setIsCourseFormOpen(true)} />
        <CourseTable
          courses={courses}
          loading={loading}
          error={error}
          instructors={instructors}
          axiosClient={axiosPrivate}
          isCreateOpen={isCourseFormOpen}
          onCreateClose={() => setIsCourseFormOpen(false)}
          onCourseCreated={(course) => setCourses((current) => [course, ...current])}
          onCourseUpdated={(updatedCourse) =>
            setCourses((current) =>
              current.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)),
            )
          }
        />
      </div>
    </section>
  );
};

export default Course;
