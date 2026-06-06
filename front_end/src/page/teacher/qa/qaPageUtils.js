export const filterConversations = ({ conversations, activeFilter, query }) => {
  const normalizedQuery = query.trim().toLowerCase();

  return conversations.filter((conversation) => {
    const matchesFilter = activeFilter === "all" || conversation.status === activeFilter;
    const matchesQuery =
      !normalizedQuery ||
      conversation.student.toLowerCase().includes(normalizedQuery) ||
      conversation.course.toLowerCase().includes(normalizedQuery) ||
      conversation.question.toLowerCase().includes(normalizedQuery);

    return matchesFilter && matchesQuery;
  });
};

export const getUnansweredCount = (conversations) =>
  conversations.filter((conversation) => conversation.status === "unanswered").length;

export const addTeacherReply = ({ conversations, conversationId, replyText }) =>
  conversations.map((conversation) => {
    if (conversation.id !== conversationId) {
      return conversation;
    }

    return {
      ...conversation,
      status: "answered",
      unread: 0,
      messages: [
        ...conversation.messages,
        {
          id: `reply-${Date.now()}`,
          author: "teacher",
          text: replyText,
          time: "Now",
        },
      ],
    };
  });
