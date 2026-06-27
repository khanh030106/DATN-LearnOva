import React, {useState} from 'react';
import './CourseDetail.css';
import {FaClipboardCheck} from "react-icons/fa";
import {FaPlay } from 'react-icons/fa';
import {ChevronDown} from 'lucide-react';
// import Header from "../../../../component/header/user_header/Header.jsx";
import Footer from "../../../../component/footer/footer-courseDetail/footer-courseDetail.jsx";
import {
    qaData,
    course,
    reviewsData,
    courseDescription,
    instructor,
    curriculum
} from "./mockCourseData.js";
import CourseVideoPlayer from "./VideoPlayer.jsx";
import OverviewTab from "./OverviewTab.jsx";
import QATab from "./QATab.jsx";
import ReviewsTab from "./Review.jsx";
import LearnovaAI from "../../../home/AI/AI.jsx";
import {FaPlayCircle, FaClock} from "react-icons/fa";
import QuizTab from "./QuizPage.jsx";
import QuizPage from "./QuizPage.jsx";
import Header from "../../../../component/header/user_header/Header.jsx";


function CourseDetail() {
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedSections, setExpandedSections] = useState([1]);
    const [activeVideo, setActiveVideo] = useState(1);
    const [expandedDescription, setExpandedDescription] = useState(false);


    // data

    const [reviewQuery, setReviewQuery] = useState('');
    const [ratingFilter, setRatingFilter] = useState('all'); // 'all' | 5 | 4 | ...
    const [currentReviewPage, setCurrentReviewPage] = useState(1);
    const reviewsPerPage = 5;
    const [helpfulMap, setHelpfulMap] = useState({});
    const handleSearchReviews = (e) => {
        setReviewQuery(e.target.value);
        setCurrentReviewPage(1);
    };

    const handleRatingFilter = (e) => {
        setRatingFilter(e.target.value);
        setCurrentReviewPage(1);
    };

    const toggleHelpful = (id) => {
        setHelpfulMap(prev => ({...prev, [id]: (prev[id] || 0) + 1}));
    };
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [savedQuestions, setSavedQuestions] = useState([]);
    const [showReplyForm, setShowReplyForm] = useState(false);

    const toggleSaveQuestion = (id) => {
        setSavedQuestions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const handleReplySubmit = (qId) => {
        if (!replyText.trim()) return;
        console.log('Gửi phản hồi cho question', qId, replyText);
        // TODO: gọi API hoặc cập nhật state local
        setReplyText('');
    };
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const toggleSection = (sectionId) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId]
        );
    };


    return (
        <div className="course-detail-container">
            {/*HEADER*/}
            <Header/>


            {/* MAIN LAYOUT */}
            <div className="main-layout">
                {/* LEFT SIDE - 70% */}
                <div className="left-side">
                    {/* VIDEO PLAYER */}
                    <CourseVideoPlayer/>

                    {/* TABS */}
                    <div className="tabs-container">
                        <div className="tabs-wrapper">
                            <button
                                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
                                onClick={() => setActiveTab('qa')}
                            >
                                Q&A
                            </button>

                            <button
                                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
                                onClick={() => setActiveTab('quiz')}
                            >
                                Quiz
                            </button>

                        </div>
                    </div>
                    {/* TAB CONTENT */}
                    <div className="content-section">

                        {activeTab === 'overview' && (
                            <OverviewTab
                                courseDescription={courseDescription}
                                instructor={instructor}
                                expandedDescription={expandedDescription}
                                setExpandedDescription={setExpandedDescription}
                            />
                        )}


                        {activeTab === "qa" && (
                            <QATab
                                qaData={qaData}
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
                        )}

                        {activeTab === "reviews" && (
                            <ReviewsTab
                                reviewsData={reviewsData}
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
                    {activeTab === "quiz" && (
                        <QuizPage/>
                    )}


                    <div className="footer-wrapper">
                        <Footer/>
                    </div>
                </div>

                {/* RIGHT SIDE - 30% */}
                <aside className="right-side">


                    <div className="curriculum-sidebar">
                        {curriculum.map(section => (
                            <div key={section.id} className="curriculum-section">
                                <div
                                    className="section-header-qa"
                                    onClick={() => toggleSection(section.id)}
                                >
                                    <ChevronDown
                                        size={18}
                                        className={`chevron ${
                                            expandedSections.includes(section.id) ? 'open' : ''
                                        }`}
                                    />
                                    <div className="section-title-co">
                                        <strong>{section.id}. {section.title}</strong>
                                        <div className="section-meta">
                                        <span>
                                            <FaPlayCircle/>
                                            {section.lectures} Lessons
                                        </span>

                                            <span>
                                            <FaClock/>{section.duration}
                                        </span>
                                        </div>
                                    </div>
                                </div>

                                {expandedSections.includes(section.id) && (
                                    <div className="lessons-sidebar">
                                        {section.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                className={`lesson-item ${
                                                    activeVideo === lesson.id ? "active" : ""
                                                }`}
                                                onClick={() => setActiveVideo(lesson.id)}
                                            >
                                                <div className="lesson-check">
                                                    <input
                                                        type="checkbox"
                                                        checked={lesson.watched}
                                                        readOnly
                                                    />
                                                </div>

                                                <div className="lesson-info">
                                                    <FaPlay className="lesson-icon"/>
                                                    <span className="lesson-name">
                                                        {lesson.title}
                                                    </span>
                                                </div>

                                                <span className="lesson-time">
                                                    {lesson.duration}
                                                </span>
                                            </div>
                                        ))}

                                        {/* Quiz cuối chương */}
                                        <div
                                            className="quiz-item"
                                            onClick={() => {
                                                setActiveTab("quiz");

                                                setTimeout(() => {
                                                    document
                                                        .querySelector(".tabs-container")
                                                        ?.scrollIntoView({
                                                            behavior: "smooth",
                                                            block: "start"
                                                        });
                                                }, 100);
                                            }}
                                        >
                                            <div className="quiz-icon-wrapper">
                                                <FaClipboardCheck className="quiz-icon"/>
                                            </div>

                                            <div className="quiz-content">
                                                <span className="quiz-title">
                                                    Quiz
                                                </span>

                                                <span className="quiz-subtitle-co">
                                                    10 Questions
                                                </span>
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
                <LearnovaAI/>
            </div>
        </div>
    );

}

export default CourseDetail;