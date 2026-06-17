import { useState } from "react";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { FaStar } from "react-icons/fa";
import "./CourseTable.css";

const courseTableData = [
  {
    id: "course-10",
    title: "Machine Learning Fundamentals for Data Analysts",
    instructor: "Vũ Hải Đăng",
    category: "Artificial Intelligence (AI)",
    students: 180,
    rating: 4.7,
    revenue: "$0",
    publishDate: "01/06/2026",
    reportCount: 0,
    status: "Active",
  },
  {
    id: "KH002",
    title: "UI/UX Design Fundamentals",
    instructor: "Trần Thị B",
    category: "Design",
    students: 180,
    rating: 4.7,
    revenue: "$0",
    publishDate: "22/04/2026",
    reportCount: 1,
    status: "Active",
  },
  {
    id: "KH003",
    title: "Digital Marketing",
    instructor: "Lê Văn C",
    category: "Marketing",
    students: 95,
    rating: 4.5,
    revenue: "$68.000",
    publishDate: "05/03/2026",
    reportCount: 2,
    status: "Hidden",
  },
  {
    id: "KH004",
    title: "Agile Project Management",
    instructor: "Ngọc Lan",
    category: "Business",
    students: 132,
    rating: 4.6,
    revenue: "$89.000",
    publishDate: "16/02/2026",
    reportCount: 0,
    status: "Active",
  },
  {
    id: "KH005",
    title: "SEO & Content Marketing",
    instructor: "Hoàng Phương",
    category: "Marketing",
    students: 110,
    rating: 4.4,
    revenue: "$0",
    publishDate: "28/01/2026",
    reportCount: 3,
    status: "Locked",
  },
  {
    id: "KH006",
    title: "Advanced React Frontend Development",
    instructor: "Quách Duy Đức",
    category: "Programming",
    students: 205,
    rating: 4.9,
    revenue: "$135.000",
    publishDate: "12/01/2026",
    reportCount: 0,
    status: "Active",
  },
  {
    id: "KH007",
    title: "Figma and Product Design",
    instructor: "Bùi Thị Thảo",
    category: "Design",
    students: 88,
    rating: 4.6,
    revenue: "$72.000",
    publishDate: "04/12/2025",
    reportCount: 1,
    status: "Active",
  },
  {
    id: "KH008",
    title: "Data Analysis with SQL",
    instructor: "Lê Ngọc Nam",
    category: "Business",
    students: 127,
    rating: 4.7,
    revenue: "$81.000",
    publishDate: "14/11/2025",
    reportCount: 3,
    status: "Locked",
  },
  {
    id: "KH009",
    title: "Professional Presentation Skills",
    instructor: "Bùi Thị Thảo",
    category: "Business",
    students: 72,
    rating: 4.5,
    revenue: "$0",
    publishDate: "08/10/2025",
    reportCount: 0,
    status: "Active",
  },
  {
    id: "KH010",
    title: "Digital Product Development",
    instructor: "Phạm Hoài An",
    category: "Business",
    students: 158,
    rating: 4.8,
    revenue: "$107.000",
    publishDate: "25/09/2025",
    reportCount: 0,
    status: "Active",
  },
  {
    id: "KH011",
    title: "Mobile Application Development",
    instructor: "Nguyễn Lê",
    category: "Programming",
    students: 134,
    rating: 4.6,
    revenue: "$98.000",
    publishDate: "28/08/2025",
    reportCount: 1,
    status: "Active",
  },
  {
    id: "KH012",
    title: "Social Media Marketing Strategy",
    instructor: "Trần Thị Minh Thư",
    category: "Marketing",
    students: 98,
    rating: 4.4,
    revenue: "$0",
    publishDate: "13/07/2025",
    reportCount: 3,
    status: "Locked",
  },
];

const CourseTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(courseTableData.length / pageSize);
  const currentPageItems = courseTableData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section
      className="courseTableSection"
      aria-label="Course Management Table"
    >
      <div className="courseTableCard">
        <table className="courseTable" aria-label="Course List">
          <thead>
            <tr>
              <th>Course</th>
              <th>Instructor</th>
              <th>Category</th>
              <th>Students</th>
              <th>Rating</th>
              <th>Revenue</th>
              <th>Report Count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.instructor}</td>
                <td>{course.category}</td>
                <td>{course.students}</td>
                <td>
                  <div className="courseTableRating">
                    <FaStar className="courseTableRatingIcon" />
                    <span className="courseTableRatingValue">
                      {course.rating}
                    </span>
                  </div>
                </td>
                <td>{course.revenue}</td>
                <td>
                  <span className={course.reportCount >= 3 ? "courseReportCount courseReportCount--locked" : "courseReportCount"}>
                    {course.reportCount} / 3
                  </span>
                </td>
                <td>{course.status}</td>
                <td>
                  <div className="courseTableActions">
                    <button className="actionButton" aria-label="View Course">
                      <Eye className="actionIcon" />
                    </button>
                    <button className="actionButton" aria-label="Edit Course">
                      <Edit3 className="actionIcon" />
                    </button>
                    <button className="actionButton" aria-label="Delete Course">
                      <Trash2 className="actionIcon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      <div className="courseTablePagination">
        <button
          type="button"
          className="paginationButton"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            type="button"
            className={`paginationButton ${currentPage === i + 1 ? "paginationButton--active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          type="button"
          className="paginationButton"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default CourseTable;
