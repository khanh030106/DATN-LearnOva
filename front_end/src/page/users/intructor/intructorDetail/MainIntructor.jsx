import {courses, introDetails, reviews} from "./intructorData.js";
// import {FaStar} from "react-icons/fa";
import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import {
    FaStar,
    FaRegHeart,
    FaEye
} from "react-icons/fa";
import { FiClock } from "react-icons/fi";
function MainIntructor({ activeTab }) {
    return (

        <div className="content-left">
            {/* Introduction Section */}
            {(activeTab === "overview" || activeTab === "about") && (
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

            </section>)}

            {/* Courses Section */}

            {(activeTab === "overview" || activeTab === "courses") && (
                <section className="section">

                    <div className="section-header-course">

                        <h2 className="section-title">
                            Instructor's Courses
                        </h2>

                        <a href="#" className="view-more">
                            View All
                        </a>

                    </div>

                    <div className="courses-grid-new">

                        {courses.map(course => (

                            <div
                                key={course.id}
                                className="course-card-new"
                            >

                                <div className="course-image-box">

                                    <img
                                        src={course.image}
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
                                {course.rating}
                            </span>
                                        </div>

                                        <div className="meta-divider"></div>

                                        <div className="meta-item">
                            <span>
                                {course.student}
                            </span>
                                        </div>

                                        <div className="meta-divider"></div>

                                        <div className="meta-item">
                                            <FiClock />
                                            <span>
                                42 Hours
                            </span>
                                        </div>

                                    </div>

                                    <div className="course-footer-new">

                                        <div className="price-new">
                                            {course.price}
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

                </section>
            )}

            {/* Reviews Section */}
            {/* Reviews Section */}
            {(activeTab === "overview" || activeTab === "reviews") && (
                <section className="review-section-new">

                    {/* Header Review */}
                    <div className="review-overview-card">

                        <div className="review-overview-left">
                            <h2>Student Reviews</h2>

                            <p>
                                Genuine feedback from students who have successfully
                                completed Tùng's courses.
                            </p>

                            <div className="overall-rating">
                                <div className="overall-stars">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                <span className="overall-score">
                                    4.7
                                </span>

                                <span className="overall-count">
                                    (3 verified reviews)
                                </span>
                            </div>
                        </div>

                        <div className="review-overview-right">

                            {[
                                { star: 5, count: 2, width: 80 },
                                { star: 4, count: 1, width: 40 },
                                { star: 3, count: 0, width: 0 },
                                { star: 2, count: 0, width: 0 },
                                { star: 1, count: 0, width: 0 }
                            ].map((item) => (
                                <div className="rating-row" key={item.star}>

                                    <span>{item.star}</span>

                                    <FaStar className="mini-star-review" />

                                    <div className="rating-progress">

                                        <div
                                            className="rating-progress-fill"
                                            style={{
                                                width: `${item.width}%`
                                            }}
                                        />
                                    </div>

                                    <span>{item.count}</span>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Content */}
                    <div className="review-content-wrapper">

                        {/* Left */}
                        <div className="review-list-new">

                            {reviews.map((review) => (

                                <div
                                    key={review.id}
                                    className="review-card-new"
                                >

                                    <div className="review-card-header">

                                        <div className="review-user">

                                            <img
                                                src={review.avatar}
                                                alt={review.name}
                                                className="review-avatar-new"
                                            />

                                            <div>

                                                <h4>{review.name}</h4>

                                                <span>
                                    Frontend Developer
                                </span>

                                            </div>

                                        </div>

                                        <div className="review-time-new">
                                            2 weeks ago
                                        </div>

                                    </div>

                                    <div className="review-stars-new">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <FaStar
                                                key={i}
                                                color="#fbbf24"
                                            />
                                        ))}
                                    </div>

                                    <p className="review-text-new">
                                        {review.text}
                                    </p>

                                </div>

                            ))}

                        </div>

                        {/* Right */}
                        <div className="review-form-card">

                            <h3 className="feedback-title">
                                <FaRegCommentDots className="feedback-icon" />
                                Leave Your Feedback
                            </h3>

                            <div className="form-group-review">

                                <label>Star Rating:</label>

                                <div className="review-form-stars">

                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className="active-star"
                                        />
                                    ))}

                                    <span>(5/5 Stars)</span>

                                </div>

                            </div>

                            <div className="form-group-review">

                                <label>Your Full Name</label>

                                <input
                                    type="text"
                                    placeholder="e.g. John Smith"
                                />

                            </div>

                            <div className="form-group-review">

                                <label>Your Review</label>

                                <textarea
                                    rows="5"
                                    placeholder="Share your learning experience with this instructor..."
                                />

                            </div>

                            <button className="send-review-btn">
                                Submit Review
                            </button>
                            </div>

                    </div>

                </section>)}
        </div>
    );
}
    export default MainIntructor;