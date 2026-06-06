import { useState } from "react";

const QuestionItem = ({ question }) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [reply, setReply] = useState("");

  const handleSubmitReply = (event) => {
    event.preventDefault();
    setReply("");
    setIsReplyOpen(false);
  };

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
          <button type="button" onClick={() => setIsReplyOpen((current) => !current)}>
            Reply
          </button>
          <button>Skip</button>
        </footer>

        {isReplyOpen && (
          <form className="teacher-qa-reply" onSubmit={handleSubmitReply}>
            <textarea
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              placeholder={`Reply to ${question.student}...`}
              rows={4}
              autoFocus
            />
            <div>
              <button type="button" onClick={() => setIsReplyOpen(false)}>
                Cancel
              </button>
              <button type="submit" disabled={!reply.trim()}>
                Send Reply
              </button>
            </div>
          </form>
        )}
      </div>
    </article>
  );
};

export default QuestionItem;
