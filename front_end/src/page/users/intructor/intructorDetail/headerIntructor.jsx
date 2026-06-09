
import {MdMessage, MdSchool, MdVerified, MdWork} from "react-icons/md";
import {FaUserCheck, FaUserPlus} from "react-icons/fa";
import React from "react";
function HeaderIntructor({ instructor, isFollowing, setIsFollowing, introText }) {
    return (
<div className="profile-header-in">
    <div className="profile-left">
        <div className="profile-image-container">
            <img src={instructor.image} alt={instructor.name} className="profile-image" />
            <div className="verified-badge">✓</div>
        </div>
    </div>

    <div className="profile-center">
        <div className="profile-name-section">
            <h1 className="instructor-name-in">{instructor.name}</h1>
            <div className="verified-icon">✓</div>
        </div>

        <p className="instructor-title">{instructor.title}</p>

        <div className="profile-info">
            <div className="info-item">
                <MdWork className="info-icon" />
                <span>Frontend Developer tại FPT Software</span>
            </div>

            <div className="info-item">
                <MdVerified className="info-icon" />
                <span>Bắt đầu kinh nghiệm giảng dạy</span>
            </div>

            <div className="info-item">
                <MdSchool className="info-icon" />
                <span>Đại học Bách Khoa Hà Nội</span>
            </div>
        </div>

        <p className="instructor-bio">{introText}</p>

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
                        style={{ color: social.color }}
                    />
                </a>
            ))}
        </div>
    </div>

    <div className="profile-right">
        <div className="profile-actions-vertical">
            <button
                className={`follow-btn ${isFollowing ? 'following' : ''}`}
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
        </div>
    </div>
</div>
);
} export default HeaderIntructor;