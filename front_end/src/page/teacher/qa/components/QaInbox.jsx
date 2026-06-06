import { ChevronDown, MessageSquare, Search } from "lucide-react";
import { filterTabs } from "../qaPageData.js";

const QaInbox = ({
  activeConversationId,
  activeFilter,
  conversations,
  query,
  unansweredCount,
  onQueryChange,
  onSelectConversation,
  onSelectFilter,
}) => (
  <aside className="teacher-qa-inbox">
    <header className="teacher-qa-inbox__header">
      <div>
        <h1>Student Q&A</h1>
        <p>{unansweredCount} unanswered questions</p>
      </div>
      <button type="button" aria-label="Compose answer">
        <MessageSquare size={18} />
      </button>
    </header>

    <label className="teacher-qa-search">
      <Search size={16} />
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search student or course..."
      />
    </label>

    <div className="teacher-qa-tabs" aria-label="Question filters">
      {filterTabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={activeFilter === tab.value ? "teacher-qa-tabs__item--active" : ""}
          onClick={() => onSelectFilter(tab.value)}
        >
          {tab.label}
          {tab.value === "unanswered" && <span>{unansweredCount}</span>}
        </button>
      ))}
    </div>

    <div className="teacher-qa-conversation-list">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          type="button"
          className={conversation.id === activeConversationId ? "teacher-qa-conversation--active" : ""}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <img src={conversation.avatar} alt={conversation.student} />
          <span>
            <strong>{conversation.student}</strong>
            <small>{conversation.course}</small>
            <em>{conversation.question}</em>
          </span>
          <time>{conversation.time}</time>
          {conversation.unread ? <b>{conversation.unread}</b> : <i aria-label="Answered" />}
        </button>
      ))}
    </div>

    <button className="teacher-qa-load-more" type="button">
      Load more conversations
      <ChevronDown size={15} />
    </button>
  </aside>
);

export default QaInbox;
