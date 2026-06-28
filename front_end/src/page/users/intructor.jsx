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
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import LearnovaAI from "../home/AI/AI.jsx";
import { getInstructorsApi } from "../../api/InstructorsApi.js";

function InstructorsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [instructors, setInstructors] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const [sortOption, setSortOption] = useState("Most Popular");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
      { id: 2, name: "Vietnamese", count: 98 }

    ],
  };

  const mapInstructorResponse = (instructor) => ({
    id: instructor.id,
    name: instructor.fullName || instructor.name || "Instructor",
    title: instructor.title || instructor.roleName || "Instructor",
    email: instructor.email,
    avatar: instructor.avatar || "avatar.png",
    coverImage: instructor.coverImage || "cover.png",
    badge: "verified",
    skills: instructor.skills
      ? instructor.skills.split(",").map((skill) => skill.trim())
      : ["Web Development", "React", "UI/UX"],
    rating: 4.9,
    reviews: 120,
    bio:
      instructor.bio ||
      (instructor.roleName
        ? `Giảng viên chuyên ngành ${instructor.roleName}.`
        : "Giảng viên giàu kinh nghiệm, sẵn sàng hỗ trợ học viên."),
    course: {
      icon: <BookOpen size={18} />,
      title: "Khóa học thực hành",
      subtitle: "Học qua dự án thực tế",
      students: "1.2K students",
      price: "$19.99",
    },
    studentsCount: instructor.studentsCount || 1200,
    createdAt: instructor.createdAt || instructor.joinedAt || null,
  });

  const normalizeTopic = (value) =>
    value?.toLowerCase().replace(/[^a-z0-9]+/g, "") || "";

  const isInstructorMatchingCategory = (instructor) => {
    if (selectedCategory === "Popular") return true;

    const normalizedCategory = normalizeTopic(selectedCategory);
    return instructor.skills.some((skill) =>
      normalizeTopic(skill).includes(normalizedCategory)
    );
  };

  const getStudentCount = (instructor) => {
    if (typeof instructor.studentsCount === "number") return instructor.studentsCount;
    const text = instructor.course?.students || "";
    const digits = text.replace(/[^0-9]/g, "");
    if (!digits) return 0;
    return parseInt(digits, 10);
  };

  const isInstructorMatchingExpertise = (instructor) => {
    if (!selectedExpertise.length) return true;
    return instructor.skills.some((skill) =>
      selectedExpertise.includes(skill)
    );
  };

  const isInstructorMatchingRating = (instructor) => {
    if (!selectedRating) return true;
    return instructor.rating >= selectedRating;
  };

  const sortInstructors = (list) => {
    return [...list].sort((a, b) => {
      if (sortOption === "Most Popular") {
        return getStudentCount(b) - getStudentCount(a);
      }
      if (sortOption === "Top Rated") {
        return b.rating - a.rating;
      }
      if (sortOption === "Most Students") {
        return getStudentCount(b) - getStudentCount(a);
      }
      if (sortOption === "Newest") {
        if (!a.createdAt || !b.createdAt) return 0;
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
  };

  const filteredInstructors = sortInstructors(
    instructors.filter(
      (instructor) =>
        isInstructorMatchingCategory(instructor) &&
        isInstructorMatchingExpertise(instructor) &&
        isInstructorMatchingRating(instructor)
    )
  );

  const toggleExpertise = (topicName) => {
    setSelectedExpertise((current) =>
      current.includes(topicName)
        ? current.filter((item) => item !== topicName)
        : [...current, topicName]
    );
  };

  useEffect(() => {
    const loadInstructors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getInstructorsApi();
        setInstructors(data.map(mapInstructorResponse));
      } catch (err) {
        console.error("Failed to load instructors", err);
        setError(
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "Không tải được dữ liệu giảng viên"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadInstructors();
  }, []);

  const getBadgeInfo = (badge) => {
    const badges = {
      verified: { class: "badge-verified", text: "Verified" },
      "top-rated": { class: "badge-top-rated", text: "Top Rated" },
      "best-seller": { class: "badge-best-seller", text: "Best Seller" },
      new: { class: "badge-new", text: "New" },
    };
    return badges[badge] || { class: "", text: "" };
  };

  if (isLoading) {
    return <div className="instructors-page">Đang tải dữ liệu giảng viên...</div>;
  }

  if (error) {
    return <div className="instructors-page">{error}</div>;
  }

  if (!isLoading && filteredInstructors.length === 0) {
    return (
      <div className="instructors-page">
        <div className="no-instructors-message">
          Không tìm thấy giảng viên phù hợp. Vui lòng kiểm tra lại dữ liệu hoặc trạng thái giảng viên.
        </div>
      </div>
    );
  }

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
                <small>
                  {selectedExpertise.length > 0
                    ? `${selectedExpertise.length} selected`
                    : `${filterData.expertise.length} topics`}
                </small>
              </div>
              <div className="filter-chip-grid">
                {filterData.expertise.map((item) => (
                    <label key={item.id} className="filter-chip-in">
                      <input
                        type="checkbox"
                        checked={selectedExpertise.includes(item.name)}
                        onChange={() => toggleExpertise(item.name)}
                      />
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
                      <input
                        type="radio"
                        name="rating"
                        value={item.value}
                        checked={selectedRating === item.value}
                        onChange={() => setSelectedRating(item.value)}
                      />
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
                  className={`tag ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <label className="sort-control">
              <span>Sort by:</span>
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
              >
                <option>Most Popular</option>
                <option>Top Rated</option>
                <option>Most Students</option>
                <option>Newest</option>
              </select>
            </label>
          </div>

          {/* INSTRUCTORS GRID */}
          <div className="instructors-grid-in">
            {filteredInstructors.map((instructor) => {
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
                        onClick={() => navigate("/learnova/user/intructorDetail")}
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
