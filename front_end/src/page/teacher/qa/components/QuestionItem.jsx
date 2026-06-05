const QuestionItem = ({ question }) => {
  return (
    <article className="teacher-qa-item">
      <img src={question.avatar} alt={question.student} />
      <div>
        <header>
          <strong>{question.student}</strong>
          <time>{question.time}</time>
        </header>
        <span>Course: {question.course}</span>
        <p>"{question.question}"</p>
        <footer>
          <button>Reply</button>
          <button>Skip</button>
        </footer>
      </div>
    </article>
  );
};

export default QuestionItem;
