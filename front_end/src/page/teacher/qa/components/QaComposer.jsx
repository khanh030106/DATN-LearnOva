import { BookOpen, Paperclip, Send, Smile } from "lucide-react";

const QaComposer = ({ reply, onReplyChange, onSendReply }) => (
  <form className="teacher-qa-composer" onSubmit={onSendReply}>
    <div className="teacher-qa-composer__tabs">
      <button type="button" className="teacher-qa-composer__tab--active">
        Reply
      </button>
    </div>
    <textarea value={reply} onChange={(event) => onReplyChange(event.target.value)} placeholder="Type your reply..." rows={3} />
    <footer>
      <button type="button">
        <Paperclip size={16} />
        Attach
      </button>
      <button type="button">
        <BookOpen size={16} />
        Insert lesson
      </button>
      <button type="button">
        <Smile size={16} />
        Save as note
      </button>
      <button type="submit" disabled={!reply.trim()}>
        Send
        <Send size={15} />
      </button>
    </footer>
  </form>
);

export default QaComposer;
