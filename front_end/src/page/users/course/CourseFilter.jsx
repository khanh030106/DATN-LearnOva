import React from "react";
import "./CourseFilter.css";

export default function CourseFilter() {
    return (
        <aside className="course-filter">
            <h4>Bộ lọc</h4>
            <div className="filter-group">
                <b>Danh mục</b>
                <div><input type="checkbox" /> Công nghệ</div>
                <div><input type="checkbox" /> Kinh doanh</div>
                <div><input type="checkbox" /> Thiết kế</div>
                <div><input type="checkbox" /> Marketing</div>
                <div><input type="checkbox" /> Ngoại ngữ</div>
                <div><input type="checkbox" /> Kỹ năng mềm</div>
                <a href="#">Xem thêm</a>
            </div>
            <div className="filter-group">
                <b>Trình độ</b>
                <div><input type="checkbox" /> Cơ bản</div>
                <div><input type="checkbox" /> Trung bình</div>
                <div><input type="checkbox" /> Nâng cao</div>
            </div>
            <div className="filter-group">
                <b>Khoảng giá</b>
                <input type="range" min="0" max="3000000" />
                <div>0đ - 3.000.000đ</div>
            </div>
            <div className="filter-group">
                <b>Đánh giá</b>
                <div><input type="checkbox" /> 5 sao</div>
                <div><input type="checkbox" /> 4 sao trở lên</div>
            </div>
        </aside>
    );
}