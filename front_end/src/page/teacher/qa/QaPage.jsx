import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Play,
  Search,
  Send,
  Smile,
} from "lucide-react";
import { questions } from "../data/teacherDashboardData.js";
import "./QaPage.css";

const conversationsSeed = [
  {
    id: 1,
    student: questions[0].student,
    email: "mia.harper@email.com",
    course: "Eastern Philosophy",
    question: questions[0].question,
    avatar: questions[0].avatar,
    time: "2m ago",
    status: "unanswered",
    unread: 1,
    progress: 72,
    joinedAt: "May 12, 2024",
    activeAt: "Today, 10:20 AM",
    completedLessons: "18 / 25",
    watchTime: "18h 24m",
    quizScore: "82%",
    messages: [
      {
        id: "m1",
        author: "student",
        text: "How can I apply the concept of 'wu wei' to modern project management?",
        time: "10:24 AM",
      },
      {
        id: "m2",
        author: "teacher",
        text:
          "Great question, Mia! Wu wei is about effortless action and working in harmony with circumstances. In project management, it means focusing on clarity, aligning with the team's natural strengths, and removing obstacles rather than forcing outcomes.",
        time: "10:28 AM",
      },
      {
        id: "m3",
        author: "student",
        text: "That makes sense! Could you give a practical example of how to do that in a team?",
        time: "10:31 AM",
      },
    ],
  },
  {
    id: 2,
    student: questions[1].student,
    email: "olivia.chen@email.com",
    course: "Research Skills",
    question: questions[1].question,
    avatar: questions[1].avatar,
    time: "38m ago",
    status: "unanswered",
    unread: 1,
    progress: 64,
    joinedAt: "Apr 28, 2024",
    activeAt: "Today, 9:42 AM",
    completedLessons: "11 / 18",
    watchTime: "11h 08m",
    quizScore: "78%",
    messages: [
      {
        id: "o1",
        author: "student",
        text: "How should I present my research hypothesis more rigorously?",
        time: "9:42 AM",
      },
    ],
  },
  {
    id: 3,
    student: "Ethan Nguyen",
    email: "ethan.nguyen@email.com",
    course: "Data Science Basics",
    question: "Can you explain more about overfitting?",
    avatar: questions[0].avatar,
    time: "1h ago",
    status: "unanswered",
    unread: 1,
    progress: 58,
    joinedAt: "Mar 19, 2024",
    activeAt: "Today, 8:15 AM",
    completedLessons: "9 / 16",
    watchTime: "7h 48m",
    quizScore: "74%",
    messages: [
      {
        id: "e1",
        author: "student",
        text: "Can you explain more about overfitting and how to avoid it?",
        time: "8:15 AM",
      },
    ],
  },
  {
    id: 4,
    student: "Sophie Martin",
    email: "sophie.martin@email.com",
    course: "UX/UI Design",
    question: "What tool do you recommend for wireframes?",
    avatar: questions[1].avatar,
    time: "3h ago",
    status: "answered",
    progress: 86,
    joinedAt: "Feb 04, 2024",
    activeAt: "Yesterday, 6:10 PM",
    completedLessons: "22 / 25",
    watchTime: "21h 12m",
    quizScore: "91%",
    messages: [
      {
        id: "s1",
        author: "student",
        text: "What tool do you recommend for fast wireframes?",
        time: "6:10 PM",
      },
      {
        id: "s2",
        author: "teacher",
        text: "Start with Figma for collaborative wireframes, then move to higher fidelity only after the flow is clear.",
        time: "6:22 PM",
      },
    ],
  },
  {
    id: 5,
    student: "Daniel Kim",
    email: "daniel.kim@email.com",
    course: "JavaScript Advanced",
    question: "I'm stuck at asynchronous functions.",
    avatar: questions[0].avatar,
    time: "5h ago",
    status: "answered",
    progress: 69,
    joinedAt: "Jan 21, 2024",
    activeAt: "Yesterday, 3:35 PM",
    completedLessons: "14 / 20",
    watchTime: "16h 02m",
    quizScore: "80%",
    messages: [
      {
        id: "d1",
        author: "student",
        text: "I'm stuck at asynchronous functions. When should I use async and await?",
        time: "3:35 PM",
      },
      {
        id: "d2",
        author: "teacher",
        text: "Use async and await when you need asynchronous code to read like a sequence of steps.",
        time: "3:51 PM",
      },
    ],
  },
];

