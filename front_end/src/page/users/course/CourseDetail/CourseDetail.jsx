import "./CourseDetail.css";
import { FaClipboardCheck, FaPlay, FaPlayCircle, FaClock } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../../../component/footer/footer-courseDetail/footer-courseDetail.jsx";
import CourseVideoPlayer from "./VideoPlayer.jsx";
import OverviewTab from "./OverviewTab.jsx";
import QATab from "./QATab.jsx";
import ReviewsTab from "./Review.jsx";
import LearnovaAI from "../../../home/AI/AI.jsx";
import QuizPage from "./QuizPage.jsx";
import Header from "../../../../component/header/user_header/Header.jsx";
import { getCourseReviewsApi, deleteReviewApi, getRatingSummaryApi } from "../../../../api/ReviewApi.js";
import { getCourseDetail, getFileUrl } from "../../../../api/PublicCourseApi.js";
import { qaData } from "./mockCourseData.js";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useParams } from "react-router-dom";

const formatDuration = (totalSeconds) => {
    if (!totalSeconds) return "0:00";
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${m}:${String(s).padStart(2, "0")}`;
};

function CourseDetail() {
    const { courseId } = useParams();
    const reviewsPerPage = 3;

    const [course, setCourse] = useState(null);
    const [instructorAvatarUrl, setInstructorAvatarUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [videoUrl, setVideoUrl] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [loadingVideo, setLoadingVideo] = useState(false);

    const [reviewsData, setReviewsData] = useState([]);
    const [ratingSummary, setRatingSummary] = useState(null);

    const [activeTab, setActiveTab] = useState("overview");
    const [expandedSections, setExpandedSections] = useState([]);
    const [expandedDescription, setExpandedDescription] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const currentUserId = currentUser?.id || currentUser?.userId || currentUser?.idUser;

    const [reviewQuery, setReviewQuery] = useState("");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [currentReviewPage, setCurrentReviewPage] = useState(1);
    const [helpfulMap, setHelpfulMap] = useState({});

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showQuestionForm, setShowQuestionForm] = useState(false);

    useEffect(() => {
        if (!courseId) return;
        const load = async () => {
            try {
                const data = await getCourseDetail(courseId);
                setCourse(data);

                if (data.sections?.length > 0) {
                    setExpandedSections([data.sections[0].sectionId]);
                }

                if (data.instructor?.avatarKey) {
                    getFileUrl(data.instructor.avatarKey)
                        .then(setInstructorAvatarUrl)
                        .catch(() => {});
                }

                const firstLesson = data.sections
                    ?.flatMap((s) => s.lessons)
                    ?.find((l) => l.videoKey);

                if (firstLesson) {
                    setActiveLesson(firstLesson);
                    setLoadingVideo(true);
                    getFileUrl(firstLesson.videoKey)
                        .then(setVideoUrl)
                        .catch(() => {})
                        .finally(() => setLoadingVideo(false));
                }
            } catch (err) {
                console.error("Failed to load course:", err);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, [courseId]);

    useEffect(() => {
        if (!courseId) return;
        getCourseReviewsApi(courseId).then(setReviewsData).catch(console.error);
        getRatingSummaryApi(courseId).then(setRatingSummary).catch(console.error);
    }, [courseId]);

    const handleLessonClick = useCallback(async (lesson) => {
        if (!lesson.videoKey || lesson.lessonId === activeLesson?.lessonId) return;
        setActiveLesson(lesson);
        setLoadingVideo(true);
        setVideoUrl(null);
        try {
            const url = await getFileUrl(lesson.videoKey);
            setVideoUrl(url);
        } catch (err) {
            console.error("Failed to load video:", err);
        } finally {
            setLoadingVideo(false);
        }
    }, [activeLesson]);

    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReviewApi(reviewId);
            setReviewsData((prev) => prev.filter((item) => item.reviewId !== reviewId));
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const toggleSection = (sectionId) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
        );
    };

    const handleSearchReviews = (e) => { setReviewQuery(e.target.value); setCurrentReviewPage(1); };
    const handleRatingFilter = (e) => { setRatingFilter(e.target.value); setCurrentReviewPage(1); };
    const toggleHelpful = (id) => setHelpfulMap((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const handleReplySubmit = (qId) => { if (!replyText.trim()) return; setReplyText(""); };

    if (isLoading) {
        return (
            <div className="course-detail-container">
                <Header />
                <div style={{ textAlign: "center", padding: "80px", color: "#94a3b8", fontSize: "15px" }}>
                    Loading course...
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="course-detail-container">
                <Header />
                <div style={{ textAlign: "center", padding: "80px", color: "#94a3b8", fontSize: "15px" }}>
                    Course not found.
                </div>
            </div>
        );
    }

    return (
        <div className="course-detail-container">
            <Header />

            <div className="main-layout">
                {/* LEFT SIDE */}
                <div className="left-side">
                    <CourseVideoPlayer src={videoUrl} loading={loadingVideo} />
                    <ToastContainer />

                    <div className="tabs-container">
                        <div className="tabs-wrapper">
                            <button className={`tab-btn ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>Overview</button>
                            <button className={`tab-btn ${activeTab === "qa" ? "active" : ""}`} onClick={() => setActiveTab("qa")}>Q&A</button>
                            <button className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`} onClick={() => setActiveTab("reviews")}>Reviews</button>
                            <button className={`tab-btn ${activeTab === "quiz" ? "active" : ""}`} onClick={() => setActiveTab("quiz")}>Quiz</button>
                        </div>
                    </div>

                    <div className="content-section">
                        {activeTab === "overview" && (
                            <OverviewTab
                                course={course}
                                instructor={course.instructor}
                                instructorAvatarUrl={instructorAvatarUrl}
                                expandedDescription={expandedDescription}
                                setExpandedDescription={setExpandedDescription}
                            />
                        )}

                        <QATab
                            lessonId={activeLesson?.lessonId}
                            course={course}
                            selectedQuestion={selectedQuestion}
                            setSelectedQuestion={setSelectedQuestion}
                            showQuestionForm={showQuestionForm}
                            setShowQuestionForm={setShowQuestionForm}
                            showReplyForm={showReplyForm}
                            setShowReplyForm={setShowReplyForm}
                            replyText={replyText}
                            setReplyText={setReplyText}
                            handleReplySubmit={handleReplySubmit}
                        />

                        {activeTab === "reviews" && (
                            <ReviewsTab
                                reviewsData={reviewsData}
                                setReviewsData={setReviewsData}
                                currentUserId={currentUserId}
                                ratingSummary={ratingSummary}
                                handleDeleteReview={handleDeleteReview}
                                reviewQuery={reviewQuery}
                                setReviewQuery={setReviewQuery}
                                ratingFilter={ratingFilter}
                                setRatingFilter={setRatingFilter}
                                currentReviewPage={currentReviewPage}
                                setCurrentReviewPage={setCurrentReviewPage}
                                reviewsPerPage={reviewsPerPage}
                                helpfulMap={helpfulMap}
                                toggleHelpful={toggleHelpful}
                                handleSearchReviews={handleSearchReviews}
                                handleRatingFilter={handleRatingFilter}
                            />
                        )}
                    </div>

                    {activeTab === "quiz" && <QuizPage />}

                    <div className="footer-wrapper">
                        <Footer />
                    </div>
                </div>

                {/* RIGHT SIDE - Curriculum */}
                <aside className="right-side">
                    <div className="curriculum-sidebar">
                        {course.sections.map((section, sIdx) => (
                            <div key={section.sectionId} className="curriculum-section">
                                <div className="section-header-qa" onClick={() => toggleSection(section.sectionId)}>
                                    <ChevronDown
                                        size={18}
                                        className={`chevron ${expandedSections.includes(section.sectionId) ? "open" : ""}`}
                                    />
                                    <div className="section-title-co">
                                        <strong>{sIdx + 1}. {section.title}</strong>
                                        <div className="section-meta">
                                            <span>
                                                <FaPlayCircle />
                                                {section.lessons.length} Lessons
                                            </span>
                                            <span>
                                                <FaClock />
                                                {formatDuration(
                                                    section.lessons.reduce((sum, l) => sum + (l.durationSeconds || 0), 0)
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {expandedSections.includes(section.sectionId) && (
                                    <div className="lessons-sidebar">
                                        {section.lessons.map((lesson) => (
                                            <div
                                                key={lesson.lessonId}
                                                className={`lesson-item ${activeLesson?.lessonId === lesson.lessonId ? "active" : ""}`}
                                                onClick={() => handleLessonClick(lesson)}
                                                style={{ cursor: lesson.videoKey ? "pointer" : "default" }}
                                            >
                                                <div className="lesson-info">
                                                    <FaPlay className="lesson-icon" />
                                                    <span className="lesson-name">{lesson.title}</span>
                                                </div>
                                                <span className="lesson-time">
                                                    {formatDuration(lesson.durationSeconds)}
                                                </span>
                                            </div>
                                        ))}

                                        <div
                                            className="quiz-item"
                                            onClick={() => {
                                                setActiveTab("quiz");
                                                setTimeout(() => {
                                                    document.querySelector(".tabs-container")?.scrollIntoView({ behavior: "smooth", block: "start" });
                                                }, 100);
                                            }}
                                        >
                                            <div className="quiz-icon-wrapper">
                                                <FaClipboardCheck className="quiz-icon" />
                                            </div>
                                            <div className="quiz-content">
                                                <span className="quiz-title">Quiz</span>
                                                <span className="quiz-subtitle-co">10 Questions</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            <div className="chatbot-fixed">
                <LearnovaAI />
            </div>
        </div>
    );
}

export default CourseDetail;
