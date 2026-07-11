import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyCourse, getFileUrl, softDeleteCourse, toggleCourseVisibility } from "../../../api/teacher/CourseApi.js";
import {
  buildCategoryOptions,
  getFilteredCourses,
  sortCourses,
} from "./coursePageConfig.js";
import CoursesTable from "./components/CoursesTable.jsx";
import CoursesToolbar from "./components/CoursesToolbar.jsx";
import DeleteConfirmModal from "./components/DeleteConfirmModal.jsx";
import CourseDetailModal from "./components/CourseDetailModal.jsx";
import "./CoursesPage.css";

const COURSES_CREATE_PATH = "/learnova/teacher/courses/create";

const CoursesPage = () => {
  const navigate = useNavigate();
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortOption, setSortOption] = useState("NEWEST");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState({ open: false, courseId: null, courseName: "" });
  const [isDeleting, setIsDeleting] = useState(false);
  const [detailCourse, setDetailCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const coursesData = await getMyCourse();

        const transformedCourses = await Promise.all(
          coursesData.map(async (course) => {
            const isPublished = course.status === "PUBLISHED";

            const createdDate = new Date(course.createdAt);
            const now = new Date();
            const diffInDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
            const createdAgo =
              diffInDays === 0 ? "Today" :
              diffInDays === 1 ? "Yesterday" :
              diffInDays < 30 ? `${diffInDays} days ago` :
              diffInDays < 365 ? `${Math.floor(diffInDays / 30)} months ago` :
              `${Math.floor(diffInDays / 365)} years ago`;

            let thumbnailUrl = "/default-course-thumbnail.jpg";
            if (course.thumbnailKey) {
              try {
                thumbnailUrl = await getFileUrl(course.thumbnailKey);
              } catch {
                // fallback to default
              }
            }

            return {
              id: course.courseId,
              title: course.title,
              thumbnailKey: course.thumbnailKey,
              image: thumbnailUrl,
              status: course.status,
              courseStatus: course.status,
              rejectionReason: course.rejectionReason ?? null,
              basePrice: course.basePrice,
              displayPrice: isPublished ? `$${course.basePrice || 0}` : "-",
              createdAt: course.createdAt,
              updatedAt: course.createdAt,
              createdAgo,
              isDeleted: course.isDeleted ?? false,
              category: course.categoryName || "Uncategorized",
              modules: course.lessonCount ?? 0,
              totalDurationSeconds: course.totalDurationSeconds ?? 0,
              studentCount: course.studentCount ?? 0,
              students: `${course.studentCount ?? 0} students`,
              rating: isPublished ? "0.0" : "-",
            };
          })
        );

        setTeacherCourses(transformedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categoryOptions = useMemo(() => buildCategoryOptions(teacherCourses), [teacherCourses]);

  const activeCourses = useMemo(() => {
    const filteredCourses = getFilteredCourses({
      activeCategory,
      activeFilter,
      courses: teacherCourses,
      searchTerm,
    });

    return sortCourses(filteredCourses, sortOption);
  }, [activeCategory, activeFilter, searchTerm, sortOption, teacherCourses]);

  const handleCreateCourse = () => {
    navigate(COURSES_CREATE_PATH);
  };

  const handleUpdateCourse = (course) => {
    navigate(`/learnova/teacher/courses/edit/${course.id}`);
  };

  const handleDeleteClick = (course) => {
    setDeleteModal({ open: true, courseId: course.id, courseName: course.title });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await softDeleteCourse(deleteModal.courseId);
      setTeacherCourses((courses) =>
        courses.map((c) =>
          c.id === deleteModal.courseId ? { ...c, isDeleted: true } : c
        )
      );
      toast.success("Course hidden successfully.");
    } catch (err) {
      toast.error("Failed to hide course. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteModal({ open: false, courseId: null, courseName: "" });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ open: false, courseId: null, courseName: "" });
  };

  const handleViewDetail = (course) => {
    setDetailCourse(course);
  };

  const handleToggleVisibility = async (course) => {
    try {
      await toggleCourseVisibility(course.id);
      setTeacherCourses((courses) =>
        courses.map((c) =>
          c.id === course.id ? { ...c, isDeleted: !c.isDeleted } : c
        )
      );
      toast.success(course.isDeleted ? "Course activated." : "Course deactivated.");
    } catch {
      toast.error("Failed to update course visibility.");
    }
  };

  if (isLoading) {
    return (
      <section className="teacher-courses-page">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Loading courses...
        </div>
      </section>
    );
  }

  return (
    <section className="teacher-courses-page">

      <CoursesToolbar
        activeCategory={activeCategory}
        activeFilter={activeFilter}
        categoryOptions={categoryOptions}
        onCategoryChange={setActiveCategory}
        onCreateCourse={handleCreateCourse}
        onFilterChange={setActiveFilter}
        onSearchChange={setSearchTerm}
        onSortChange={setSortOption}
        searchTerm={searchTerm}
        sortOption={sortOption}
      />

      <CoursesTable
        courses={activeCourses}
        onDeleteCourse={handleDeleteClick}
        onUpdateCourse={handleUpdateCourse}
        onToggleVisibility={handleToggleVisibility}
        onViewDetail={handleViewDetail}
      />

      {deleteModal.open && (
        <DeleteConfirmModal
          courseName={deleteModal.courseName}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          isDeleting={isDeleting}
        />
      )}

      {detailCourse && (
        <CourseDetailModal
          course={detailCourse}
          onClose={() => setDetailCourse(null)}
        />
      )}
    </section>
  );
};

export default CoursesPage;
