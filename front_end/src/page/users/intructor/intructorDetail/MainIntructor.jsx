import {courses, introDetails, reviews} from "./intructorData.js";
import {FaStar} from "react-icons/fa";
import React from "react";
function MainIntructor() {
    return (

        <div className="content-left">
            {/* Introduction Section */}
            <section className="section">
                <h2 className="section-title">Introduce</h2>
                <p className="section-text">{introDetails}</p>
                <div className="profile-links">
                    <a href="#react" className="tag-link">React</a>
                    <a href="#javascript" className="tag-link">JavaScript</a>
                    <a href="#html5" className="tag-link">HTML 5</a>
                    <a href="#node" className="tag-link">Node.js</a>
                    <a href="#css" className="tag-link">Tailwind CSS</a>
                </div>

            </section>

            {/* Courses Section */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">Instructor's courses</h2>
                    <a href="#" className="view-more">See all</a>
                </div>
                <div className="courses-grid">
                    {courses.map(course => (
                        <div key={course.id} className="course-card-in">
                            <div className="course-image-wrapper">
                                <img src={course.image} alt={course.title} className="course-image"/>
                            </div>
                            <div className="course-info">
                                <h3 className="course-title">{course.title}</h3>
                                <div className="course-rating">
                                    <div className="rating-info">
                                        <FaStar className="rating-star"/>
                                        <span className="rating-score">
                                                {course.rating.toFixed(1)}
                                            </span>

                                    </div>
                                    <span className="rating-number-in">({course.reviews})</span>
                                    <span className="student-number-in">{course.student} học viên</span>
                                </div>
                                <div className="course-price-in">
                                    <span className="price-in">{course.price}</span>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reviews Section */}
            {/* Reviews Section */}
            <section className="section">
                <h2 className="section-title-ina">Student reviews</h2>

                <div className="reviews-wrapper-ina">
                    {/* Rating Summary */}
                    <div className="rating-summary-ina">
                        <div className="rating-left-ina">
                            <div className="rating-score-ina">4.8</div>
                            <div className="rating-stars-ina">
                                {Array.from({length: 5}).map((_, i) => (
                                    <FaStar key={i} size={16} color="#ffc107"/>
                                ))}
                            </div>
                            <div className="rating-label-ina">Great</div>
                            <div className="rating-count-ina">1.245 Review</div>
                        </div>

                        {/* Rating Bars */}
                        <div className="rating-bars-ina">
                            {[
                                {stars: 5, percent: 80},
                                {stars: 4, percent: 15},
                                {stars: 3, percent: 3},
                                {stars: 2, percent: 1},
                                {stars: 1, percent: 1}
                            ].map(item => (
                                <div className="rating-bar-item-ina">
                                            <span className="bar-stars-ina">
                                                {item.stars}
                                                <FaStar className="mini-star"/>
                                            </span>

                                    <div className="bar-container-ina">
                                        <div
                                            className="bar-fill-ina"
                                            style={{width: `${item.percent}%`}}
                                        />
                                    </div>

                                    <span className="bar-percent-ina">
                                            {item.percent}%
                                        </span>
                                </div>
                            ))}
                        </div>

                        {/* Satisfaction Box */}
                        <div className="satisfaction-box-ina">
                            <div className="satisfaction-title-ina">Satisfied Students</div>
                            <div className="satisfaction-percent-ina">95%</div>
                            <div className="satisfaction-text-ina">of students are satisfied with this course
                            </div>

                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="reviews-list-container">
                        <div className="reviews-filter">

                            <span className="reviews-pagination-info">Showing 1–3 of 1,245 reviews</span>
                        </div>

                        <div className="reviews-list">
                            {reviews.map(review => (
                                <div key={review.id} className="review-card-ina">
                                    <div className="review-header">
                                        <div className="review-user-info-ina">
                                            <img src={review.avatar} alt={review.name}
                                                 className="review-avatar"/>
                                            <div className="user-details">
                                                <h4 className="review-name">{review.name}</h4>
                                                <span className="review-time">2 ngày trước</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="review-rating">
                                        {Array.from({length: 5}).map((_, i) => (
                                            <FaStar
                                                key={i}
                                                size={14}
                                                color={i < review.rating ? '#ffc107' : '#e5e7eb'}
                                            />
                                        ))}
                                    </div>

                                    <p className="review-text">{review.text}</p>


                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="reviews-pagination">
                            <button className="page-btn prev">‹</button>
                            {[1, 2, 3, '...', 15].map((page, idx) => (
                                <button
                                    key={idx}
                                    className={`page-btn ${page === 1 ? 'active' : ''}`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="page-btn next">›</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
    export default MainIntructor;