import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    FaPlay, FaPlayCircle, FaClock, FaGraduationCap, FaCheckCircle,
    FaUserGraduate, FaGlobe, FaChevronDown, FaChevronUp, FaShoppingCart,
} from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { getCourseDetail, getFileUrl } from "../../../api/PublicCourseApi.js";
import { checkEnrollment } from "../../../api/EnrollmentApi.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import LearnovaAI from "../AI/AI.jsx";
import "./CourseDetail.css";

const formatDuration = (s) => {
    if (!s) return "0:00";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
};

const formatHours = (s) => {
    if (!s) return "0h";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (h > 0) return `${h}h ${m > 0 ? m + "m" : ""}`.trim();
    return `${m}m`;
};

export default function CourseDetailPreview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const [course, setCourse] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [instructorAvatarUrl, setInstructorAvatarUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    const [expandedSections, setExpandedSections] = useState([]);
    const [descExpanded, setDescExpanded] = useState(false);

    useEffect(() => {
        if (!id) return;
        const load = async () => {
            try {
                const data = await getCourseDetail(id);
                setCourse(data);
                if (data.sections?.length > 0) {
                    setExpandedSections([data.sections[0].sectionId]);
                }
                if (data.thumbnailKey) {
                    getFileUrl(data.thumbnailKey).then(setThumbnailUrl).catch(() => {});
                }
                if (data.instructor?.avatarKey) {
                    getFileUrl(data.instructor.avatarKey).then(setInstructorAvatarUrl).catch(() => {});
                }
            } catch (err) {
                console.error("Failed to load course:", err);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, [id]);

    useEffect(() => {
        if (!id) return;
        checkEnrollment(id).then(setEnrolled).catch(() => setEnrolled(false));
    }, [id, currentUser]);

    const toggleSection = (sectionId) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId) ? prev.filter((s) => s !== sectionId) : [...prev, sectionId]
        );
    };

    if (isLoading) {
        return (
            <div className="cdp__loading">Loading course...</div>
        );
    }

    if (!course) {
        return (
            <div className="cdp__loading">Course not found.</div>
        );
    }

    const descParagraphs = (course.description || "").split(/\n+/).filter(Boolean);
    const visibleParas = descExpanded ? descParagraphs : descParagraphs.slice(0, 3);

    return (
        <div className="cdp">
            {/* HERO */}
            <div className="cdp__hero">
                <div className="cdp__hero-inner">
                    <div className="cdp__breadcrumb">
                        {course.categoryName && <span>{course.categoryName}</span>}
                    </div>
                    <h1 className="cdp__hero-title">{course.title}</h1>
                    <div className="cdp__hero-meta">
                        <span className="cdp__hero-instructor">
                            <FaUserGraduate /> {course.instructor?.fullName}
                        </span>
                        <span className="cdp__hero-stat">
                            <FaPlayCircle /> {course.lessonCount} lessons
                        </span>
                        <span className="cdp__hero-stat">
                            <FaClock /> {formatHours(course.totalDurationSeconds)}
                        </span>
                        <span className="cdp__hero-stat">
                            <FaGraduationCap /> {course.level}
                        </span>
                        {course.language && (
                            <span className="cdp__hero-stat">
                                <FaGlobe /> {course.language}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="cdp__body">
                {/* LEFT */}
                <div className="cdp__left">

                    {/* What you'll learn */}
                    {course.whatYouLearn?.length > 0 && (
                        <section className="cdp__section">
                            <h2 className="cdp__section-title">What you'll learn</h2>
                            <ul className="cdp__learn-list">
                                {course.whatYouLearn.map((item, idx) => (
                                    <li key={idx}>
                                        <FaCheckCircle className="cdp__check-icon" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Description */}
                    {descParagraphs.length > 0 && (
                        <section className="cdp__section">
                            <h2 className="cdp__section-title">Course Description</h2>
                            <div className="cdp__desc">
                                {visibleParas.map((p, idx) => <p key={idx}>{p}</p>)}
                            </div>
                            {descParagraphs.length > 3 && (
                                <button className="cdp__toggle-btn" onClick={() => setDescExpanded(!descExpanded)}>
                                    {descExpanded ? <><FaChevronUp /> Show less</> : <><FaChevronDown /> Show more</>}
                                </button>
                            )}
                        </section>
                    )}

                    {/* Curriculum */}
                    {course.sections?.length > 0 && (
                        <section className="cdp__section">
                            <h2 className="cdp__section-title">Course Content</h2>
                            <p className="cdp__curriculum-meta">
                                {course.sections.length} sections · {course.lessonCount} lessons · {formatHours(course.totalDurationSeconds)} total
                            </p>
                            <div className="cdp__curriculum">
                                {course.sections.map((section, sIdx) => {
                                    const isOpen = expandedSections.includes(section.sectionId);
                                    const sectionDuration = section.lessons.reduce((s, l) => s + (l.durationSeconds || 0), 0);
                                    return (
                                        <div key={section.sectionId} className="cdp__section-item">
                                            <button
                                                className="cdp__section-header"
                                                onClick={() => toggleSection(section.sectionId)}
                                            >
                                                <ChevronDown size={16} className={`cdp__chevron ${isOpen ? "cdp__chevron--open" : ""}`} />
                                                <span className="cdp__section-name">{sIdx + 1}. {section.title}</span>
                                                <span className="cdp__section-info">
                                                    {section.lessons.length} lessons · {formatHours(sectionDuration)}
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <ul className="cdp__lesson-list">
                                                    {section.lessons.map((lesson) => (
                                                        <li key={lesson.lessonId} className="cdp__lesson-item">
                                                            <FaPlay className="cdp__play-icon" />
                                                            <span className="cdp__lesson-title">{lesson.title}</span>
                                                            {lesson.isPreview && (
                                                                <span className="cdp__preview-badge">Preview</span>
                                                            )}
                                                            <span className="cdp__lesson-duration">
                                                                {formatDuration(lesson.durationSeconds)}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Requirements */}
                    {course.requirements?.length > 0 && (
                        <section className="cdp__section">
                            <h2 className="cdp__section-title">Requirements</h2>
                            <ul className="cdp__req-list">
                                {course.requirements.map((r, idx) => (
                                    <li key={idx}>{r}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Instructor */}
                    <section className="cdp__section">
                        <h2 className="cdp__section-title">Instructor</h2>
                        <div className="cdp__instructor">
                            <div className="cdp__instructor-avatar">
                                {instructorAvatarUrl ? (
                                    <img src={instructorAvatarUrl} alt={course.instructor?.fullName} />
                                ) : (
                                    <div className="cdp__instructor-initials">
                                        {course.instructor?.fullName?.charAt(0) ?? "?"}
                                    </div>
                                )}
                            </div>
                            <div className="cdp__instructor-info">
                                <h3>{course.instructor?.fullName}</h3>
                            </div>
                        </div>
                    </section>
                </div>

                {/* RIGHT — Sticky card */}
                <aside className="cdp__sidebar">
                    <div className="cdp__card">
                        {thumbnailUrl ? (
                            <img src={thumbnailUrl} alt={course.title} className="cdp__card-thumb" />
                        ) : (
                            <div className="cdp__card-thumb cdp__card-thumb--placeholder" />
                        )}

                        <div className="cdp__card-body">
                            <div className="cdp__card-price">
                                ${course.basePrice ?? "0.00"}
                            </div>

                            {enrolled ? (
                                <>
                                    <button
                                        className="cdp__btn cdp__btn--primary"
                                        onClick={() => navigate(`/learnova/user/CoursesDetail/${id}`)}
                                    >
                                        <FaPlay /> Start Learning
                                    </button>
                                    <button className="cdp__btn cdp__btn--secondary">
                                        <FaShoppingCart /> Add to Cart
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="cdp__btn cdp__btn--primary">
                                        <FaShoppingCart /> Add to Cart
                                    </button>
                                    <button className="cdp__btn cdp__btn--outline">
                                        Subscribe
                                    </button>
                                </>
                            )}

                            <ul className="cdp__card-features">
                                <li><FaPlayCircle /> {course.lessonCount} lessons on-demand</li>
                                <li><FaClock /> {formatHours(course.totalDurationSeconds)} total</li>
                                <li><FaGraduationCap /> {course.level}</li>
                                {course.language && <li><FaGlobe /> {course.language}</li>}
                            </ul>
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
