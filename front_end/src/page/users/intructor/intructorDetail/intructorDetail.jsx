import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './intructorDetail.css';
import {
    FaLinkedin,
    FaFacebook,
    FaGithub,
    FaGlobe,
    FaStar,
} from 'react-icons/fa';
import {BiMessageDots} from 'react-icons/bi';
import HeaderIntructor from "./headerIntructor.jsx";
import MainIntructor from "./MainIntructor.jsx";
import LearnovaAI from "../../../home/chat-bot/chatBot.jsx";
import {getInstructorProfile} from "../../../../api/PublicInstructorApi.js";
import {getFileUrl} from "../../../../api/PublicCourseApi.js";

const DEFAULT_AVATAR =
    "https://api.dicebear.com/7.x/initials/svg?seed=Instructor&backgroundType=gradientLinear";

const SOCIAL_ICONS = {
    website: {icon: FaGlobe, color: "#0f172a"},
    linkedin: {icon: FaLinkedin, color: "#0A66C2"},
    github: {icon: FaGithub, color: "#24292f"},
    facebook: {icon: FaFacebook, color: "#1877F2"},
};

function InstructorDetail() {
    const {instructorId} = useParams();
    const [isFollowing, setIsFollowing] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            setIsLoading(true);
            try {
                const data = await getInstructorProfile(instructorId);
                let avatar = data.avatar || DEFAULT_AVATAR;
                if (data.avatarKey) {
                    try {
                        avatar = await getFileUrl(data.avatarKey);
                    } catch {
                        // keep fallback avatar
                    }
                }
                const courses = await Promise.all(
                    (data.courses || []).map(async (course) => {
                        let thumbnailUrl = null;
                        if (course.thumbnailKey) {
                            try {
                                thumbnailUrl = await getFileUrl(course.thumbnailKey);
                            } catch {
                                // no thumbnail available
                            }
                        }
                        return {...course, thumbnailUrl};
                    })
                );
                if (isMounted) setProfile({...data, avatar, courses});
            } catch {
                if (isMounted) setProfile(null);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };
        load();
        return () => {
            isMounted = false;
        };
    }, [instructorId]);

    if (isLoading) {
        return <div className="instructor-detail-loading">Loading instructor profile…</div>;
    }

    if (!profile) {
        return <div className="instructor-detail-loading">Instructor not found.</div>;
    }

    const socials = Object.entries(profile.socialLinks || {})
        .filter(([key, url]) => SOCIAL_ICONS[key] && url)
        .map(([key, url]) => ({icon: SOCIAL_ICONS[key].icon, color: SOCIAL_ICONS[key].color, url}));

    const instructor = {
        name: profile.fullName,
        title: profile.headline || "Instructor",
        image: profile.avatar,
        rating: profile.avgRating ? profile.avgRating.toFixed(1) : "0.0",
        ratingCount: profile.ratingCount || 0,
        courseCount: profile.courseCount || 0,
        studentCount: profile.studentCount || 0,
        joinedAt: profile.joinedAt,
        socials,
    };

    return (
        <div className="instructor-detail">
            {/*header*/}
            <HeaderIntructor
                instructor={instructor}
                isFollowing={isFollowing}
                setIsFollowing={setIsFollowing}
                introText={profile.description}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* Main Content */}
            <div className="profile-content">
                <MainIntructor
                    activeTab={activeTab}
                    description={profile.description}
                    expertise={profile.expertise}
                    courses={profile.courses || []}
                />

                {/* Sidebar */}
                <aside className="sidebar-ina">
                    {/* Achievements */}
                    <div className="sidebar-card">
                        <h3>Highlights</h3>
                        <div className="achievement">
                            <FaStar className="achievement-icon"/>
                            <span>{instructor.courseCount} published courses</span>
                        </div>
                        <div className="achievement">
                            <FaStar className="achievement-icon"/>
                            <span>{instructor.studentCount} students taught</span>
                        </div>
                        <div className="achievement">
                            <FaStar className="achievement-icon"/>
                            <span>{instructor.rating}★ average rating ({instructor.ratingCount} reviews)</span>
                        </div>
                    </div>

                    {/* Message Card */}
                    <div className="sidebar-card-contact-card">
                        <h3>
                            Have questions ?</h3>
                        <p>Do you have any questions? Please contact the instructor directly</p>
                        <button className="chat-btn">
                            <BiMessageDots size={18}/>

                            Start chatting
                        </button>
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
