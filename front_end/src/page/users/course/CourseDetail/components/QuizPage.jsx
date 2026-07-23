import { useState } from "react";
import { useTranslation } from "react-i18next";
import { quizData } from "../mockCourseData.js";
import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import "../css/QuizPage.css";

function QuizPage() {
    const { t } = useTranslation();

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

    return(
        <button className="button-quiz">{t("courseDetail.quiz.generate")}</button>

    );


}

export default QuizPage;