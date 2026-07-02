import React from "react";
import { FaGraduationCap, FaCheckCircle, FaUserGraduate } from "react-icons/fa";

const formatHours = (seconds) => {
    if (!seconds) return "0h";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m > 0 ? m + "m" : ""}`.trim();
    return `${m}m`;
};

function OverviewTab({ course, instructor, instructorAvatarUrl, expandedDescription, setExpandedDescription }) {
    const rawDesc = course?.description || "";
    const paragraphs = rawDesc.split(/\n+/).filter(Boolean);
    const visibleParas = expandedDescription ? paragraphs : paragraphs.slice(0, 2);
    const whatYouLearn = course?.whatYouLearn || [];

    return (
        <div className="overview-content">
            <div className="course-stats">
                <div className="stat">
                    <span className="stat-value">{formatHours(course?.totalDurationSeconds)}</span>
                </div>
                <div className="stat">
                    <span className="stat-value">{course?.lessonCount ?? 0} Lessons</span>
                </div>
                <div className="stat">
                    <span className="stat-label">{course?.level}</span>
                </div>
            </div>

            {paragraphs.length > 0 && (
                <div className="description-section">
                    <h3>Course Description</h3>
                    <div className={`description-content ${expandedDescription ? "expanded" : "collapsed"}`}>
                        {visibleParas.map((p, idx) => (
                            <p key={idx} className="description-para">{p}</p>
                        ))}
                    </div>
                    {paragraphs.length > 2 && (
                        <button className="see-more-btn" onClick={() => setExpandedDescription(!expandedDescription)}>
                            {expandedDescription ? "See less" : "See more"}
                        </button>
                    )}
                </div>
            )}

            {whatYouLearn.length > 0 && (
                <div className="learn-section">
                    <h4 className="learn-title">
                        <FaGraduationCap className="title-icon" />
                        What you'll learn
                    </h4>
                    <ul className="learn-list">
                        {whatYouLearn.map((item, idx) => (
                            <li key={idx}>
                                <FaCheckCircle className="learn-icon" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <hr />

            <div className="instructor-section">
                <h4 className="section-header-title">
                    <FaUserGraduate className="OV-section-icon" />
                    Instructor
                </h4>
                <div className="instructor-container">
                    <div className="instructor-header-box">
                        <div className="OV-instructor-avatar-wrapper-co">
                            {instructorAvatarUrl ? (
                                <img
                                    src={instructorAvatarUrl}
                                    alt={instructor?.fullName}
                                    className="instructor-avatar-large"
                                />
                            ) : (
                                <div
                                    className="instructor-avatar-large"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "#e2e8f0",
                                        fontSize: "28px",
                                        fontWeight: 700,
                                        color: "#64748b",
                                        borderRadius: "50%",
                                    }}
                                >
                                    {instructor?.fullName?.charAt(0) ?? "?"}
                                </div>
                            )}
                        </div>
                        <div className="instructor-details">
                            <h3 className="instructor-name-large">{instructor?.fullName}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverviewTab;