const filterTabs = [
  { label: "All", value: "all" },
  { label: "Unanswered", value: "unanswered" },
  { label: "Answered", value: "answered" },
];

const QaPage = () => {
  const [conversations, setConversations] = useState(conversationsSeed);
  const [activeId, setActiveId] = useState(conversationsSeed[0].id);
  const [activeFilter, setActiveFilter] = useState("unanswered");
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");

  const activeConversation = conversations.find((conversation) => conversation.id === activeId) ?? conversations[0];

  const filteredConversations = useMemo(() => {
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
  }, [activeFilter, conversations, query]);

  const unansweredCount = conversations.filter((conversation) => conversation.status === "unanswered").length;

  const handleSendReply = (event) => {
    event.preventDefault();

    if (!reply.trim()) {
      return;
    }

    setConversations((currentConversations) =>
      currentConversations.map((conversation) => {
        if (conversation.id !== activeConversation.id) {
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
              text: reply.trim(),
              time: "Now",
            },
          ],
        };
      }),
    );
    setReply("");
  };

  return (
    <section className="teacher-page teacher-qa-page">
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
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search student or course..."
          />
        </label>

        <div className="teacher-qa-tabs" aria-label="Question filters">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              className={activeFilter === tab.value ? "teacher-qa-tabs__item--active" : ""}
              onClick={() => setActiveFilter(tab.value)}
            >
              {tab.label}
              {tab.value === "unanswered" && <span>{unansweredCount}</span>}
            </button>
          ))}
        </div>

        <div className="teacher-qa-conversation-list">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              className={conversation.id === activeId ? "teacher-qa-conversation--active" : ""}
              onClick={() => setActiveId(conversation.id)}
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

      <main className="teacher-qa-thread">
        <header className="teacher-qa-thread__header">
          <img src={activeConversation.avatar} alt={activeConversation.student} />
          <div>
            <h2>{activeConversation.student}</h2>
            <p>{activeConversation.course}</p>
            <span>
              <i style={{ width: `${activeConversation.progress}%` }} />
            </span>
          </div>
          <strong>{activeConversation.progress}% completed</strong>
          <div>
            <span>Student since</span>
            <time>{activeConversation.joinedAt}</time>
          </div>
          <button type="button">
            More actions
            <MoreHorizontal size={16} />
          </button>
        </header>

        <div className="teacher-qa-thread__date">
          <span>Today</span>
        </div>

        <div className="teacher-qa-messages">
          {activeConversation.messages.map((message) => (
            <div key={message.id} className={`teacher-qa-message teacher-qa-message--${message.author}`}>
              {message.author === "student" && <img src={activeConversation.avatar} alt="" />}
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
            <img src={activeConversation.avatar} alt="" />
            <span>
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>

        <form className="teacher-qa-composer" onSubmit={handleSendReply}>
          <div className="teacher-qa-composer__tabs">
            <button type="button" className="teacher-qa-composer__tab--active">
              Reply
            </button>
          </div>
          <textarea
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            placeholder="Type your reply..."
            rows={3}
          />
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
      </main>

      <aside className="teacher-qa-details">
        <section className="teacher-qa-detail-card">
          <h3>Student Details</h3>
          <div className="teacher-qa-profile-row">
            <img src={activeConversation.avatar} alt={activeConversation.student} />
            <div>
              <strong>{activeConversation.student}</strong>
              <span>{activeConversation.email}</span>
            </div>
          </div>
          <p>Joined {activeConversation.joinedAt}</p>
          <p>Last active: {activeConversation.activeAt}</p>
        </section>

      </aside>
    </section>
  );
};

export default QaPage;
