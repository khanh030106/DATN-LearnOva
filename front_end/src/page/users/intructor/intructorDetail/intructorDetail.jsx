import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './intructorDetail.css';
import { FaBookOpen, FaStar, FaUserFriends, FaUserGraduate } from 'react-icons/fa';
import HeaderIntructor from "./headerIntructor.jsx";
import MainIntructor from "./MainIntructor.jsx";
import LearnovaAI from "../../../home/chat-bot/chatBot.jsx";
import { getPublicInstructorByIdApi } from "../../../../api/InstructorApi.js";

function InstructorDetail() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("overview");
    const [instructor, setInstructor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        let mounted = true;
        setIsLoading(true);
        setError("");

        getPublicInstructorByIdApi(id)
            .then((data) => {
                if (mounted) setInstructor(data);
            })
            .catch((err) => {
                console.error("Failed to load instructor", err);
                if (mounted) setError("Failed to load instructor profile.");
            })
            .finally(() => {
                if (mounted) setIsLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [id]);

    if (isLoading) {
        return <div className="instructor-detail-status">Loading instructor profile...</div>;
    }

    if (error || !instructor) {
        return <div className="instructor-detail-status">{error || "Instructor not found."}</div>;
    }

    return (
        <div className="instructor-detail">
            <HeaderIntructor
                instructor={instructor}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="profile-content">
                <MainIntructor
                    activeTab={activeTab}
                    description={instructor.description}
                    expertiseTags={instructor.expertiseTags}
                    courses={instructor.courses}
                    reviews={instructor.reviews}
                    rating={instructor.rating}
                    reviewCount={instructor.reviewCount}
                />

                <aside className="sidebar-ina">
                    <div className="sidebar-card-contact-card instructor-highlight-card">
                        <h3>Instructor Highlights</h3>
                        <p>A quick snapshot of {instructor.fullName}'s teaching record.</p>

                        <div className="instructor-highlight-grid">
                            <div className="instructor-highlight-item">
                                <FaStar />
                                <strong>{instructor.rating.toFixed(1)}</strong>
                                <span>Rating</span>
                            </div>

                            <div className="instructor-highlight-item">
                                <FaBookOpen />
                                <strong>{instructor.courseCount}</strong>
                                <span>Courses</span>
                            </div>

                            <div className="instructor-highlight-item">
                                <FaUserGraduate />
                                <strong>{instructor.studentCount}</strong>
                                <span>Students</span>
                            </div>

                            <div className="instructor-highlight-item">
                                <FaUserFriends />
                                <strong>{instructor.followerCount}</strong>
                                <span>Followers</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
            <div className="chatbot-fixed">
                <LearnovaAI />
            </div>
        </div>
    );
}

export default InstructorDetail;
