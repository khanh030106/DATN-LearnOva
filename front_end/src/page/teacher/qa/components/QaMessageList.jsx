import { Play } from "lucide-react";

const QaMessageList = ({ conversation }) => (
  <div className="teacher-qa-messages">
    {conversation.messages.map((message) => (
      <div key={message.id} className={`teacher-qa-message teacher-qa-message--${message.author}`}>
        {message.author === "student" && <img src={conversation.avatar} alt="" />}
        <div>
          <p>{message.text}</p>
          {message.author === "teacher" && message.id === "m2" && (
            <button type="button">
              <Play size={15} />
              Jump to Lesson
              <span>12:45</span>
            </button>
          )}
          <time>{message.time}</time>
        </div>
      </div>
    ))}
    <div className="teacher-qa-typing">
      <img src={conversation.avatar} alt="" />
      <span>
        <i />
        <i />
        <i />
      </span>
    </div>
  </div>
);

export default QaMessageList;
