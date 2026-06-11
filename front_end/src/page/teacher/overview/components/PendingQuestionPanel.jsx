import PanelHeader from "./PanelHeader.jsx";

const PendingQuestionPanel = ({ qaUrl, question }) => {
  if (!question) {
    return null;
  }

  return (
    <div className="teacher-panel">
      <PanelHeader actionLabel="View all" href={qaUrl} title="Pending Chat" />
      <article className="teacher-question-card">
        <img src={question.avatar} alt={question.student} />
        <div>
          <div className="teacher-question-card__top">
            <strong>{question.student}</strong>
            <time>{question.time}</time>
          </div>
          <small>Course: {question.course}</small>
          <p>"{question.question}"</p>
          <footer>
            <button>Reply</button>
            <button>Skip</button>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default PendingQuestionPanel;
