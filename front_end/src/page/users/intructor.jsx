import React, { useState } from 'react';
import './intructor/InstructorsPage.css';
import { FaSearch, FaStar, FaBookmark, FaCheckCircle } from 'react-icons/fa';
import { BsGrid3X3Gap, BsList } from 'react-icons/bs';
import { Users, BookOpen } from "lucide-react";
import { MessageCircle } from "lucide-react";

 function InstructorsPage() {
    const [viewMode, setViewMode] = useState('grid');

    const categories = ['Popular', 'React', 'JavaScript', 'Python', 'AI & ML', 'Design', 'Data Science'];
     const [expandedFilters, setExpandedFilters] = useState({
         expertise: false,
         rating: false,
         experience: false,
         students: false,
         language: false
     });

     const toggleFilter = (filterType) => {
         setExpandedFilters(prev => ({
             ...prev,
             [filterType]: !prev[filterType]
         }));
     }




     const filterData = {
         expertise: [
             { id: 1, name: 'Web Development', count: 98, icon: '🌐' },
             { id: 2, name: 'Mobile Development', count: 96, icon: '📱' },
             { id: 3, name: 'Data Science', count: 87, icon: '📊' },
             { id: 4, name: 'AI & ML', count: 72, icon: '🤖' },
             { id: 5, name: 'UI/UX Design', count: 64, icon: '🎨' },
             { id: 6, name: 'DevOps', count: 80, icon: '⚙️' },
             { id: 7, name: 'Cyber Security', count: 45, icon: '🔒' },
             { id: 8, name: 'Game Development', count: 34, icon: '🎮' },
             { id: 9, name: 'Blockchain', count: 26, icon: '⛓️' },
             { id: 10, name: 'Cloud Computing', count: 24, icon: '☁️' }
         ],
         rating: [
             { value: 5, label: '5.0', stars: 5, count: 120 },
             { value: 4.5, label: '4.5 & up', stars: 4.5, count: 215 },
             { value: 4.0, label: '4.0 & up', stars: 4, count: 386 },
             { value: 3.5, label: '3.5 & up', stars: 3.5, count: 627 }
         ],
         experience: [
             { id: 1, name: '1-3 years', count: 218 },
             { id: 2, name: '3-5 years', count: 167 },
             { id: 3, name: '5-10 years', count: 209 },
             { id: 4, name: '10+ years', count: 186 }
         ],
         students: [
             { id: 1, name: '1K - 10K', count: 122 },
             { id: 2, name: '10K - 50K', count: 245 },
             { id: 3, name: '50K - 100K', count: 321 },
             { id: 4, name: '100K+', count: 92 }
         ],
         language: [
             { id: 1, name: 'English', count: 286, flag: '🇺🇸' },
             { id: 2, name: 'Vietnamese', count: 98, flag: '🇻🇳' },
             { id: 3, name: 'Spanish', count: 76, flag: '🇪🇸' },
             { id: 4, name: 'French', count: 54, flag: '🇫🇷' },
             { id: 5, name: 'Chinese', count: 43, flag: '🇨🇳' },
             { id: 6, name: 'Japanese', count: 31, flag: '🇯🇵' },
             { id: 7, name: 'German', count: 28, flag: '🇩🇪' },
             { id: 8, name: 'Korean', count: 24, flag: '🇰🇷' }
         ]
     };


     const [showMore, setShowMore] = useState({
         expertise: false,
         language: false
     });

     const toggleShowMore = (filterType) => {
         setShowMore(prev => ({
             ...prev,
             [filterType]: !prev[filterType]
         }));
     };

    const instructors = [
        {
            id: 1,
            name: 'Alex Morgan',
            title: 'Senior Frontend Engineer',
            badge: 'verified',
            rating: 4.9,
            reviews: 12000,
            avatar: 'https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg',
            bio: 'Former Google engineer specializing in building scalable web applications and design systems.',
            skills: ['React', 'TypeScript', 'Next.js'],
            course: {
                title: 'React Mastery',
                subtitle: 'From Zero to Hero',
                students: '12,450 students',
                price: '$49.99',
                icon: (
                    <img
                        src="https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg"
                        alt=""
                    />
                )
            },
            stats: {
                students: '12K+',
                courses: '18'
            }
        },
        {
            id: 2,
            name: 'Olivia Chen',
            title: 'AI Researcher & Scientist',
            badge: 'top-rated',
            rating: 4.8,
            reviews: 8500,
            avatar: 'https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg',
            bio: 'PhD in AI from Stanford. Focused on making AI & ML easy to understand and practical.',
            skills: ['Python', 'Machine Learning', 'NLP'],
            course: {
                title: 'Machine Learning',
                subtitle: 'A Practical Guide',
                students: '8,321 students',
                price: '$44.99',
                icon: (
                    <img
                        src="https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg"
                        alt=""
                    />
                )
            },
            stats: {
                students: '8.5K+',
                courses: '14'
            }
        },
        {
            id: 3,
            name: 'Nguyễn Phi Thông',
            title: 'Senior Full-Stack Developer',
            badge: 'best-seller',
            rating: 4.9,
            reviews: 15000,
            avatar: 'https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg',
            bio: 'Fullstack engineer with 10+ years building high-performance web applications.',
            skills: ['Node.js', 'React', 'AWS'],
            course: {
                title: 'Node.js & Express',
                subtitle: 'Complete Bootcamp',
                students: '16,230 students',
                price: '$39.99',
                icon: (
                    <img
                        src="https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg"
                        alt=""
                    />
                )
            },
            stats: {
                students: '15K+',
                courses: '22'
            }
        },
        {
            id: 4,
            name: 'Sophia Lee',
            title: 'UI/UX Design Lead',
            badge: 'new',
            rating: 4.7,
            reviews: 6200,
            avatar: 'https://via.placeholder.com/120/9333EA/ffffff?text=SL',
            bio: 'Design lead at a top product company. Passionate about user-centered design.',
            skills: ['Figma', 'UI Design', 'UX Research'],
            course: {
                title: 'UI/UX Design',
                subtitle: 'From Scratch',
                students: '6,231 students',
                price: '$34.99',
                icon: (
                    <img
                        src="https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg"
                        alt=""
                    />
                )
            },
            stats: {
                students: '6.2K+',
                courses: '10'
            }
        },
        {
            id: 5,
            name: 'Nguyễn Văn Minh',
            title: 'Data Scientist',
            badge: 'verified',
            rating: 4.6,
            reviews: 7800,
            avatar: 'https://via.placeholder.com/120/0F172A/ffffff?text=NVM',
            bio: 'Data science expert specializing in analytics and business intelligence.',
            skills: ['Python', 'SQL', 'Data Visualization'],
            course: null,
            stats: {
                students: '7.8K+',
                courses: '12'
            }
        },
        {
            id: 6,
            name: 'Lê Minh Quân',
            title: 'AI Engineer',
            badge: 'verified',
            rating: 4.8,
            reviews: 5300,
            avatar: 'https://via.placeholder.com/120/3B82F6/ffffff?text=LMQ',
            bio: 'AI engineer with expertise in deep learning and computer vision.',
            skills: ['Deep Learning', 'PyTorch', 'Computer Vision'],
            course: null,
            stats: {
                students: '5.3K+',
                courses: '9'
            }
        },
        {
            id: 7,
            name: 'Phạm Hoàng Dung',
            title: 'Product Manager',
            badge: 'verified',
            rating: 4.5,
            reviews: 4310,
            avatar: 'https://via.placeholder.com/120/EC4899/ffffff?text=PHD',
            bio: 'Product manager with 8+ years experience in tech startups.',
            skills: ['Product Strategy', 'Agile', 'Growth'],
            course: null,
            stats: {
                students: '4.3K+',
                courses: '7'
            }
        },
        {
            id: 8,
            name: 'David Smith',
            title: 'DevOps Engineer',
            badge: 'verified',
            rating: 4.6,
            reviews: 6700,
            avatar: 'https://via.placeholder.com/120/06B6D4/ffffff?text=DS',
            bio: 'DevOps expert specializing in cloud infrastructure and Kubernetes.',
            skills: ['AWS', 'Docker', 'Kubernetes'],
            course: null,
            stats: {
                students: '6.7K+',
                courses: '11'
            }
        }
    ];

    const getBadgeInfo = (badge) => {
        const badges = {
            'verified': { class: 'badge-verified', text: 'Verified' },
            'top-rated': { class: 'badge-top-rated', text: 'Top Rated' },
            'best-seller': { class: 'badge-best-seller', text: 'Best Seller' },
            'new': { class: 'badge-new', text: 'New' }
        };
        return badges[badge] || { class: '', text: '' };
    };

    return (
        <div className="instructors-page">



            <div className="page-container">

                <aside className="sidebar">
                    <div className="sidebar-header">
                        <h3>FILTER INSTRUCTORS</h3>
                        <button className="clear-all">Clear all</button>
                    </div>
                    <div className="sidebar-content">

                    {/* EXPERTISE */}
                    <div className="filter-group">
                        <div
                            className="filter-title-header"
                            onClick={() => toggleFilter("expertise")}
                        >
                            <div className="filter-title">
                                <i className="fas fa-star"></i>
                                <span>Expertise</span>
                            </div>

                            <i
                                className={`fas fa-chevron-down dropdown-arrow ${
                                    expandedFilters.expertise ? "open" : ""
                                }`}
                            ></i>
                        </div>

                        <p className="filter-subtitle">Select expertise</p>

                        {expandedFilters.expertise && (
                            <>
                                <div className="filter-options">
                                    {(showMore.expertise
                                            ? filterData.expertise
                                            : filterData.expertise.slice(0, 6)
                                    ).map((item) => (
                                        <label
                                            key={item.id}
                                            className="filter-checkbox"
                                        >
                                            <input type="checkbox" />

                                            <span className="checkbox-content">
                                <span className="item-name">
                                    <span className="item-icon">
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </span>

                                <span className="item-count">
                                    {item.count}
                                </span>
                            </span>
                                        </label>
                                    ))}
                                </div>

                                <button
                                    className="show-more-btn"
                                    onClick={() =>
                                        toggleShowMore("expertise")
                                    }
                                >
                                    {showMore.expertise
                                        ? "Show Less"
                                        : "Show More"}
                                </button>
                            </>
                        )}
                    </div>

                    {/* RATING */}
                    <div className="filter-group">
                        <div
                            className="filter-title-header"
                            onClick={() => toggleFilter("rating")}
                        >
                            <div className="filter-title">
                                <i className="fas fa-star-half-alt"></i>
                                <span>Rating</span>
                            </div>

                            <i
                                className={`fas fa-chevron-down dropdown-arrow ${
                                    expandedFilters.rating ? "open" : ""
                                }`}
                            ></i>
                        </div>

                        <p className="filter-subtitle">
                            Select minimum rating
                        </p>

                        {expandedFilters.rating && (
                            <div className="filter-options">
                                {filterData.rating.map((item, index) => (
                                    <label
                                        key={index}
                                        className="filter-checkbox"
                                    >
                                        <input
                                            type="radio"
                                            name="rating"
                                        />

                                        <span className="checkbox-content">
                            <span className="item-name">
                                {"⭐".repeat(
                                    Math.floor(item.stars)
                                )}{" "}
                                {item.label}
                            </span>

                            <span className="item-count">
                                {item.count}
                            </span>
                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* EXPERIENCE */}
                    <div className="filter-group">
                        <div
                            className="filter-title-header"
                            onClick={() =>
                                toggleFilter("experience")
                            }
                        >
                            <div className="filter-title">
                                <i className="fas fa-briefcase"></i>
                                <span>Experience</span>
                            </div>

                            <i
                                className={`fas fa-chevron-down dropdown-arrow ${
                                    expandedFilters.experience
                                        ? "open"
                                        : ""
                                }`}
                            ></i>
                        </div>

                        <p className="filter-subtitle">
                            Select experience
                        </p>

                        {expandedFilters.experience && (
                            <div className="filter-options">
                                {filterData.experience.map((item) => (
                                    <label
                                        key={item.id}
                                        className="filter-checkbox"
                                    >
                                        <input type="checkbox" />

                                        <span className="checkbox-content">
                            <span className="item-name">
                                {item.name}
                            </span>

                            <span className="item-count">
                                {item.count}
                            </span>
                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* STUDENTS */}
                    <div className="filter-group">
                        <div
                            className="filter-title-header"
                            onClick={() =>
                                toggleFilter("students")
                            }
                        >
                            <div className="filter-title">
                                <i className="fas fa-users"></i>
                                <span>Students</span>
                            </div>

                            <i
                                className={`fas fa-chevron-down dropdown-arrow ${
                                    expandedFilters.students
                                        ? "open"
                                        : ""
                                }`}
                            ></i>
                        </div>

                        <p className="filter-subtitle">
                            Select student range
                        </p>

                        {expandedFilters.students && (
                            <div className="filter-options">
                                {filterData.students.map((item) => (
                                    <label
                                        key={item.id}
                                        className="filter-checkbox"
                                    >
                                        <input type="checkbox" />

                                        <span className="checkbox-content">
                            <span className="item-name">
                                {item.name}
                            </span>

                            <span className="item-count">
                                {item.count}
                            </span>
                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* LANGUAGE */}
                    <div className="filter-group">
                        <div
                            className="filter-title-header"
                            onClick={() =>
                                toggleFilter("language")
                            }
                        >
                            <div className="filter-title">
                                <i className="fas fa-globe"></i>
                                <span>Language</span>
                            </div>

                            <i
                                className={`fas fa-chevron-down dropdown-arrow ${
                                    expandedFilters.language
                                        ? "open"
                                        : ""
                                }`}
                            ></i>
                        </div>

                        <p className="filter-subtitle">
                            Select language
                        </p>

                        {expandedFilters.language && (
                            <>
                                <div className="filter-options scrollable">
                                    {(showMore.language
                                            ? filterData.language
                                            : filterData.language.slice(
                                                0,
                                                6
                                            )
                                    ).map((item) => (
                                        <label
                                            key={item.id}
                                            className="filter-checkbox"
                                        >
                                            <input type="checkbox" />

                                            <span className="checkbox-content">
                                <span className="item-name">
                                    <span className="flag">
                                        {item.flag}
                                    </span>
                                    {item.name}
                                </span>

                                <span className="item-count">
                                    {item.count}
                                </span>
                            </span>
                                        </label>
                                    ))}
                                </div>

                                <button
                                    className="show-more-btn"
                                    onClick={() =>
                                        toggleShowMore("language")
                                    }
                                >
                                    {showMore.language
                                        ? "Show Less"
                                        : "Show More"}
                                </button>
                            </>
                        )}
                    </div>
                    </div>

                    <div className="sidebar-footer">
                        <button className="apply-btn">
                            Apply Filters
                        </button>
                    </div>

                </aside>

                {/* MAIN CONTENT */}
                <main className="main-content">
                    {/* SEARCH & CONTROLS */}


                    {/* CATEGORY TAGS */}
                    <div className="category-section">
                        <span className="tag-label">Popular:</span>
                        <div className="tags">
                            {categories.map((cat, idx) => (
                                <button key={idx} className={`tag ${idx === 0 ? 'active' : ''}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* INSTRUCTORS GRID */}
                    <div className="instructors-grid">
                        {instructors.map(instructor => {
                            const badgeInfo = getBadgeInfo(instructor.badge);
                            return (
                                <div key={instructor.id} className="instructor-card">
                                    {/* Card Header */}
                                    <div className="card-header">
                                        <div className={`badge ${badgeInfo.class}`}>{badgeInfo.text}</div>
                                        <button className="wishlist-btn">
                                            <FaBookmark />
                                        </button>
                                    </div>

                                    {/* Avatar */}
                                    <div className="avatar-wrapper">
                                        <img src={instructor.avatar} alt={instructor.name} className="avatar" />
                                        <span className="online-dot"></span>
                                    </div>

                                    {/* Info */}
                                    <h3 className="instructor-name-new">
                                        {instructor.name}
                                        <FaCheckCircle className="check-icon" />
                                    </h3>
                                    <p className="instructor-title-new">{instructor.title}</p>

                                    {/* Skills */}
                                    <div className="skills-row">
                                        {instructor.skills.map((skill, idx) => (
                                            <span key={idx} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>

                                    {/* Rating & Stats */}
                                    <div className="rating-row">
                                        <div className="rating">
                                            <FaStar className="star-icon" />
                                            <span className="rating-value">{instructor.rating}</span>
                                            <span className="rating-count">({instructor.reviews.toLocaleString()})</span>
                                        </div>
                                        <div className="stats-row">
                                            <div className="stat">
                                                <Users size={16} className="stat-icon" />
                                                <span className="stat-value">{instructor.stats.students}</span>
                                            </div>
                                            <div className="stat">
                                                <BookOpen size={16} className="stat-icon" />
                                                <span className="stat-value">{instructor.stats.courses}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="bio">{instructor.bio}</p>

                                    {/* Course Preview */}
                                    {instructor.course && (
                                        <div className="course-box">
                                            <div className="course-icon-box">{instructor.course.icon}</div>
                                            <div className="course-details">
                                                <h4>{instructor.course.title}</h4>
                                                <p>{instructor.course.subtitle}</p>
                                                <span className="course-students">{instructor.course.students}</span>
                                                <span className="course-price">{instructor.course.price}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Stats */}


                                    {/* Buttons */}
                                    <div className="card-actions">
                                        <button className="view-profile-btn">View Profile</button>
                                        <button className="message-btn">
                                            <MessageCircle size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* RESULT TEXT */}
                    <div className="result-text">
                        Tìm thấy 9 giảng viên phù hợp
                    </div>
                </main>
            </div>
        </div>
    );
} export default InstructorsPage;