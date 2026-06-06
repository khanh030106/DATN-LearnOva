import { MoreHorizontal } from "lucide-react";
import QaComposer from "./QaComposer.jsx";
import QaMessageList from "./QaMessageList.jsx";

const QaThread = ({ conversation, reply, onReplyChange, onSendReply }) => (
  <main className="teacher-qa-thread">
    <header className="teacher-qa-thread__header">
      <img src={conversation.avatar} alt={conversation.student} />
      <div>
        <h2>{conversation.student}</h2>
        <p>{conversation.course}</p>
        <span>
          <i style={{ width: `${conversation.progress}%` }} />
        </span>
      </div>
      <strong>{conversation.progress}% completed</strong>
      <div>
        <span>Student since</span>
        <time>{conversation.joinedAt}</time>
      </div>
      <button type="button">
        More actions
        <MoreHorizontal size={16} />
      </button>
    </header>

    <div className="teacher-qa-thread__date">
      <span>Today</span>
    </div>

    <QaMessageList conversation={conversation} />

    <QaComposer reply={reply} onReplyChange={onReplyChange} onSendReply={onSendReply} />
  </main>
);

export default QaThread;
