import React from "react";
import "./CourseCard.css";

function CourseCard({ course }) {
    return (
        <div className="course-card">
            <div className="course-card-img">
                <img src={course.image} alt={course.title} />
                {course.tag && <span className="course-tag">{course.tag}</span>}
            </div>
            <div className="course-card-body">
                <div className="course-category">{course.category}</div>
                <h3 className="course-title">{course.title}</h3>
                <div className="course-author">{course.author}</div>
                <div className="course-rating">
                    <span>⭐ {course.rating}</span>
                    <span>({course.reviews})</span>
                </div>
                <div className="course-card-bottom">
                    <span className="course-price">{course.price.toLocaleString()}đ</span>
                    <button className="add-to-cart" title="Thêm vào giỏ hàng">🛒</button>
                </div>
            </div>
        </div>
    );
} export default CourseCard;