import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

import { getQuizApi, generateQuizApi, submitQuizApi } from "../../../../api/QuizApi";

import "./QuizPage.css";

const LETTERS = ["A", "B", "C", "D"];

function QuizPage({ lessonId }) {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleGenerate = async () => {
        if (!lessonId) return;

        setLoading(true);
        setError("");

        try {
            const data = await generateQuizApi(lessonId);
            setQuiz(data);
        } catch (e) {
            console.log(e);
            setError(e.response?.data?.message || "Failed to generate quiz. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!lessonId) return;

        setQuiz(null);
        setResult(null);
        setSelectedAnswers({});
        setCurrentQuestion(0);
        setError("");

        const loadOrGenerateQuiz = async () => {
            try {
                const data = await getQuizApi(lessonId);
                setQuiz(data);
                return;
            } catch (e) {
                if (e.response?.status !== 404) {
                    console.log(e);
                    return;
                }
            }

            // No quiz exists yet for this lesson: generate it automatically
            // instead of making the first viewer click a button.
            await handleGenerate();
        };

        loadOrGenerateQuiz();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonId]);

    const handleSelectAnswer = (questionId, optionId) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId });
    };

    const nextQuestion = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setError("");

        try {
            const answers = quiz.questions.map((q) => ({
                questionId: q.questionId,
                selectedOptionId: selectedAnswers[q.questionId] ?? null,
            }));

            const data = await submitQuizApi(lessonId, answers);
            setResult(data);
        } catch (e) {
            console.log(e);
            setError(e.response?.data?.message || "Failed to submit quiz. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRetry = () => {
        setResult(null);
        setSelectedAnswers({});
        setCurrentQuestion(0);
    };

    if (!quiz) {
        return (
            <div className="quiz-page">
                <div className="quiz-card" style={{ textAlign: "center" }}>
                    {error ? (
                        <>
                            <p style={{ color: "#dc2626", marginBottom: "14px" }}>{error}</p>
                            <button className="btn-next" onClick={handleGenerate} disabled={!lessonId || loading}>
                                {loading ? "Generating..." : "Try again"}
                            </button>
                        </>
                    ) : (
                        <p className="quiz-subtitle">
                            {loading ? "Generating your quiz..." : "Preparing quiz for this lesson..."}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    if (result) {
        const percent = Math.round((result.score / result.totalQuestions) * 100);

        return (
            <div className="quiz-page">
                <div className="quiz-card">
                    <div className="quiz-result">
                        <h2>Quiz Result</h2>
                        <div className="quiz-score">{percent}%</div>
                        <p>
                            You answered {result.score} out of {result.totalQuestions} questions correctly.
                        </p>

                        <button className="btn-next" style={{ marginTop: "24px" }} onClick={handleRetry}>
                            Retake quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const question = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
    const isLastQuestion = currentQuestion === quiz.questions.length - 1;

    return (
        <div className="quiz-page">
            <div className="quiz-card">
                <div className="quiz-header">
                    <div className="quiz-progress">
                        <span>
                            Question {currentQuestion + 1} / {quiz.questions.length}
                        </span>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>

                <div className="quiz-question">{question.questionText}</div>

                <div className="quiz-options">
                    {question.options.map((option, i) => {
                        const isActive = selectedAnswers[question.questionId] === option.optionId;
                        return (
                            <div
                                key={option.optionId}
                                className={`quiz-option ${isActive ? "active" : ""}`}
                                onClick={() => handleSelectAnswer(question.questionId, option.optionId)}
                            >
                                <span className="option-letter">{LETTERS[i]}</span>
                                <span>{option.optionText}</span>
                                {isActive && (
                                    <span className="selected-check">
                                        <FaCheck />
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {error && <p style={{ color: "#dc2626", marginTop: "14px" }}>{error}</p>}

                <div className="quiz-footer">
                    <button className="btn-prev" onClick={prevQuestion} disabled={currentQuestion === 0}>
                        Previous
                    </button>

                    {isLastQuestion ? (
                        <button className="btn-next" onClick={handleSubmit} disabled={submitting}>
                            {submitting ? "Submitting..." : "Submit"}
                        </button>
                    ) : (
                        <button className="btn-next" onClick={nextQuestion}>
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuizPage;
