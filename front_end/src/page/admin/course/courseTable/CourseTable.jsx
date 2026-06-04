import { useState } from "react";
import { Eye, Edit3, Trash2, Star } from "lucide-react";
import "./CourseTable.css";

const courseTableData = [
  {
    id: "course-10",
    title: "Học máy cơ bản cho nhà phân tích dữ liệu (Data Analysts)",
    instructor: "Vũ Hải Đăng",
    category: "Trí tuệ nhân tạo (AI)",
    students: 180,
    rating: 4.7,
    revenue: "0 đ",
    publishDate: "01/06/2026",
    status: "Đang mở",
  },
  {
    id: "KH002",
    title: "Thiết kế UI/UX Cơ bản",
    instructor: "Trần Thị B",
    category: "Thiết kế",
    students: 180,
    rating: 4.7,
    revenue: "0 đ",
    publishDate: "22/04/2026",
    status: "Đang mở",
  },
  {
    id: "KH003",
    title: "Marketing kỹ thuật số",
    instructor: "Lê Văn C",
    category: "Marketing",
    students: 95,
    rating: 4.5,
    revenue: "68.000.000 đ",
    publishDate: "05/03/2026",
    status: "Tạm khóa",
  },
  {
    id: "KH004",
    title: "Quản lý dự án Agile",
    instructor: "Ngọc Lan",
    category: "Kinh doanh",
    students: 132,
    rating: 4.6,
    revenue: "89.000.000 đ",
    publishDate: "16/02/2026",
    status: "Đang mở",
  },
  {
    id: "KH005",
    title: "SEO & Content Marketing",
    instructor: "Hoàng Phương",
    category: "Marketing",
    students: 110,
    rating: 4.4,
    revenue: "0 đ",
    publishDate: "28/01/2026",
    status: "Đang mở",
  },
  {
    id: "KH006",
    title: "React Frontend nâng cao",
    instructor: "Quách Duy Đức",
    category: "Lập trình",
    students: 205,
    rating: 4.9,
    revenue: "135.000.000 đ",
    publishDate: "12/01/2026",
    status: "Đang mở",
  },
  {
    id: "KH007",
    title: "Figma và thiết kế sản phẩm",
    instructor: "Bùi Thị Thảo",
    category: "Thiết kế",
    students: 88,
    rating: 4.6,
    revenue: "72.000.000 đ",
    publishDate: "04/12/2025",
    status: "Đang mở",
  },
  {
    id: "KH008",
    title: "Phân tích dữ liệu với SQL",
    instructor: "Lê Ngọc Nam",
    category: "Kinh doanh",
    students: 127,
    rating: 4.7,
    revenue: "81.000.000 đ",
    publishDate: "14/11/2025",
    status: "Tạm khóa",
  },
  {
    id: "KH009",
    title: "Kỹ năng thuyết trình chuyên nghiệp",
    instructor: "Bùi Thị Thảo",
    category: "Kinh doanh",
    students: 72,
    rating: 4.5,
    revenue: "0 đ",
    publishDate: "08/10/2025",
    status: "Đang mở",
  },
  {
    id: "KH010",
    title: "Học phát triển sản phẩm số",
    instructor: "Phạm Hoài An",
    category: "Kinh doanh",
    students: 158,
    rating: 4.8,
    revenue: "107.000.000 đ",
    publishDate: "25/09/2025",
    status: "Đang mở",
  },
  {
    id: "KH011",
    title: "Phát triển ứng dụng di động",
    instructor: "Nguyễn Lê",
    category: "Lập trình",
    students: 134,
    rating: 4.6,
    revenue: "98.000.000 đ",
    publishDate: "28/08/2025",
    status: "Đang mở",
  },
  {
    id: "KH012",
    title: "Chiến lược truyền thông mạng xã hội",
    instructor: "Trần Thị Minh Thư",
    category: "Marketing",
    students: 98,
    rating: 4.4,
    revenue: "0 đ",
    publishDate: "13/07/2025",
    status: "Đã khóa",
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
    <section className="courseTableSection" aria-label="Bảng quản lý khóa học">
      <div className="courseTableCard">
        <table className="courseTable" aria-label="Danh sách khóa học">
          <thead>
            <tr>
              <th>Khóa học</th>
              <th>Giảng viên</th>
              <th>Danh mục</th>
              <th>Học viên</th>
              <th>Đánh giá</th>
              <th>Doanh thu</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
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
                    <Star className="courseTableRatingIcon" />
                    <span className="courseTableRatingValue">
                      {course.rating}
                    </span>
                  </div>
                </td>
                <td>{course.revenue}</td>
                <td>{course.status}</td>
                <td>
                  <div className="courseTableActions">
                    <button className="actionButton" aria-label="Xem khóa học">
                      <Eye className="actionIcon" />
                    </button>
                    <button
                      className="actionButton"
                      aria-label="Chỉnh sửa khóa học"
                    >
                      <Edit3 className="actionIcon" />
                    </button>
                    <button className="actionButton" aria-label="Xóa khóa học">
                      <Trash2 className="actionIcon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="courseTablePagination">
          <button
            type="button"
            className="paginationButton"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Trước
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
            Sau
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseTable;
