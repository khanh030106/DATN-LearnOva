import React, { useEffect, useState } from "react";
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
import LearnovaAI from "../home/chat-bot/chatBot.jsx";
import { getInstructors } from "../../api/PublicInstructorApi.js";
import { getFileUrl } from "../../api/PublicCourseApi.js";

const DEFAULT_AVATAR =
  "https://api.dicebear.com/7.x/initials/svg?seed=Instructor&backgroundType=gradientLinear";

const formatCompactNumber = (value) => {
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K+`;
  return String(value);
};

function InstructorsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await getInstructors();
        const mapped = await Promise.all(
          data.map(async (item) => {
            let avatar = item.avatar || DEFAULT_AVATAR;
            if (item.avatarKey) {
              try {
                avatar = await getFileUrl(item.avatarKey);
              } catch {
                // keep fallback avatar
              }
            }
            return {
              id: item.instructorId,
              name: item.fullName,
              title: item.headline || "Instructor",
              rating: item.avgRating || 0,
              reviews: item.ratingCount || 0,
              avatar,
              skills: item.expertise
                ? item.expertise.split(",").map((s) => s.trim()).filter(Boolean)
                : [],
              stats: {
                students: formatCompactNumber(item.studentCount || 0),
                courses: String(item.courseCount || 0),
              },
            };
          })
        );
        if (isMounted) setInstructors(mapped);
      } catch {
        if (isMounted) setInstructors([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    "Popular",
    "React",
    "JavaScript",
    "Python",
    "chat-bot & ML",
    "Design",
    "Data Science",
  ];
  const filterData = {
    expertise: [
      { id: 1, name: "Web Development", count: 98, icon: Globe },
      { id: 2, name: "Mobile Development", count: 96, icon: Smartphone },
      { id: 3, name: "Data Science", count: 87, icon: BarChart3 },
      { id: 4, name: "chat-bot & ML", count: 72, icon: Bot },
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
      { id: 2, name: "Vietnamese", count: 98 }

    ],
  };

  return (
    <div className="instructors-page">


      <div className="page-container">
        <div className="sidebar-wrapper">
          <aside className="sidebar-in">
            {/*<div className="sidebar-header">*/}
            {/*  <h3>Filter instructors</h3>*/}
            {/*  <button className="clear-all">Clear all</button>*/}
            {/*</div>*/}

            <div className="filter-group-in">
              <div className="filter-title">
                <span>Expertise</span>
                <small>{filterData.expertise.length} topics</small>
              </div>
              <div className="filter-chip-grid">
                {filterData.expertise.map((item) => (
                    <label key={item.id} className="filter-chip-in">
                      <input type="checkbox" />
                      <span className="filter-chip-name">

                        {item.name}
              </span>

                    </label>
                ))}
              </div>
            </div>

            <div className="filter-group-in">
              <div className="filter-title">
                <span>Rating</span>
                <small>Minimum score</small>
              </div>
              <div className="filter-list">
                {filterData.rating.map((item, index) => (
                    <label key={index} className="filter-row-in">
                      <input type="radio" name="rating" />
                      <span className="filter-row-main">

                        {item.label}
              </span>

                    </label>
                ))}
              </div>
            </div>

            <div className="filter-group-in">
              <div className="filter-title">
                <span>Experience</span>
                <small>Teaching years</small>
              </div>
              <div className="filter-pill-row">
                {filterData.experience.map((item) => (
                    <label key={item.id} className="filter-pill-in">
                      <input type="checkbox" />
                      <span>{item.name}</span>

                    </label>
                ))}
              </div>
            </div>

            <div className="filter-group-in">
              <div className="filter-title">
                <span>Students</span>
                <small>Learner range</small>
              </div>
              <div className="filter-pill-row">
                {filterData.students.map((item) => (
                    <label key={item.id} className="filter-pill-in">
                      <input type="checkbox" />
                      <span>{item.name}</span>

                    </label>
                ))}
              </div>
            </div>

            <div className="filter-group-in">
              <div className="filter-title">
                <span>Language</span>
                <small>{filterData.language.length} options</small>
              </div>
              <div className="filter-language-grid">
                {filterData.language.map((item) => (
                    <label key={item.id} className="filter-language">
                      <input type="checkbox" />

                      <span>{item.name}</span>

                    </label>
                ))}
              </div>
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
          {isLoading ? (
            <p className="instructors-loading">Loading instructors…</p>
          ) : instructors.length === 0 ? (
            <p className="instructors-loading">No instructors found yet.</p>
          ) : (
          <div className="instructors-grid-in">
            {instructors.map((instructor) => {
              return (
                <div key={instructor.id} className="instructor-card-in">
                  {/* Avatar */}
                  <div className="avatar-wrapper-in">
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
                  {instructor.bio && <p className="bio">{instructor.bio}</p>}

                  {/* Stats */}
                  <div className="rating-row">
                    <span className="rating-count">{instructor.stats.students} students</span>
                    <span className="rating-count">{instructor.stats.courses} courses</span>
                  </div>

                  {/* Buttons */}
                  <div className="card-actions">
                    <button
                        className="view-profile-btn"
                        onClick={() => navigate(`/learnova/intructorDetail/${instructor.id}`)}
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
          )}
        </main>
        <div className="chatbot-fixed">
          <LearnovaAI />
        </div>
      </div>
    </div>
  );
}
export default InstructorsPage;
