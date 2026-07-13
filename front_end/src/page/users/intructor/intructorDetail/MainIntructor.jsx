import React from "react";

import { FaUserGraduate } from "react-icons/fa";
import {
    FaStar,
    FaRegHeart,
    FaEye
} from "react-icons/fa";
import { FiClock } from "react-icons/fi";

const formatDuration = (totalSeconds) => {
    const hours = Math.round((totalSeconds || 0) / 3600);
    return hours > 0 ? `${hours} hours` : "New";
};

function MainIntructor({ activeTab, description, expertise, courses = [] }) {
    const expertiseTags = expertise
        ? expertise.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

    return (

        <div className="content-left">
            {/* Introduction Section */}
            {(activeTab === "overview" || activeTab === "about") && (
            <section className="section">
                <h2 className="section-title">Introduce</h2>
                <p className="section-text">
                    {description || "This instructor hasn't added an introduction yet."}
                </p>
                {expertiseTags.length > 0 && (
                    <div className="profile-links">
                        {expertiseTags.map((tag) => (
                            <span key={tag} className="tag-link">{tag}</span>
                        ))}
                    </div>
                )}

            </section>)}

            {/* Courses Section */}

            {(activeTab === "overview" || activeTab === "courses") && (
                <section className="section">

                    <div className="section-header-course">

                        <h2 className="section-title">
                            Instructor's Courses
                        </h2>



                    </div>

                    {courses.length === 0 ? (
                        <p className="section-text">No published courses yet.</p>
                    ) : (
                    <div className="courses-grid-new">

                        {(activeTab === "overview"
                                ? courses.slice(0, 4)
                                : courses
                        ).map(course => (

                            <div
                                key={course.courseId}
                                className="course-card-new"
                            >

                                <div className="course-image-box">

                                    <img
                                        src={course.thumbnailUrl || "https://api.dicebear.com/7.x/shapes/svg?seed=" + course.courseId}
                                        alt={course.title}
                                        className="course-image-new"
                                    />



                                    <button className="wishlist-btn">
                                        <FaRegHeart />
                                    </button>



                                </div>

                                <div className="course-content-new">

                                    <h3 className="course-title-new">
                                        {course.title}
                                    </h3>

                                    <div className="course-meta-new">

                                        <div className="meta-item">
                                            <FaStar />
                                            <span>
                                {course.avgRating ? course.avgRating.toFixed(1) : "New"}
                            </span>
                                        </div>

                                        <div className="meta-divider"></div>

                                        <div className="meta-item">
                            <span className="student-count">
                                <FaUserGraduate />
                                                            {course.studentCount}
                            </span>
                                        </div>

                                        <div className="meta-divider"></div>

                                        <div className="meta-item">
                                            <FiClock />
                                            <span>
                                                {formatDuration(course.totalDurationSeconds)}
                                            </span>
                                        </div>

                                    </div>

                                    <div className="course-footer-new">

                                        <div className="price-new">
                                            {course.basePrice != null
                                                ? Number(course.basePrice).toLocaleString("vi-VN") + "đ"
                                                : ""}
                                        </div>

                                        <div className="course-actions-new">

                                            <button className="buy-btn-new">
                                                Buy Now
                                            </button>



                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                    )}

                </section>
            )}

            {/* Reviews Section */}
            {(activeTab === "reviews") && (
                <section className="review-section-new">

                    {/* Header Review */}
                    <div className="review-overview-card">

                        <div className="review-overview-left">
                            <h2>Student Reviews</h2>

                            <p>
                                Aggregate rating across all of this instructor's published courses.
                            </p>

                            <div className="overall-rating">
                                <div className="overall-stars">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                <span className="overall-score">
                                    {courses.length > 0
                                        ? (courses.reduce((sum, c) => sum + (c.avgRating || 0), 0) / courses.length).toFixed(1)
                                        : "0.0"}
                                </span>

                                <span className="overall-count">
                                    ({courses.reduce((sum, c) => sum + (c.ratingCount || 0), 0)} reviews)
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Content */}
                    <div className="review-content-wrapper">
                        <p className="section-text">
                            Per-review comments aren't shown on the public instructor page yet — check individual course pages for detailed reviews.
                        </p>
                    </div>

                </section>)}
        </div>
    );
}
    export default MainIntructor;