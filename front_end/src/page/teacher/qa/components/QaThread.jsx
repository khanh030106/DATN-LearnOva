import QaComposer from "./QaComposer.jsx";
import QaMessageList from "./QaMessageList.jsx";

const QaThread = ({ conversation, reply, onReplyChange, onSendReply }) => (
  <main className="teacher-qa-thread">
    <header className="teacher-qa-thread__header">
      <img src={conversation.avatar} alt={conversation.student} />
      <div>
        <h2>{conversation.student}</h2>
      </div>
    </header>

    <div className="teacher-qa-thread__date">
      <span>Today</span>
    </div>

    <QaMessageList conversation={conversation} />

    <QaComposer reply={reply} onReplyChange={onReplyChange} onSendReply={onSendReply} />
  </main>
);

export default QaThread;
