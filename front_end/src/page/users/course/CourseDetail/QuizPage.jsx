import { useState } from "react";
import { quizData } from "./mockCourseData.js";
import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import "./QuizPage.css";

function QuizPage() {

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [selectedAnswers, setSelectedAnswers] = useState({});

    const question = quizData.questions[currentQuestion];

    const progress =
        ((currentQuestion + 1) /
            quizData.questions.length) *
        100;

    const handleSelectAnswer = (index) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [question.id]: index
        });
    };

    const nextQuestion = () => {
        if (
            currentQuestion <
            quizData.questions.length - 1
        ) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    return (
        <div className="quiz-page">

            {/* HEADER */}

            <div className="quiz-header">

                <div className="quiz-progress">

                    <span>
                        Sentence {currentQuestion + 1} /
                        {quizData.questions.length}
                    </span>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${progress}%`
                            }}
                        />
                    </div>
                </div>

                <div className="quiz-timer">
                    <FaRegClock />
                    <span>20:00</span>
                </div>
            </div>

            {/* QUESTION */}

            <div className="quiz-card">

                <h2 className="quiz-question">
                    {question.question}
                </h2>

                <p className="quiz-subtitle">
                    Choose the correct answer.
                </p>

                <div className="quiz-options">

                    {question.options.map((option, index) => (

                        <div
                            key={index}
                            className={`quiz-option ${
                                selectedAnswers[question.id] === index
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => handleSelectAnswer(index)}
                        >

                            <div className="option-letter">
                                {String.fromCharCode(65 + index)}
                            </div>

                            <span>{option}</span>

                            {selectedAnswers[question.id] === index && (
                                <div className="selected-check">
                                    <FaCheck />
                                </div>
                            )}

                        </div>

                    ))}

                </div>

                <div className="quiz-footer">

                    <button
                        className="btn-prev"
                        onClick={prevQuestion}
                    >
                        ← Previous sentence
                    </button>

                    <button
                        className="btn-next"
                        onClick={nextQuestion}
                    >
                        Next sentence →
                    </button>

                </div>
            </div>

        </div>
    );
}

export default QuizPage;