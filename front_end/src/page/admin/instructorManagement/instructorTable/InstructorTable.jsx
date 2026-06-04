import { useState } from "react";
import { Eye, Edit3, Trash2, Star } from "lucide-react";
import "./InstructorTable.css";

const instructorsData = [
  {
    id: "GV001",
    initials: "VH",
    name: "Nguyễn Văn Hùng",
    email: "hung.nguyen@academy.edu.vn",
    specialization: "Lập trình Web & Cloud",
    classes: 3,
    students: "1.250",
    rating: 4.8,
    ratingText: "Tốt",
    revenue: "145.000.000 đ",
    payment: "Thanh toán đủ",
    status: "Hoạt động",
  },
  {
    id: "GV002",
    initials: "MT",
    name: "Trần Thị Minh Thư",
    email: "thu.tran@academy.edu.vn",
    specialization: "Thiết kế UI/UX & Figma",
    classes: 3,
    students: "940",
    rating: 4.9,
    ratingText: "Tốt",
    revenue: "98.000.000 đ",
    payment: "Thanh toán đủ",
    status: "Hoạt động",
  },
  {
    id: "GV003",
    initials: "LN",
    name: "Lê Ngọc Nam",
    email: "nam.le@academy.edu.vn",
    specialization: "Quản trị dữ liệu & SQL",
    classes: 2,
    students: "765",
    rating: 4.7,
    ratingText: "Khá",
    revenue: "82.500.000 đ",
    payment: "Còn nợ",
    status: "Tạm ngưng",
  },
  {
    id: "GV004",
    initials: "PH",
    name: "Phạm Hoài An",
    email: "an.pham@academy.edu.vn",
    specialization: "Marketing kỹ thuật số",
    classes: 4,
    students: "1.120",
    rating: 4.6,
    ratingText: "Tốt",
    revenue: "112.000.000 đ",
    payment: "Thanh toán đủ",
    status: "Hoạt động",
  },
  {
    id: "GV005",
    initials: "TT",
    name: "Trần Thị Thuỳ",
    email: "thuy.tran@academy.edu.vn",
    specialization: "Thiết kế nội thất",
    classes: 2,
    students: "630",
    rating: 4.5,
    ratingText: "Khá",
    revenue: "67.900.000 đ",
    payment: "Thanh toán đủ",
    status: "Hoạt động",
  },
  {
    id: "GV006",
    initials: "QD",
    name: "Quách Duy Đức",
    email: "duc.quach@academy.edu.vn",
    specialization: "React & Frontend",
    classes: 5,
    students: "1.420",
    rating: 4.9,
    ratingText: "Tuyệt vời",
    revenue: "162.500.000 đ",
    payment: "Thanh toán đủ",
    status: "Hoạt động",
  },
  {
    id: "GV007",
    initials: "NL",
    name: "Ngọc Lan",
    email: "lan.ngoc@academy.edu.vn",
    specialization: "Quản lý dự án Agile",
    classes: 3,
    students: "790",
    rating: 4.4,
    ratingText: "Khá",
    revenue: "89.400.000 đ",
    payment: "Thanh toán đủ",
    status: "Tạm ngưng",
  },
  {
    id: "GV008",
    initials: "BT",
    name: "Bùi Thị Thảo",
    email: "thao.bui@academy.edu.vn",
    specialization: "Kỹ năng thuyết trình",
    classes: 2,
    students: "520",
    rating: 4.7,
    ratingText: "Tốt",
    revenue: "56.800.000 đ",
    payment: "Thanh toán đủ",
    status: "Hoạt động",
  },
  {
    id: "GV009",
    initials: "HN",
    name: "Hà Nguyễn",
    email: "nguyen.ha@academy.edu.vn",
    specialization: "Phân tích dữ liệu",
    classes: 4,
    students: "1.010",
    rating: 4.8,
    ratingText: "Tốt",
    revenue: "130.000.000 đ",
    payment: "Thanh toán đủ",
    status: "Hoạt động",
  },
  {
    id: "GV010",
    initials: "DV",
    name: "Đặng Văn Dũng",
    email: "dung.dang@academy.edu.vn",
    specialization: "Kinh doanh trực tuyến",
    classes: 3,
    students: "880",
    rating: 4.6,
    ratingText: "Tốt",
    revenue: "95.300.000 đ",
    payment: "Còn nợ",
    status: "Hoạt động",
  },
  {
    id: "GV011",
    initials: "HP",
    name: "Hoàng Phương",
    email: "phuong.hoang@academy.edu.vn",
    specialization: "Tiếp thị nội dung",
    classes: 2,
    students: "610",
    rating: 4.3,
    ratingText: "Khá",
    revenue: "58.200.000 đ",
    payment: "Thanh toán đủ",
    status: "Khóa",
  },
  {
    id: "GV012",
    initials: "NL",
    name: "Nguyễn Lê",
    email: "le.nguyen@academy.edu.vn",
    specialization: "SEO & Content",
    classes: 3,
    students: "700",
    rating: 4.5,
    ratingText: "Khá",
    revenue: "79.500.000 đ",
    payment: "Thanh toán đủ",
    status: "Hoạt động",
  },
];

const InstructorTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(instructorsData.length / pageSize);
  const currentItems = instructorsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section
      className="instructorTableSection"
      aria-label="Bảng quản lý giảng viên"
    >
      <div className="instructorTableCard">
        <table className="instructorTable" aria-label="Danh sách giảng viên">
          <thead>
            <tr>
              <th>Mã GV</th>
              <th>Giảng viên / Lĩnh vực</th>
              <th>Số lớp</th>
              <th>Học viên</th>
              <th>Đánh giá</th>
              <th>Doanh thu</th>
              <th>Trạng thái</th>
              <th>Thao tác quản trị</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((instructor) => (
              <tr key={instructor.id}>
                <td>
                  <span className="instructorTableBadge">{instructor.id}</span>
                </td>
                <td>
                  <div className="instructorTableProfile">
                    <div className="instructorTableProfileText">
                      <p className="instructorTableName">{instructor.name}</p>
                      <p className="instructorTableEmail">{instructor.email}</p>
                      <span className="instructorTableTag">
                        {instructor.specialization}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="instructorTableStat">
                    <strong>{instructor.classes}</strong>
                    <span>Lớp học</span>
                  </div>
                </td>
                <td>
                  <div className="instructorTableStat">
                    <strong>{instructor.students}</strong>
                    <span>người học</span>
                  </div>
                </td>
                <td>
                  <div className="instructorTableRate">
                    <Star size={16} className="instructorTableStar" />
                    <strong>{instructor.rating}</strong>
                    <span>{instructor.ratingText}</span>
                  </div>
                </td>
                <td>
                  <div className="instructorTableRevenue">
                    <strong>{instructor.revenue}</strong>
                    <span>{instructor.payment}</span>
                  </div>
                </td>
                <td>
                  <span
                    className={`instructorTableStatus instructorTableStatus--${
                      instructor.status === "Hoạt động"
                        ? "active"
                        : instructor.status === "Tạm ngưng"
                          ? "paused"
                          : "locked"
                    }`}
                  >
                    {instructor.status}
                  </span>
                </td>
                <td>
                  <div className="instructorTableActions">
                    <button
                      type="button"
                      className="instructorActionButton"
                      aria-label="Xem"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className="instructorActionButton"
                      aria-label="Sửa"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      type="button"
                      className="instructorActionButton instructorActionButton--danger"
                      aria-label="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="instructorTablePagination">
          <button
            type="button"
            className="instructorPaginationButton"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              type="button"
              className={`instructorPaginationButton ${
                currentPage === index + 1
                  ? "instructorPaginationButton--active"
                  : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            type="button"
            className="instructorPaginationButton"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstructorTable;
