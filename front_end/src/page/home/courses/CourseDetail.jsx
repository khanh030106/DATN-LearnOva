import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CourseDetail.css";
import LearnovaAI from "../AI/AI.jsx";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaBookmark, FaLink } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import {
  FaCode,
  FaReact,
  FaCloud,
  FaDatabase,
  FaLock,
  FaRocket,
  FaUsers,
  FaBook,
  FaClock,
  FaGraduationCap,
  FaCertificate,
  FaGlobe,
  FaHeart,
  FaRegHeart,
  FaShareSquare,
  FaVideo,
  FaFileDownload,
  FaInfinity,
  FaMobileAlt,
} from "react-icons/fa";
import { toast } from "../../../util/toast.js";
import {
  addToWishlistApi,
  getWishlistApi,
  removeFromWishlistApi,
} from "../../../api/WishlistApi.js";
import { useAuth } from "../../../hook/UseAuth.jsx";
import { FaLightbulb, FaBullseye } from "react-icons/fa";
import { getCourseByIdApi } from "../../../api/CourseApi.js";


const Curriculum = () => {
  const highlights = [
    {
      icon: <FaCode />,
      title: "Build responsive web interfaces",
      subtitle: "with HTML, CSS and JavaScript",
    },
    {
      icon: <FaReact />,
      title: "Create modern UIs with React",
      subtitle: "components and hooks",
    },
    {
      icon: <FaCloud />,
      title: "Work with RESTful APIs",
      subtitle: "and handle data effectively",
    },
    {
      icon: <FaDatabase />,
      title: "Design and manage databases",
      subtitle: "using PostgreSQL",
    },
    {
      icon: <FaLock />,
      title: "Implement authentication",
      subtitle: "and authorization (JWT)",
    },
    {
      icon: <FaRocket />,
      title: "Deploy applications",
      subtitle: "to cloud platforms with confidence",
    },
  ];

  const roadmap = [
    { title: "Web Fundamentals", lessons: 8, duration: "1h 24m" },
    { title: "JavaScript Essentials", lessons: 12, duration: "2h 10m" },
    { title: "React Core", lessons: 15, duration: "4h 30m" },
    { title: "Working with APIs", lessons: 10, duration: "2h 20m" },
    { title: "Databases with PostgreSQL", lessons: 8, duration: "2h 00m" },
    { title: "Authentication & Security", lessons: 6, duration: "1h 40m" },
    { title: "Deployment & DevOps", lessons: 6, duration: "2h 10m" },
    { title: "Real-world Project", lessons: 3, duration: "2h 00m" },
  ];

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "REST API",
    "PostgreSQL",
    "JWT",
    "Git",
    "Docker",
    "AWS",
  ];

  return (
    <div className="curriculum-page">
      <div className="curriculum-top">
        <div className="learn-card-grid">
          {highlights.map((item, idx) => (
            <div key={idx} className="learn-card">
              <div className="learn-card-head">
                <span className="learn-card-icon">{item.icon}</span>
                <span className="learn-card-check">✓</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="curriculum-roadmap">
        <div className="roadmap-header">
          <div>
            <p className="roadmap-label">Course roadmap</p>
            <h3>8 sections · 68 lessons · ~18 hours total</h3>
          </div>
          <button className="roadmap-expand" type="button">
            Expand all
          </button>
        </div>

        <div className="roadmap-table">
          {roadmap.map((item, idx) => (
            <div key={idx} className="roadmap-row">
              <div className="roadmap-index">{idx + 1}</div>
              <div className="roadmap-info">
                <p className="roadmap-section">
                  <span className="roadmap-toggle">›</span>
                  {item.title}
                </p>
              </div>
              <div className="roadmap-meta">
                <span>{item.lessons} lessons</span>
                <span>{item.duration}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="skills-gain">
          <p className="skills-heading">Skills you'll gain</p>
          <div className="skills-list">
            {skills.map((skill, idx) => (
              <span key={idx} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseDetail = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [reviews, setReviews] = useState([
    {
      name: "Nguyen An",
      role: "Software Engineer",
      rating: 5,
      likes: 24,
      avatar: "NA",
      text: "Khóa học giúp tôi xây dựng các dự án thực tế và tìm được công việc lập trình đầu tiên.",
    },
    {
      name: "Le Thi Mai",
      role: "Frontend Developer",
      rating: 4,
      likes: 12,
      avatar: "LM",
      text: "Bài giảng rõ ràng, dễ hiểu. Giảng viên giải thích các chủ đề khó rất tốt.",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const handleSubmitReview = () => {
    if (!newComment.trim()) return;

    const review = {
      name: "You",
      role: "Student",
      rating: newRating,
      likes: 0,
      avatar: "YO",
      text: newComment,
    };

    setReviews([review, ...reviews]);

    setNewComment("");
    setNewRating(5);
  };
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMockCourse, setIsMockCourse] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      setIsMockCourse(false);

      try {
        const data = await getCourseByIdApi(id);
        if (!mounted) return;

        const mapped = {
          id: data.id,
          title: data.title || "Untitled course",
          teacher: data.instructorName || "Unknown instructor",
          subtitle: null,
          rating: data.rating || 0,
          reviews: data.reviews || 0,
          students: data.students || 0,
          lessons: data.lessonCount || 0,
          duration: data.duration || "",
          level: data.level || "",
          certificate: data.publishedAt ? "Yes" : "No",
          language: data.language || "",
          price: data.basePrice ? String(data.basePrice) : "Free",
          oldPrice: null,
          description: data.description || "",
          learnings: data.whatYouLearn || [],
          includes: [],
          gallery: data.thumbnailKey ? [data.thumbnailKey] : [],
        };

        setCourse(mapped);

        if (isAuthenticated) {
          try {
            const savedWishlist = await getWishlistApi();
            if (!mounted) return;
            setWishlist(savedWishlist.map((courseItem) => courseItem.id));
          } catch (wishlistError) {
            console.warn("Failed to load wishlist for authenticated user", wishlistError);
          }
        } else {
          setWishlist([]);
        }
      } catch (err) {
        setError(err?.response?.data || err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();

    return () => {
      mounted = false;
    };
  }, [id, isAuthenticated]);

  if (loading) {
    return (
      <div className="course-detail-page">
        <div className="course-detail-panel">Loading course...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-detail-page">
        <div className="course-detail-panel">
          <p>Course not found.</p>
          <p style={{color: 'red'}}>{error && typeof error === 'string' ? error : ''}</p>
          <button
            onClick={() => navigate("/learnova/home")}
            className="course-detail-back"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <div className="course-detail-panel">
        <div className="course-detail-grid">
          <div className="course-detail-left">
            <div className="course-detail-card">
              <div className="course-detail-media-section">
                <div className="course-detail-media">
                  <img src={course.gallery[0]} alt={course.title} />
                </div>

                <div className="course-detail-info">
                  <div>
                    <FaBook /> {course.lessons} Lessons
                  </div>
                  <div>
                    <FaClock /> {course.duration}
                  </div>
                  <div>
                    <FaGraduationCap /> {course.level}
                  </div>
                  <div>
                    <FaCertificate /> {course.certificate}
                  </div>
                  <div>
                    <FaGlobe /> {course.language}
                  </div>
                </div>

                <div className="course-detail-actions">
                  <button
                    type="button"
                    disabled={isMockCourse}
                    className="wishlist-button"
                    onClick={async () => {
                      if (isMockCourse) {
                        toast.info("This demo course cannot be added to wishlist.");
                        return;
                      }

                      if (!isAuthenticated) {
                        toast.error("Please log in to add courses to your wishlist.");
                        return;
                      }

                      try {
                        if (wishlist.includes(course.id)) {
                          await removeFromWishlistApi(course.id);
                          setWishlist((prev) => prev.filter((id) => id !== course.id));
                          window.dispatchEvent(
                            new CustomEvent("wishlist:removed", {
                              detail: { title: course.title, courseId: course.id },
                            }),
                          );
                        } else {
                          await addToWishlistApi(course.id);
                          setWishlist((prev) => [...prev, course.id]);
                          window.dispatchEvent(
                            new CustomEvent("wishlist:added", {
                              detail: { title: course.title, courseId: course.id },
                            }),
                          );
                        }
                      } catch (error) {
                        console.error(error);
                        toast.error("Failed to update wishlist.");
                      }
                    }}
                  >
                    {wishlist.includes(course?.id) ? (
                      <FaHeart className="wishlist-icon active" />
                    ) : (
                      <FaRegHeart className="wishlist-icon" />
                    )}
                    <span>Wishlist</span>
                  </button>
                  <button type="button">
                    <FaShareSquare /> Share
                  </button>
                </div>
                {isMockCourse && (
                  <p className="course-detail-demo-note">
                    This course is rendered from local demo data and is not connected to the backend.
                  </p>
                )}
              </div>

              <div className="course-detail-meta">
                <h1>{course.title}</h1>
                <p>{course.description}</p>

                <div className="course-detail-instructor-card">
                  <img src="https://i.pravatar.cc/100" alt={course.teacher} />
                  <div className="course-detail-instructor-info">
                    <h4>{course.teacher}</h4>
                    <p>{course.subtitle}</p>
                  </div>
                </div>

                <div className="course-detail-stats-grid">
                  <div className="stat-card">
                    <div className="stat-card-value">{course.rating}★</div>
                    <div className="stat-card-label">Rating</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-card-value">{course.reviews}</div>
                    <div className="stat-card-label">Reviews</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-card-value">{course.students}</div>
                    <div className="stat-card-label">Students</div>
                  </div>
                </div>

                <div className="course-highlight-box">
                  <p>
                    <strong>✓ Giảng viên chuyên nghiệp</strong> với 15+ năm kinh nghiệm
                  </p>
                  <p>
                    <strong>✓ Chứng chỉ hoàn thành</strong> được công nhận
                  </p>
                  <p>
                    <strong>✓ Truy cập suốt đời</strong> vào toàn bộ nội dung
                  </p>
                </div>
              </div>
            </div>

            <div className="course-detail-tabs">
              <div className="tabs-row">
                <button
                  className={`tab-button ${activeTab === "Overview" ? "active" : ""}`}
                  onClick={() => setActiveTab("Overview")}
                >
                  Overview
                </button>
                <button
                  className={`tab-button ${activeTab === "Curriculum" ? "active" : ""}`}
                  onClick={() => setActiveTab("Curriculum")}
                >
                  Curriculum
                </button>
                <button
                  className={`tab-button ${activeTab === "Instructor" ? "active" : ""}`}
                  onClick={() => setActiveTab("Instructor")}
                >
                  Instructor
                </button>
                <button
                  className={`tab-button ${activeTab === "Reviews" ? "active" : ""}`}
                  onClick={() => setActiveTab("Reviews")}
                >
                  Reviews
                </button>
              </div>

              <div className="tab-content">
                {activeTab === "Overview" && (
                  <>
                    <h2>About this course</h2>
                    <p>{course.description}</p>

                    <h2>What you'll learn</h2>
                    <p>
                      By the end of this course, you'll be able to build
                      full-stack web applications using modern tools and
                      industry best practices.
                    </p>
                  </>
                )}

                {activeTab === "Curriculum" && <Curriculum />}

                {activeTab === "Instructor" && (
                  <div className="instructor-section">
                    <div className="instructor-card">
                      <div className="instructor-avatar">
                        <img
                          src="https://i.pravatar.cc/200"
                          alt={course.teacher}
                        />
                      </div>
                      <div className="instructor-info">
                        <h3>{course.teacher}</h3>
                        <p className="instructor-subtitle">{course.subtitle}</p>
                        <div className="instructor-stats">
                          <div className="stat-item">
                            <span className="stat-number">15+</span>
                            <span className="stat-label">Years Experience</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-number">50K+</span>
                            <span className="stat-label">Students</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-number">4.9★</span>
                            <span className="stat-label">Avg Rating</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="instructor-bio">
                      <h4>About the Instructor</h4>
                      <p>
                        With 15+ years of experience in full-stack web
                        development, {course.teacher} has trained over 50,000
                        students worldwide. Passionate about making complex
                        concepts simple and accessible, helping thousands
                        transition into tech careers.
                      </p>
                      <p>
                        Specializing in React, Node.js, and modern web
                        technologies, brings real-world industry experience into
                        every lesson, ensuring students learn practical skills
                        used in production environments.
                      </p>
                    </div>

                    <div className="instructor-teaching">
                      <h4>Teaching Approach</h4>

                      <div className="teaching-list">
                        <div className="teaching-item">
                          <span className="teaching-icon">
                            <FaBook />
                          </span>
                          <div>
                            <h5>Project-Based Learning</h5>
                            <p>
                              Learn by building real-world applications from
                              scratch
                            </p>
                          </div>
                        </div>
                        <div className="teaching-item">
                          <span className="teaching-icon">
                            <FaLightbulb />
                          </span>
                          <div>
                            <h5>Best Practices</h5>
                            <p>Industry standards and clean code principles</p>
                          </div>
                        </div>

                        <div className="teaching-item">
                          <span className="teaching-icon">
                            <FaBullseye />
                          </span>
                          <div>
                            <h5>Career Focused</h5>
                            <p>Structured content designed for job readiness</p>
                          </div>
                        </div>

                        <div className="teaching-item">
                          <span className="teaching-icon">
                            <FaUsers />
                          </span>
                          <div>
                            <h5>Community Support</h5>
                            <p>Active Q&A and continuous student support</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Reviews" && (
                  <div className="review-section">

                    {/* FORM COMMENT */}

                    <div className="review-form-card">
                      <h3>Viết đánh giá của bạn</h3>

                      <div className="review-rating-picker">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={
                              star <= newRating
                                ? "review-star active"
                                : "review-star"
                            }
                            onClick={() => setNewRating(star)}
                          />
                        ))}
                      </div>

                      <textarea
                        placeholder="Chia sẻ trải nghiệm học tập..."
                        value={newComment}
                        onChange={(e) =>
                          setNewComment(e.target.value)
                        }
                      />
                    </div>

                    {/* REVIEW LIST */}

                    <div className="review-grid">
                      {reviews.map((review, index) => (
                        <article
                          key={index}
                          className="review-card"
                        >
                          <div className="review-header">

                            <div className="review-user">
                              <div className="review-avatar">
                                {review.avatar}
                              </div>

                              <div>
                                <h4>{review.name}</h4>
                                <span>{review.role}</span>
                              </div>
                            </div>

                            <div className="review-stars">
                              {[...Array(5)].map((_, i) =>
                                i < review.rating ? (
                                  <FaStar key={i} />
                                ) : (
                                  <FaRegStar key={i} />
                                )
                              )}
                            </div>

                          </div>

                          <p className="review-text">
                            {review.text}
                          </p>
                        </article>
                      ))}
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="course-detail-sidebar">
            <div className="course-detail-summary">
              <div className="course-detail-price">
                <span>{course.price}</span>
                <span>{course.oldPrice}</span>
              </div>

              <button className="summary-button primary">Add To Cart</button>
              <button className="summary-button secondary">Buy Now</button>

              <div className="summary-features">
                <p>✓ Full lifetime access</p>
                <p>✓ Mobile & TV access</p>
                <p>✓ Certificate of completion</p>
                <p>✓ 30-day money-back guarantee</p>
              </div>
            </div>

            <div className="course-includes-card">
              <h3>This course includes:</h3>
              <div className="includes-list">
                {course.includes.map((item, index) => (
                  <div key={index} className="include-item">
                    <span className="include-text">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="course-support-card">
              <h3>Have questions?</h3>
              <p>Our support team is here to help you.</p>

              <button className="support-button">
                <FaPhoneAlt />
                <span>Contact Support</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
      <div className="chatbot-fixed">
        <LearnovaAI />
      </div>
    </div>
  );
};

export default CourseDetail;
