import { questions } from "../data/teacherDashboardData.js";
import QuestionItem from "./components/QuestionItem.jsx";
import "./QaPage.css";

const QaPage = () => {
  return (
    <section className="teacher-page">
      <div className="teacher-qa-list">
        {questions.map((question) => (
          <QuestionItem key={question.student} question={question} />
        ))}
      </div>
    </section>
  );
};

export default QaPage;
