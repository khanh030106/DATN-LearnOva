import React from "react";
import { MdStar } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import {reviewsData} from "./mockCourseData.js";

function ReviewsTab({

                        reviewsData,
                        reviewQuery,
                        handleSearchReviews,
                        ratingFilter,
                        handleRatingFilter,

                        currentReviewPage,
                        setCurrentReviewPage,
                        reviewsPerPage,
                        helpfulMap,
                        toggleHelpful
                    }) {
    const filtered = reviewsData.filter(r => {
        if (ratingFilter !== "all" && Number(ratingFilter) !== r.rating) return false;
        if (!reviewQuery) return true;
        const q = reviewQuery.toLowerCase();
        return r.text.toLowerCase().includes(q) || r.name.toLowerCase().includes(q);
    });

    const start = (currentReviewPage - 1) * reviewsPerPage;
    const pageItems = filtered.slice(start, start + reviewsPerPage);

    return (
        <div className="reviews-section">
            <div className="rating-summary">
                <div className="rating-left">
                    <div className="rating-number">5.0</div>
                    <div className="rating-stars">
                        {Array.from({length:5}).map((_,i)=> <MdStar key={i} className="star" />)}
                    </div>
                    <div className="rating-label">Course Rating</div>
                </div>

                <div className="rating-right">
                    {/* simple breakdown or bars */}
                    <div className="rating-bars">
                        {[5,4,3,2,1].map(star => (
                            <div key={star} className="rating-row">
                                <span className="row-label">{star}★</span>
                                <div className="row-bar"><div className="row-fill" style={{width: star===5 ? '100%':'6%'}}></div></div>
                                <span className="row-percent">{star===5 ? '100%' : '0%'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <h3 className="reviews-title">Reviews</h3>

            <div className="review-controls">
                <div className="review-search">
                    <input
                        type="text"
                        placeholder="Search reviews"
                        value={reviewQuery}
                        onChange={handleSearchReviews}
                    />
                    <button className="search-btn">
                        <FiSearch />
                    </button>
                </div>

                <div className="review-filter">
                    <label>Filter ratings</label>
                    <select value={ratingFilter} onChange={handleRatingFilter}>
                        <option value="all">All ratings</option>
                        <option value={5}>5 stars</option>
                        <option value={4}>4 stars</option>
                        <option value={3}>3 stars</option>
                    </select>
                </div>
            </div>

            <div className="reviews-list">
                {(() => {
                    const filtered = reviewsData.filter(r => {
                        if (ratingFilter !== 'all' && Number(ratingFilter) !== r.rating) return false;
                        if (!reviewQuery) return true;
                        const q = reviewQuery.toLowerCase();
                        return r.text.toLowerCase().includes(q) || r.name.toLowerCase().includes(q);
                    });
                    const start = (currentReviewPage - 1) * reviewsPerPage;
                    const pageItems = filtered.slice(start, start + reviewsPerPage);
                    return pageItems.map(r => (
                        <div key={r.id} className="review-item">
                            <div className="review-avatar">{r.initials}</div>
                            <div className="review-body">
                                <div className="review-head">
                                    <div className="review-name">{r.name}</div>
                                    <div className="review-meta">
                                        <span className="review-stars">{Array.from({length:r.rating}).map((_,i)=>(<MdStar key={i} className="star small"/>))}</span>
                                        <span className="review-time">{r.time}</span>
                                    </div>
                                </div>
                                <div className="review-text">{r.text}</div>
                                <div className="review-actions">
                                    <button
                                        className="helpful-btn"
                                        onClick={() => toggleHelpful(r.id)}
                                    >
                                        <FaThumbsUp />
                                        <span>{helpfulMap[r.id] || r.helpful}</span>
                                    </button>

                                    <button className="unhelpful-btn">
                                        <FaThumbsDown />
                                    </button>

                                </div>
                            </div>
                        </div>
                    ));
                })()}
            </div>

            <div className="reviews-pagination">
                <button onClick={() => setCurrentReviewPage(p => Math.max(1, p -1))}>‹</button>
                <span>Page {currentReviewPage}</span>
                <button onClick={() => setCurrentReviewPage(p => p + 1)}>›</button>
            </div>
        </div>
    );
}

export default ReviewsTab;