import { useState } from "react";
import "./ReportFilter.css";

const ReportFilter = () => {
  const [filters, setFilters] = useState({
    startDate: "01/05/2026",
    endDate: "04/06/2026",
    reportType: "Tất cả báo cáo",
    category: "Tất cả Danh mục",
    instructor: "Tất cả Giảng viên",
    course: "Tất cả Khóa học",
    userRole: "Tất cả Vai trò",
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="reportFilterSection">
      <div className="reportFilterContainer">
        <div className="reportFilterTitle">
          <h3>BỘ LỌC BÁO CÁO PHÂN TÍCH NÂNG CAO</h3>
          <p>
            Thiết lập phạm vi phân tích để tạo mẫu hoặc tải xuống biểu độ tương
            quan dưới đây.
          </p>
        </div>

        <div className="reportFilterGrid">
          {/* Start Date */}
          <div className="filterField">
            <label>Ngày bắt đầu</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate.split("/").reverse().join("-")}
              onChange={handleDateChange}
              className="filterInput filterDateInput"
            />
          </div>

          {/* End Date */}
          <div className="filterField">
            <label>Ngày kết thúc</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate.split("/").reverse().join("-")}
              onChange={handleDateChange}
              className="filterInput filterDateInput"
            />
          </div>

          {/* Report Type */}
          <div className="filterField">
            <label>Loại Báo Cáo</label>
            <select
              name="reportType"
              value={filters.reportType}
              onChange={handleSelectChange}
              className="filterInput filterSelect"
            >
              <option>Tất cả báo cáo</option>
              <option>Báo cáo doanh thu</option>
              <option>Báo cáo người dùng</option>
              <option>Báo cáo khóa học</option>
              <option>Báo cáo giảng viên</option>
            </select>
          </div>

          {/* Category */}
          <div className="filterField">
            <label>Danh mục chuyên ngành</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleSelectChange}
              className="filterInput filterSelect"
            >
              <option>Tất cả Danh mục</option>
              <option>Công nghệ</option>
              <option>Kinh doanh</option>
              <option>Thiết kế</option>
              <option>Ngôn ngữ</option>
            </select>
          </div>

          {/* Instructor */}
          <div className="filterField">
            <label>Giảng viên đóng góp</label>
            <select
              name="instructor"
              value={filters.instructor}
              onChange={handleSelectChange}
              className="filterInput filterSelect"
            >
              <option>Tất cả Giảng viên</option>
              <option>Giảng viên A</option>
              <option>Giảng viên B</option>
              <option>Giảng viên C</option>
            </select>
          </div>

          {/* Course */}
          <div className="filterField">
            <label>Khóa học cụ thể</label>
            <select
              name="course"
              value={filters.course}
              onChange={handleSelectChange}
              className="filterInput filterSelect"
            >
              <option>Tất cả Khóa học</option>
              <option>Khóa học 1</option>
              <option>Khóa học 2</option>
              <option>Khóa học 3</option>
            </select>
          </div>

          {/* User Role */}
          <div className="filterField">
            <label>Vai trò người thực hiện</label>
            <select
              name="userRole"
              value={filters.userRole}
              onChange={handleSelectChange}
              className="filterInput filterSelect"
            >
              <option>Tất cả Vai trò</option>
              <option>Quản trị viên</option>
              <option>Giảng viên</option>
              <option>Học viên</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportFilter;
