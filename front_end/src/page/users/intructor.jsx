import React, { useState } from "react";
import "./intructor/InstructorsPage.css";
import { FaSearch, FaStar, FaBookmark, FaCheckCircle } from "react-icons/fa";
import { BsGrid3X3Gap, BsList } from "react-icons/bs";
import {
  BarChart3,
  BookOpen,
  Bot,
  Cloud,
  Code2,
  Gamepad2,
  Globe,
  Languages,
  Palette,
  Settings,
    ShieldCheck,
    Smartphone,
    Users,
    Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom"
import { MessageCircle } from "lucide-react";
import LearnovaAI from "../home/AI/AI.jsx";

function InstructorsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  const categories = [
    "Popular",
    "React",
    "JavaScript",
    "Python",
    "AI & ML",
    "Design",
    "Data Science",
  ];
  const filterData = {
    expertise: [
      { id: 1, name: "Web Development", count: 98, icon: Globe },
      { id: 2, name: "Mobile Development", count: 96, icon: Smartphone },
      { id: 3, name: "Data Science", count: 87, icon: BarChart3 },
      { id: 4, name: "AI & ML", count: 72, icon: Bot },
      { id: 5, name: "UI/UX Design", count: 64, icon: Palette },
      { id: 6, name: "DevOps", count: 80, icon: Settings },
      { id: 7, name: "Cyber Security", count: 45, icon: ShieldCheck },
      { id: 8, name: "Game Development", count: 34, icon: Gamepad2 },
      { id: 9, name: "Blockchain", count: 26, icon: Code2 },
      { id: 10, name: "Cloud Computing", count: 24, icon: Cloud },
    ],
    rating: [
      { value: 5, label: "5.0", stars: 5, count: 120 },
      { value: 4.5, label: "4.5 & up", stars: 4.5, count: 215 },
      { value: 4.0, label: "4.0 & up", stars: 4, count: 386 },
      { value: 3.5, label: "3.5 & up", stars: 3.5, count: 627 },
    ],
    experience: [
      { id: 1, name: "1-3 years", count: 218 },
      { id: 2, name: "3-5 years", count: 167 },
      { id: 3, name: "5-10 years", count: 209 },
      { id: 4, name: "10+ years", count: 186 },
    ],
    students: [
      { id: 1, name: "1K - 10K", count: 122 },
      { id: 2, name: "10K - 50K", count: 245 },
      { id: 3, name: "50K - 100K", count: 321 },
      { id: 4, name: "100K+", count: 92 },
    ],
    language: [
      { id: 1, name: "English", count: 286 },
      { id: 2, name: "Vietnamese", count: 98 },
      { id: 3, name: "Spanish", count: 76 },
      { id: 4, name: "French", count: 54 },
      { id: 5, name: "Chinese", count: 43 },
      { id: 6, name: "Japanese", count: 31 },
      { id: 7, name: "German", count: 28 },
      { id: 8, name: "Korean", count: 24 },
    ],
  };

  const instructors = [
    {
      id: 1,
      name: "Alex Morgan",
      title: "Senior Frontend Engineer",
      badge: "verified",
      rating: 4.9,
      reviews: 12000,
      avatar:
        "https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg",
      bio: "Former Google engineer specializing in building scalable web applications and design systems.",
      skills: ["React", "TypeScript", "Next.js"],
      course: {
        title: "React Mastery",
        subtitle: "From Zero to Hero",
        students: "12,450 students",
        price: "$49.99",
        icon: (
          <img
            src="https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg"
            alt=""
          />
        ),
      },
      stats: {
        students: "12K+",
        courses: "18",
      },
    },
    {
      id: 2,
      name: "Olivia Chen",
      title: "AI Researcher & Scientist",
      badge: "top-rated",
      rating: 4.8,
      reviews: 8500,
      avatar:
        "https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg",
      bio: "PhD in AI from Stanford. Focused on making AI & ML easy to understand and practical.",
      skills: ["Python", "Machine Learning", "NLP"],
      course: {
        title: "Machine Learning",
        subtitle: "A Practical Guide",
        students: "8,321 students",
        price: "$44.99",
        icon: (
          <img
            src="https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg"
            alt=""
          />
        ),
      },
      stats: {
        students: "8.5K+",
        courses: "14",
      },
    },
    {
      id: 3,
      name: "Nguyễn Phi Thông",
      title: "Senior Full-Stack Developer",
      badge: "best-seller",
      rating: 4.9,
      reviews: 15000,
      avatar:
        "https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg",
      bio: "Fullstack engineer with 10+ years building high-performance web applications.",
      skills: ["Node.js", "React", "AWS"],
      course: {
        title: "Node.js & Express",
        subtitle: "Complete Bootcamp",
        students: "16,230 students",
        price: "$39.99",
        icon: (
          <img
            src="https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg"
            alt=""
          />
        ),
      },
      stats: {
        students: "15K+",
        courses: "22",
      },
    },
    {
      id: 4,
      name: "Sophia Lee",
      title: "UI/UX Design Lead",
      badge: "new",
      rating: 4.7,
      reviews: 6200,
      avatar: "https://via.placeholder.com/120/9333EA/ffffff?text=SL",
      bio: "Design lead at a top product company. Passionate about user-centered design.",
      skills: ["Figma", "UI Design", "UX Research"],
      course: {
        title: "UI/UX Design",
        subtitle: "From Scratch",
        students: "6,231 students",
        price: "$34.99",
        icon: (
          <img
            src="https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg"
            alt=""
          />
        ),
      },
      stats: {
        students: "6.2K+",
        courses: "10",
      },
    },
    {
      id: 5,
      name: "Nguyễn Văn Minh",
      title: "Data Scientist",
      badge: "verified",
      rating: 4.6,
      reviews: 7800,
      avatar: "https://via.placeholder.com/120/0F172A/ffffff?text=NVM",
      bio: "Data science expert specializing in analytics and business intelligence.",
      skills: ["Python", "SQL", "Data Visualization"],
      course: null,
      stats: {
        students: "7.8K+",
        courses: "12",
      },
    },
    {
      id: 6,
      name: "Lê Minh Quân",
      title: "AI Engineer",
      badge: "verified",
      rating: 4.8,
      reviews: 5300,
      avatar: "https://via.placeholder.com/120/3B82F6/ffffff?text=LMQ",
      bio: "AI engineer with expertise in deep learning and computer vision.",
      skills: ["Deep Learning", "PyTorch", "Computer Vision"],
      course: null,
      stats: {
        students: "5.3K+",
        courses: "9",
      },
    },
    {
      id: 7,
      name: "Phạm Hoàng Dung",
      title: "Product Manager",
      badge: "verified",
      rating: 4.5,
      reviews: 4310,
      avatar: "https://via.placeholder.com/120/EC4899/ffffff?text=PHD",
      bio: "Product manager with 8+ years experience in tech startups.",
      skills: ["Product Strategy", "Agile", "Growth"],
      course: null,
      stats: {
        students: "4.3K+",
        courses: "7",
      },
    },
    {
      id: 8,
      name: "David Smith",
      title: "DevOps Engineer",
      badge: "verified",
      rating: 4.6,
      reviews: 6700,
      avatar: "https://via.placeholder.com/120/06B6D4/ffffff?text=DS",
      bio: "DevOps expert specializing in cloud infrastructure and Kubernetes.",
      skills: ["AWS", "Docker", "Kubernetes"],
      course: null,
      stats: {
        students: "6.7K+",
        courses: "11",
      },
    },
  ];

  const getBadgeInfo = (badge) => {
    const badges = {
      verified: { class: "badge-verified", text: "Verified" },
      "top-rated": { class: "badge-top-rated", text: "Top Rated" },
      "best-seller": { class: "badge-best-seller", text: "Best Seller" },
      new: { class: "badge-new", text: "New" },
    };
    return badges[badge] || { class: "", text: "" };
  };

  return (
    <div className="instructors-page">


      <div className="page-container">
        <div className="sidebar-wrapper">
          <aside className="sidebar-in">
            <div className="sidebar-header">
              <h3>Filter instructors</h3>
              <button className="clear-all">Clear all</button>
            </div>

            <div className="filter-group">
              <div className="filter-title">
                <span>Expertise</span>
                <small>{filterData.expertise.length} topics</small>
              </div>
              <div className="filter-chip-grid">
                {filterData.expertise.map((item) => (
                    <label key={item.id} className="filter-chip">
                      <input type="checkbox" />
                      <span className="filter-chip-name">
                {React.createElement(item.icon, {
                  className: "item-icon",
                  size: 16,
                  strokeWidth: 2,
                })}
                        {item.name}
              </span>
                      <span className="item-count">{item.count}</span>
                    </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-title">
                <span>Rating</span>
                <small>Minimum score</small>
              </div>
              <div className="filter-list">
                {filterData.rating.map((item, index) => (
                    <label key={index} className="filter-row">
                      <input type="radio" name="rating" />
                      <span className="filter-row-main">
                <span className="rating-stars">
                  {Array.from({ length: Math.floor(item.stars) }).map(
                      (_, starIndex) => (
                          <FaStar key={starIndex} />
                      ),
                  )}
                </span>
                        {item.label}
              </span>
                      <span className="item-count">{item.count}</span>
                    </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-title">
                <span>Experience</span>
                <small>Teaching years</small>
              </div>
              <div className="filter-pill-row">
                {filterData.experience.map((item) => (
                    <label key={item.id} className="filter-pill">
                      <input type="checkbox" />
                      <span>{item.name}</span>
                      <em>{item.count}</em>
                    </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-title">
                <span>Students</span>
                <small>Learner range</small>
              </div>
              <div className="filter-pill-row">
                {filterData.students.map((item) => (
                    <label key={item.id} className="filter-pill">
                      <input type="checkbox" />
                      <span>{item.name}</span>
                      <em>{item.count}</em>
                    </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-title">
                <span>Language</span>
                <small>{filterData.language.length} options</small>
              </div>
              <div className="filter-language-grid">
                {filterData.language.map((item) => (
                    <label key={item.id} className="filter-language">
                      <input type="checkbox" />
                      <Languages className="item-icon" size={16} strokeWidth={2} />
                      <span>{item.name}</span>
                      <em>{item.count}</em>
                    </label>
                ))}
              </div>
            </div>

            <div className="sidebar-footer">
              <button className="apply-btn">Apply Filters</button>
            </div>
          </aside>
        </div>

        {/* MAIN CONTENT */}
        <main className="main-content">
          {/* SEARCH & CONTROLS */}

          {/* CATEGORY TAGS */}
          <div className="category-section">
            <span className="tag-label">Popular:</span>
            <div className="tags">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`tag ${idx === 0 ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <label className="sort-control">
              <span>Sort by:</span>
              <select>
                <option>Most Popular</option>
                <option>Top Rated</option>
                <option>Most Students</option>
                <option>Newest</option>
              </select>
            </label>
          </div>

          {/* INSTRUCTORS GRID */}
          <div className="instructors-grid">
            {instructors.map((instructor) => {
              const badgeInfo = getBadgeInfo(instructor.badge);
              return (
                <div key={instructor.id} className="instructor-card-in">
                  {/* Card Header */}
                  <div className="card-header-in-in">
                    <div className={`badge-in-in ${badgeInfo.class}`}>
                      {badgeInfo.text}
                    </div>

                  </div>

                  {/* Avatar */}
                  <div className="avatar-wrapper">
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="avatar"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="instructor-name-new">
                    {instructor.name}
                    <FaCheckCircle className="check-icon" />
                  </h3>
                  <p className="instructor-title-new-in">{instructor.title}</p>

                  {/* Skills */}
                  <div className="skills-row-in">
                    {instructor.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Rating & Stats */}
                  <div className="rating-row">
                    <div className="rating">
                      <FaStar className="star-icon" />
                      <span className="rating-value">{instructor.rating}</span>
                      <span className="rating-count">
                        ({instructor.reviews.toLocaleString()})
                      </span>
                    </div>


                  </div>

                  {/* Bio */}
                  <p className="bio">{instructor.bio}</p>

                  {/* Course Preview */}
                  {instructor.course && (
                    <div className="course-box">
                      <div className="course-icon-box">
                        {instructor.course.icon}
                      </div>
                      <div className="course-details">
                        <h4>{instructor.course.title}</h4>
                        <p>{instructor.course.subtitle}</p>
                        <span className="course-students">
                          {instructor.course.students}
                        </span>
                        <span className="course-price">
                          {instructor.course.price}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Stats */}

                  {/* Buttons */}
                  <div className="card-actions">
                    <button
                        className="view-profile-btn"
                        onClick={() => navigate("/learnova/intructorDetail")}
                    >
                      View Profile
                    </button>
                    <button className="message-btn">
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <div className="chatbot-fixed">
          <LearnovaAI />
        </div>
      </div>
    </div>
  );
}
export default InstructorsPage;
