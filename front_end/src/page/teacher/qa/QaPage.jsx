import { useMemo, useState } from "react";
import QaInbox from "./components/QaInbox.jsx";
import QaThread from "./components/QaThread.jsx";
import { conversationsSeed } from "./qaPageData.js";
import { addTeacherReply, filterConversations, getUnansweredCount } from "./qaPageUtils.js";
import "./QaPage.css";

const QaPage = () => {
  const [conversations, setConversations] = useState(conversationsSeed);
  const [activeConversationId, setActiveConversationId] = useState(conversationsSeed[0].id);
  const [activeFilter, setActiveFilter] = useState("unanswered");
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0];

  const filteredConversations = useMemo(
    () => filterConversations({ conversations, activeFilter, query }),
    [activeFilter, conversations, query],
  );

  const unansweredCount = getUnansweredCount(conversations);

  const handleSendReply = (event) => {
    event.preventDefault();

    const trimmedReply = reply.trim();
    if (!trimmedReply) {
      return;
    }

    setConversations((currentConversations) =>
      addTeacherReply({
        conversations: currentConversations,
        conversationId: activeConversation.id,
        replyText: trimmedReply,
      }),
    );
    setReply("");
  };

  return (
    <section className="teacher-page teacher-qa-page">
      <QaInbox
        activeConversationId={activeConversation.id}
        activeFilter={activeFilter}
        conversations={filteredConversations}
        query={query}
        unansweredCount={unansweredCount}
        onQueryChange={setQuery}
        onSelectConversation={setActiveConversationId}
        onSelectFilter={setActiveFilter}
      />

      <QaThread
        conversation={activeConversation}
        reply={reply}
        onReplyChange={setReply}
        onSendReply={handleSendReply}
      />
    </section>
  );
};

export default QaPage;
