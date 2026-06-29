import React, { useState } from "react";
import { MdStar } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import {
    createReviewApi,
    updateReviewApi,
    deleteReviewApi
} from "../../../../api/ReviewApi.js";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";

function ReviewsTab({
                        reviewsData,
                        setReviewsData,
                        currentUserId,
                        ratingSummary,
                        reviewQuery,
                        handleDeleteReview,
                        handleSearchReviews,
                        ratingFilter,
                        handleRatingFilter,
                        currentReviewPage,
                        setCurrentReviewPage,
                        reviewsPerPage,
                        isCourseCompleted,
                        hasReviewed,
                        openReviewModal
                    }) {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    // Toggle đóng mở menu 3 chấm
    const toggleMenu = (id) => {
        setOpenMenuId(prev => (prev === id ? null : id));
    };
    const filteredReviews = (reviewsData || []).filter((r) => {
        const matchRating =
            ratingFilter === "all" ||
            Number(ratingFilter) === r.rating;
        const q = reviewQuery.toLowerCase().trim();
        const commentText = r.comment || r.text || "";
        const accountName = r.userName || r.name || "";
        const matchSearch =
            !q ||
            commentText.toLowerCase().includes(q) ||
            accountName.toLowerCase().includes(q);

        return matchRating && matchSearch;
    });
    const startIndex = (currentReviewPage - 1) * reviewsPerPage;

    const pageItems = filteredReviews.slice(
        startIndex,
        startIndex + reviewsPerPage
    );
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    const hasNoReviews =
        !reviewsData || reviewsData.length === 0;
    const isNoResult =
        !hasNoReviews &&
        filteredReviews.length === 0;

    return (
        <div className="reviews-section">
            <div className="rating-summary">
                {/* LEFT */}
                <div className="rating-left">
                    <div className="rating-number">
                        {ratingSummary?.averageRating?.toFixed(1) || "0.0"}
                    </div>

                    <div className="rating-stars">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const avg = ratingSummary?.averageRating || 0;

                            return (
                                <MdStar
                                    key={i}
                                    style={{
                                        color: i < Math.round(avg) ? "#f59e0b" : "#ddd"
                                    }}
                                />
                            );
                        })}
                    </div>

                    <div className="rating-label">
                        Course Rating ({ratingSummary?.totalReviews || 0} reviews)
                    </div>
                </div>

                {/* RIGHT */}
                <div className="rating-right">
                    <div className="rating-bars">
                        {[5, 4, 3, 2, 1].map(star => {
                            const count = reviewsData.filter(r => r.rating === star).length;
                            const total = reviewsData.length || 1;
                            const percent = (count / total) * 100;

                            return (
                                <div key={star} className="rating-row">
                                    <span className="row-label">{star}★</span>

                                    <div className="row-bar">
                                        <div
                                            className="row-fill"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>

                                    <span className="row-percent">
                            {Math.round(percent)}%
                        </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* REVIEW FORM ACTION */}


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

            {isNoResult ? (
                <div className="no-search-result">
                    <FaRegCommentDots size={40} color="#999" />
                    <h3>No reviews found</h3>
                    <p>Your search did not match any reviews.</p>
                </div>
            ) : (
                <div className="reviews-list">
                    {pageItems.map(r => {
                    const reviewOwnerId =
                        r.userId ||
                        r.idUser ||
                        r.id ||
                        (r.user && r.user.id);
                    const isOwner =
                        currentUserId &&
                        reviewOwnerId &&
                        String(currentUserId) === String(reviewOwnerId);



                    const displayComment = r.comment || r.text || "";
                    const displayName = r.userName || r.name || "Anonymous";
                    const displayInitials = r.initials || displayName.charAt(0).toUpperCase();

                    return (
                        <div key={r.reviewId} className="review-item">
                            <div className="review-avatar">{displayInitials}</div>
                            <div className="review-body">
                                <div className="review-head">
                                    <div className="review-name">{displayName}</div>
                                    <div className="review-meta">
                                        <span className="review-stars-in">
                                            {Array.from({ length: r.rating || 5 }).map((_, i) => (
                                                <MdStar key={i} className="star small" />
                                            ))}
                                        </span>
                                        <span className="review-time">{r.time || "Just now"}</span>
                                    </div>

                                    {/* CHỈ HIỂN THỊ NÚT 3 CHẤM NẾU ĐÚNG CHỦ SỞ HỮU ĐANG ĐĂNG NHẬP */}
                                    {isOwner && (
                                        <div className="menu-wrapper">
                                            <button
                                                className="menu-btn-course"
                                                onClick={() => toggleMenu(r.reviewId)}
                                            >
                                                ⋯
                                            </button>

                                            {openMenuId === r.reviewId && (
                                                <div className="dropdown-menu">
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(r.reviewId);
                                                            setEditText(displayComment);
                                                            setOpenMenuId(null);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        onClick={async () => {
                                                            try {
                                                                await handleDeleteReview(r.reviewId);

                                                                toast.success("Delete review successfully!", {
                                                                    position: "top-right",
                                                                    autoClose: 2000
                                                                });

                                                            } catch (err) {
                                                                toast.error("Delete review failed!", {
                                                                    position: "top-right",
                                                                    autoClose: 2000
                                                                });

                                                                console.log(err);
                                                            }

                                                            setOpenMenuId(null);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="review-text">
                                    {editingId === r.reviewId ? (
                                        <div className="edit-box">
                                            <textarea
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                            />

                                            <div className="edit-actions">
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            await updateReviewApi({
                                                                reviewId: r.reviewId,
                                                                rating: r.rating,
                                                                comment: editText
                                                            });

                                                            setReviewsData(prev =>
                                                                prev.map(item =>
                                                                    item.reviewId === r.reviewId
                                                                        ? { ...item, comment: editText, text: editText }
                                                                        : item
                                                                )
                                                            );

                                                            setEditingId(null);

                                                            toast.success("Update review successfully!", {
                                                                position: "top-right",
                                                                autoClose: 2000,
                                                                className: "toast-green",
                                                                progressClassName: "toast-progress-white",
                                                                icon: <FaCheck color="#22c55e"/>
                                                            });

                                                        } catch (err) {
                                                            console.log("Lỗi cập nhật review:", err);

                                                            toast.error("Update review failed!", {
                                                                position: "top-right",
                                                                autoClose: 2000
                                                            });
                                                        }
                                                    }}
                                                >
                                                    Save
                                                </button>

                                                <button onClick={() => setEditingId(null)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        displayComment
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            )}

            <div className="reviews-pagination">
                <button
                    disabled={currentReviewPage === 1}
                    onClick={() =>
                        setCurrentReviewPage(p => Math.max(1, p - 1))
                    }
                >
                    ‹
                </button>

                <span>
        Page {currentReviewPage} / {totalPages || 1}
    </span>

                <button
                    disabled={currentReviewPage >= totalPages}
                    onClick={() =>
                        setCurrentReviewPage(p =>
                            Math.min(totalPages, p + 1)
                        )
                    }
                >
                    ›
                </button>
            </div>
        </div>
    );
}

export default ReviewsTab;