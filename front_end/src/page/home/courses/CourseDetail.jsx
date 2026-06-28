import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CourseDetail.css";
import LearnovaAI from "../AI/AI.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  FaRegHeart,
  FaShareSquare,
  FaVideo,
  FaFileDownload,
  FaInfinity,
  FaMobileAlt,
} from "react-icons/fa";
import { FaLightbulb, FaBullseye } from "react-icons/fa";
import { useAuth } from "../../../hook/UseAuth.jsx";
import { addStoredCartItem } from "../../../utils/cartStorage.js";
import { createPaymentApi } from "../../../api/PaymentApi.js";
import { applyVoucherApi } from "../../../api/VoucherApi.js";
import { useAxiosPrivate } from "../../../hook/UseAxiosPrivate.js";
import PaymentModal from "../../../component/payment/PaymentModal.jsx";
import { getPublicCourseByIdApi, getPublicCoursesApi } from "../../../api/CourseApi.js";

const courses = [
  {
    id: 1,
    title: "Fullstack Web Developer",
    teacher: "Tran Hoang Nam",
    subtitle: "Senior Web Developer",
    rating: 4.9,
    reviews: "12,450",
    students: "32,541",
    lessons: 128,
    duration: "32 hours",
    level: "Beginner to Advanced",
    certificate: "Yes, upon completion",
    language: "Vietnamese",
    price: "1.299.000đ",
    oldPrice: "1.699.000đ",
    description:
      "This Fullstack Web Developer course is designed to take you from zero to hero. Learn frontend, backend, databases and deployment.",
    learnings: [
      "HTML, CSS, JavaScript",
      "ReactJS & NodeJS",
      "RESTful API",
      "MongoDB & SQL",
      "Authentication & Security",
      "Real-world Projects",
    ],
    includes: [
      { icon: <FaReact />, text: "32 hours on-demand video" },
      { icon: <FaReact />, text: "128 downloadable resources" },
      { icon: <FaReact />, text: "Full lifetime access" },
      { icon: <FaReact />, text: "Access on mobile and TV" },
      { icon: <FaReact />, text: "Certificate of completion" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    ],
  },
];

const formatVnd = (value) => `${Number(value || 0).toLocaleString("vi-VN")}đ`;

const parseCoursePrice = (price) => {
  if (typeof price === "number") return price;

  const numericValue = Number(String(price).replace(/[^\d]/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
};

const mapPublicCourseDetail = (course) => ({
  id: course.courseId,
  title: course.title,
  teacher: course.instructorName || "LearnOva Instructor",
  subtitle: "Instructor",
  rating: 4.8,
  reviews: "0",
  students: "0",
  lessons: 0,
  duration: "Lifetime",
  level: course.level || "All levels",
  certificate: "Yes, upon completion",
  language: "Vietnamese",
  basePrice: Number(course.basePrice || 0),
  price: formatVnd(course.basePrice),
  oldPrice: "",
  description: course.description || "",
  learnings: [],
  includes: [
    { icon: <FaReact />, text: "Full lifetime access" },
    { icon: <FaReact />, text: "Access on mobile and TV" },
    { icon: <FaReact />, text: "Certificate of completion" },
  ],
  gallery: [
    course.thumbnailKey && String(course.thumbnailKey).startsWith("http")
      ? course.thumbnailKey
      : "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  ],
});

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
  const { accessToken, isAuthenticated, loading: authLoading } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [activePayment, setActivePayment] = useState(null);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [promo, setPromo] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherMessage, setVoucherMessage] = useState("");
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [dbCourse, setDbCourse] = useState(null);
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

  const mockCourse = useMemo(
    () => courses.find((item) => String(item.id) === String(id)),
    [id],
  );
  const course = dbCourse || mockCourse;
  const subtotal = course?.basePrice ?? parseCoursePrice(course?.price);
  const discount = Number(appliedVoucher?.discountAmount || 0);
  const total = Math.max(0, subtotal - discount);

  useEffect(() => {
    let mounted = true;

    getPublicCourseByIdApi(id)
      .then((data) => {
        if (mounted) setDbCourse(mapPublicCourseDetail(data));
      })
      .catch(async () => {
        try {
          const data = await getPublicCoursesApi();
          if (mounted && Array.isArray(data) && data.length > 0) {
            setDbCourse(mapPublicCourseDetail(data[0]));
          }
        } catch {
          if (mounted) setDbCourse(null);
        }
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    setPromo("");
    setAppliedVoucher(null);
    setVoucherMessage("");
    setIsAlreadyEnrolled(false);
  }, [id]);

  const handleVoucherChange = (event) => {
    setPromo(event.target.value);
    setAppliedVoucher(null);
    setVoucherMessage("");
  };

  const handleApplyVoucher = async () => {
    const code = promo.trim();

    if (!code) {
      setVoucherMessage("Vui lòng nhập mã voucher.");
      return;
    }

    if (!course || subtotal <= 0) {
      setVoucherMessage("Khóa học chưa có giá hợp lệ.");
      return;
    }

    if (appliedVoucher?.code?.toLowerCase() === code.toLowerCase()) {
      setVoucherMessage("Voucher này đã được áp dụng.");
      return;
    }

    try {
      setIsApplyingVoucher(true);
      setVoucherMessage("");
      const result = await applyVoucherApi({ code, subtotal });
      setAppliedVoucher(result);
      setVoucherMessage(`Đã áp dụng ${result.code}.`);
      toast.success("Áp dụng voucher thành công.");
    } catch (err) {
      setAppliedVoucher(null);
      const message =
        err?.response?.data?.message || "Voucher không hợp lệ hoặc không còn sử dụng được.";
      setVoucherMessage(message);
      toast.error(message);
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  const handleAlreadyEnrolled = (message) => {
    setIsAlreadyEnrolled(true);
    toast.info(message || "Bạn đã sở hữu khóa học này.");
    navigate("/learnova/user/profile/courses");
  };

  const handleAddToCart = () => {
    if (authLoading || !course) return;

    if (!isAuthenticated) {
      toast.error("Bạn cần đăng nhập để thêm khóa học vào giỏ hàng.");
      return;
    }

    if (!dbCourse) {
      toast.error("Khóa học này chưa có dữ liệu thật trong hệ thống.");
      return;
    }

    const { alreadyInCart } = addStoredCartItem({
      id: course.id,
      courseId: course.id,
      title: course.title,
      teacher: course.teacher,
      price: course.price,
      image: course.gallery[0],
    });

    if (alreadyInCart) {
      toast.info("Khóa học này đã có trong giỏ hàng.");
      return;
    }

    toast.success("Đã thêm khóa học vào giỏ hàng.");
  };

  const handleBuyNow = async () => {
    if (authLoading || !course) return;

    if (!isAuthenticated) {
      toast.error("Bạn cần đăng nhập để thanh toán.");
      return;
    }

    if (!dbCourse) {
      toast.error("Khóa học này chưa có dữ liệu thật trong hệ thống.");
      return;
    }

    try {
      setIsCreatingPayment(true);
      const payment = await createPaymentApi(
        axiosPrivate,
        {
          courseId: course.id,
          voucherCode: appliedVoucher?.code || null,
        },
        accessToken,
      );
      setActivePayment(payment);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Không thể tạo thanh toán payOS.";
      if (err?.response?.status === 409 && message.toLowerCase().includes("already enrolled")) {
        handleAlreadyEnrolled(message);
        return;
      }
      toast.error(message);
    } finally {
      setIsCreatingPayment(false);
    }
  };

  if (!course) {
    return (
      <div className="course-detail-page">
        <div className="course-detail-panel">
          <p>Course not found.</p>
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
                  <button type="button">
                    <FaRegHeart /> Wishlist
                  </button>
                  <button type="button">
                    <FaShareSquare /> Share
                  </button>
                </div>
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
                <span>{total.toLocaleString("vi-VN")}đ</span>
                {discount > 0 ? <span>{subtotal.toLocaleString("vi-VN")}đ</span> : <span>{course.oldPrice}</span>}
              </div>

              <div className="course-detail-order-lines">
                <div>
                  <span>Subtotal</span>
                  <strong>{subtotal.toLocaleString("vi-VN")}đ</strong>
                </div>
                <div>
                  <span>Discount</span>
                  <strong>-{discount.toLocaleString("vi-VN")}đ</strong>
                </div>
              </div>

              <div className="course-detail-voucher">
                <label htmlFor="course-detail-voucher">Voucher code</label>
                <div className="course-detail-voucher-input">
                  <input
                    id="course-detail-voucher"
                    type="text"
                    value={promo}
                    onChange={handleVoucherChange}
                    placeholder="Enter voucher"
                  />
                  <button type="button" onClick={handleApplyVoucher} disabled={isApplyingVoucher}>
                    {isApplyingVoucher ? "..." : "Apply"}
                  </button>
                </div>
                {voucherMessage ? (
                  <p className={`course-detail-voucher-message ${appliedVoucher ? "success" : "error"}`}>
                    {voucherMessage}
                  </p>
                ) : null}
              </div>

              <button
                className="summary-button primary"
                type="button"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              <button
                className="summary-button secondary"
                type="button"
                onClick={isAlreadyEnrolled ? () => navigate("/learnova/user/profile/courses") : handleBuyNow}
                disabled={isCreatingPayment}
              >
                {isAlreadyEnrolled ? "Go To My Learning" : isCreatingPayment ? "Creating payment..." : "Buy Now"}
              </button>

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
      {activePayment && (
        <PaymentModal
          payment={activePayment}
          onClose={() => setActivePayment(null)}
        />
      )}
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default CourseDetail;
