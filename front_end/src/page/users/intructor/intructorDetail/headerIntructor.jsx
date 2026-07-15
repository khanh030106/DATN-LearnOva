import React, { useState } from "react";
import { MdMessage, MdSchool, MdVerified, MdWork } from "react-icons/md";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";

function headerIntructor({
                             instructor,
                             isFollowing,
                             setIsFollowing,
                             introText,
                             activeTab,
                             setActiveTab
                         })  {




    return (
        <div className="profile-header-in">

            {/* Cover */}
            <div className="header-img"></div>

            {/* Content */}
            <div className="profile-header-under">

                <div className="profile-left">
                    <div className="profile-image-container">
                        <img
                            src={instructor.image}
                            alt={instructor.name}
                            className="profile-image"
                        />

                        <div className="verified-badge">
                            ✓
                        </div>
                    </div>
                </div>

                <div className="profile-center">

                    <div className="profile-name-section">
                        <h1 className="instructor-name-in">
                            {instructor.name}
                        </h1>

                        <div className="verified-icon">
                            ✓
                        </div>
                    </div>

                    <p className="instructor-title">
                        {instructor.title}
                    </p>

                    <div className="profile-info">

                        <div className="info-item">
                            <MdWork className="info-icon" />
                            <span>{instructor.courseCount} courses</span>
                        </div>

                        <div className="info-item">
                            <MdVerified className="info-icon" />
                            <span>{instructor.rating}★ ({instructor.ratingCount} reviews)</span>
                        </div>

                        <div className="info-item">
                            <MdSchool className="info-icon" />
                            <span>{instructor.studentCount} students</span>
                        </div>

                    </div>

                    {introText && (
                        <p className="instructor-bio-in">
                            {introText}
                        </p>
                    )}

                </div>

                <div className="profile-right">

                    <div className="profile-actions-vertical">

                        <button
                            className={`follow-btn ${
                                isFollowing ? "following" : ""
                            }`}
                            onClick={() => setIsFollowing(!isFollowing)}
                        >
                            {isFollowing ? (
                                <>
                                    <FaUserCheck />
                                    Following
                                </>
                            ) : (
                                <>
                                    <FaUserPlus />
                                    Follow
                                </>
                            )}
                        </button>

                        <button className="message-btn">
                            <MdMessage />
                        </button>

                        <div className="social-links-in">
                            {instructor.socials.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.url}
                                    className="social-link-in"
                                    title="Social"
                                >
                                    <social.icon
                                        size={20}
                                        style={{
                                            color: social.color
                                        }}
                                    />
                                </a>
                            ))}
                        </div>

                    </div>

                </div>

            </div>

            <hr className="hr-in" />

            {/* Tabs */}
            <div className="instructor-tabs-in">

                <button
                    className={`tab-btn ${
                        activeTab === "overview" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("overview")}
                >
                    Tổng quan
                </button>

                <button
                    className={`tab-btn ${
                        activeTab === "about" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("about")}
                >
                    Giới thiệu
                </button>

                <button
                    className={`tab-btn ${
                        activeTab === "courses" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("courses")}
                >
                    Khóa học
                </button>

                <button
                    className={`tab-btn ${
                        activeTab === "reviews" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("reviews")}
                >
                    Đánh giá
                </button>

            </div>

        </div>
    );


}

export default headerIntructor;
