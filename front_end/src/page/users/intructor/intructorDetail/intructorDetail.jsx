import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './css/intructorDetail.css';
import { FaBookOpen, FaStar, FaUserFriends, FaUserGraduate } from 'react-icons/fa';
import HeaderIntructor from "./components/headerIntructor.jsx";
import MainIntructor from "./components/MainIntructor.jsx";
import LearnovaAI from "../../../home/chat-bot/chatBot.jsx";
import { getPublicInstructorByIdApi } from "../../../../api/InstructorApi.js";

function InstructorDetail() {
    const { t } = useTranslation();
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
                if (mounted) setError(t("instructorDetailPage.loadError"));
            })
            .finally(() => {
                if (mounted) setIsLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [id]);

    if (isLoading) {
        return <div className="instructor-detail-status">{t("instructorDetailPage.loading")}</div>;
    }

    if (error || !instructor) {
        return <div className="instructor-detail-status">{error || t("instructorDetailPage.notFound")}</div>;
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
                        <h3>{t("instructorDetailPage.highlights")}</h3>
                        <p>{t("instructorDetailPage.highlightsSummary", { name: instructor.fullName })}</p>

                        <div className="instructor-highlight-grid">
                            <div className="instructor-highlight-item">
                                <FaStar />
                                <strong>{instructor.rating.toFixed(1)}</strong>
                                <span>{t("instructorDetailPage.rating")}</span>
                            </div>

                            <div className="instructor-highlight-item">
                                <FaBookOpen />
                                <strong>{instructor.courseCount}</strong>
                                <span>{t("instructorDetailPage.courses")}</span>
                            </div>

                            <div className="instructor-highlight-item">
                                <FaUserGraduate />
                                <strong>{instructor.studentCount}</strong>
                                <span>{t("instructorDetailPage.students")}</span>
                            </div>

                            <div className="instructor-highlight-item">
                                <FaUserFriends />
                                <strong>{instructor.followerCount}</strong>
                                <span>{t("instructorDetailPage.followers")}</span>
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
