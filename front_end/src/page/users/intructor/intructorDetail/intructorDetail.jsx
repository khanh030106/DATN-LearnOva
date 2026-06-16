import React, {useState} from 'react';
import './intructorDetail.css';
import {
    FaLinkedin,
    FaFacebook,
    FaTwitter,
    FaYoutube,
    FaCheckCircle,
    FaStar,
    FaRegThumbsUp,
    FaRegCommentDots
} from 'react-icons/fa';
import {MdEmail, MdLocationOn, MdPhone} from 'react-icons/md';
import {BiMessageDots} from 'react-icons/bi';
import {MdWork, MdVerified, MdSchool} from "react-icons/md";
import {FaUserPlus, FaUserCheck} from "react-icons/fa";
import {MdMessage} from "react-icons/md";
import {instructor, introText, introDetails, achievements, courses, reviews} from "./intructorData.js";
import HeaderIntructor from "./headerIntructor.jsx";
import MainIntructor from "./MainIntructor.jsx";
import LearnovaAI from "../../../home/AI/AI.jsx";

function InstructorDetail() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");


    return (
        <div className="instructor-detail">
            {/*header*/}
            <HeaderIntructor
                instructor={instructor}
                isFollowing={isFollowing}
                setIsFollowing={setIsFollowing}
                introText={introText}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />


            {/* Main Content */}
            <div className="profile-content">
                <MainIntructor activeTab={activeTab} />


                {/* Sidebar */}
                <aside className="sidebar-ina">
                    {/* Contact Info */}
                    <div className="sidebar-card">
                        <h3>
                            Contact information</h3>
                        <div className="contact-item">
                            <MdEmail className="contact-icon"/>
                            <a href={`mailto:${instructor.email}`}>{instructor.email}</a>
                        </div>
                        <div className="contact-item">
                            <MdLocationOn className="contact-icon"/>
                            <span>{instructor.location}</span>
                        </div>
                        <div className="contact-item">
                            <MdPhone className="contact-icon"/>
                            <span>{instructor.phone}</span>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="sidebar-card">
                        <h3>Achievements</h3>
                        {achievements.map((achievement, idx) => (
                            <div key={idx} className="achievement">
                                <FaStar className="achievement-icon"/>
                                <span>{achievement}</span>
                            </div>
                        ))}
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