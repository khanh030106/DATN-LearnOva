import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaStar, FaUserGraduate, FaBookOpen, FaUserPlus, FaUserCheck } from "react-icons/fa";
import defaultAvatar from "../../../../assets/default_user_avatar.jpg";
import { useAuth } from "../../../../hook/UseAuth.jsx";
import {
    getFollowStatusApi,
    followInstructorApi,
    unfollowInstructorApi,
} from "../../../../api/FollowApi.js";
import {
    FaGithub,
    FaFacebook,
    FaLinkedin,
    FaGlobe,
    FaYoutube,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";

function HeaderIntructor({ instructor, activeTab, setActiveTab }) {
    const navigate = useNavigate();
    const { isAuthenticated, loading: authLoading } = useAuth();

    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(instructor.followerCount ?? 0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getSocialIcon = (platform) => {
        switch (platform.toLowerCase()) {
            case "github":
                return <FaGithub />;
            case "facebook":
                return <FaFacebook />;
            case "linkedin":
                return <FaLinkedin />;
            case "youtube":
                return <FaYoutube />;
            case "twitter":
                return <FaTwitter />;
            case "instagram":
                return <FaInstagram />;
            case "website":
                return <FaGlobe />;
            default:
                return <FaGlobe />;
        }
    };

    useEffect(() => {
        if (authLoading || !isAuthenticated) return;

        getFollowStatusApi(instructor.instructorId)
            .then((data) => {
                setIsFollowing(data.following);
                setFollowerCount(data.followerCount);
            })
            .catch((err) => console.error("Failed to load follow status", err));
    }, [authLoading, isAuthenticated, instructor.instructorId]);

    const handleToggleFollow = async () => {
        if (authLoading) return;

        if (!isAuthenticated) {
            toast.error("Please log in to follow this instructor.");
            navigate("/learnova/auth/login");
            return;
        }

        setIsSubmitting(true);
        try {
            const data = isFollowing
                ? await unfollowInstructorApi(instructor.instructorId)
                : await followInstructorApi(instructor.instructorId);

            setIsFollowing(data.following);
            setFollowerCount(data.followerCount);

            if (data.following) {
                toast.success(`You are now following ${instructor.fullName}.`);
            }
        } catch (err) {
            console.error("Failed to update follow status", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="profile-header-in">
            <div className="header-img"></div>

            <div className="profile-header-under">
                <div className="profile-left">
                    <div className="profile-image-container">
                        <img
                            src={instructor.avatar?.trim() ? instructor.avatar : defaultAvatar}
                            alt={instructor.fullName}
                            className="profile-image"
                        />
                    </div>
                </div>

                <div className="profile-center">
                    <div className="profile-name-section">
                        <h1 className="instructor-name-in">{instructor.fullName}</h1>
                    </div>

                    <p className="instructor-title">{instructor.headline || "Instructor"}</p>

                    <div className="profile-info">
                        <div className="info-item">
                            <FaStar className="info-icon" />
                            <span>{instructor.rating.toFixed(1)}/5 ({instructor.reviewCount} reviews)</span>
                        </div>

                        <div className="info-item">
                            <FaUserGraduate className="info-icon" />
                            <span>{instructor.studentCount} students</span>
                        </div>

                        <div className="info-item">
                            <FaBookOpen className="info-icon" />
                            <span>{instructor.courseCount} courses</span>
                        </div>

                        <div className="info-item">
                            <FaUserCheck className="info-icon" />
                            <span>{followerCount} followers</span>
                        </div>
                    </div>

                    {instructor.description && (
                        <p className="instructor-bio-in">{instructor.description}</p>
                    )}
                </div>

                <div className="profile-right">
                    <div className="profile-actions-vertical">
                        <button
                            className={`follow-btn ${isFollowing ? "following" : ""}`}
                            onClick={handleToggleFollow}
                            disabled={isSubmitting}
                            type="button"
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

                        {instructor.socialLinks && Object.keys(instructor.socialLinks).length > 0 && (
                            <div className="social-links-in">
                                {Object.entries(instructor.socialLinks).map(([platform, url]) => (
                                    <a
                                        key={platform}
                                        href={url}
                                        className="social-link-in"
                                        title={platform}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {getSocialIcon(platform)}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <hr className="hr-in" />

            <div className="instructor-tabs-in">
                <button
                    className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>

                <button
                    className={`tab-btn ${activeTab === "about" ? "active" : ""}`}
                    onClick={() => setActiveTab("about")}
                >
                    About
                </button>

                <button
                    className={`tab-btn ${activeTab === "courses" ? "active" : ""}`}
                    onClick={() => setActiveTab("courses")}
                >
                    Courses
                </button>

                <button
                    className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
                    onClick={() => setActiveTab("reviews")}
                >
                    Reviews
                </button>
            </div>
        </div>
    );
}

export default HeaderIntructor;
