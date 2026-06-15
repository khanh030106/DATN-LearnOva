
import "./AI.css";
import { FaPaperPlane } from "react-icons/fa";
import AIImage from "../../../assets/aia.png";
import { useState, useEffect, useRef } from "react";

function LearnovaAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [showGreeting, setShowGreeting] = useState(true);

    const [greetingText, setGreetingText] = useState(
        "👋 Xin chào! Mình là Learnova AI"
    );

    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Xin chào 👋 Mình là trợ lý AI của Learnova."
        }
    ]);

// Lời chào ban đầu tự ẩn sau 7 giây
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGreeting(false);
        }, 7000);

        return () => clearTimeout(timer);
    }, []);

// Nhắc người dùng khi không tương tác
    useEffect(() => {
        let idleTimer;
        let hideTimer;

        const startTimer = () => {
            clearTimeout(idleTimer);
            clearTimeout(hideTimer);

            idleTimer = setTimeout(() => {

                setGreetingText(
                    "👋 Bạn cần mình hỗ trợ gì không nè?"
                );

                setShowGreeting(true);

                hideTimer = setTimeout(() => {
                    setShowGreeting(false);

                    // Sau khi tắt thì đếm tiếp
                    startTimer();

                }, 7000);

            }, 300000); // TEST 10 GIÂY
            // Deploy đổi thành 300000
        };

        const handleActivity = () => {
            clearTimeout(idleTimer);
            clearTimeout(hideTimer);

            setShowGreeting(false);

            startTimer();
        };

        startTimer();

        window.addEventListener("click", handleActivity);
        window.addEventListener("keydown", handleActivity);

        return () => {
            clearTimeout(idleTimer);
            clearTimeout(hideTimer);

            window.removeEventListener("click", handleActivity);
            window.removeEventListener("keydown", handleActivity);
        };
    }, []);

// Auto scroll chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    const handleSend = () => {
        if (!message.trim()) return;

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: message
            }
        ]);

        setMessage("");
    };
    // const suggestions = [
    //     "Tìm khóa học phù hợp",
    //     "Hỏi về lộ trình học",
    //     "Ưu đãi & khuyến mãi",
    //     "Hướng dẫn sử dụng",
    // ];


    return (
        <div className="ai-widget">

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-container">

                    {/* Header */}
                    <div className="chat-header">
                        <div className="header-left-AI">
                            <div className="avatar-ai">
                                <img src={AIImage} alt="Learnova AI" />
                            </div>

                            <div>
                                <h3>Learnova AI</h3>

                                <span className="status">
                                    <span className="dot"></span>
                                    Online
                                </span>
                            </div>
                        </div>

                        <button
                            className="minimize-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            −
                        </button>
                    </div>

                    {/* Body */}
                    <div className="chat-body">
                        <div className="messages">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.sender}`}
                                >
                                    {msg.text}
                                </div>
                            ))}

                            <div ref={messagesEndRef}></div>
                        </div>

                        {/*<div className="suggestions">*/}
                        {/*    {suggestions.map((item, index) => (*/}
                        {/*        <button*/}
                        {/*            key={index}*/}
                        {/*            className="suggestion-btn"*/}
                        {/*        >*/}
                        {/*            {item}*/}
                        {/*        </button>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                    </div>

                    {/* Footer */}
                    <div className="chat-footer">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Nhập câu hỏi của bạn..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSend();
                                    }
                                }}
                            />

                            <button
                                className="send-btn"
                                onClick={handleSend}
                            >
                                <FaPaperPlane />
                            </button>
                        </div>

                        <p className="powered">
                            Powered by <span>Learnova AI</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <div className="ai-widget">

                {showGreeting && !isOpen && (
                    <div className="ai-greeting">
                        {greetingText}
                    </div>
                )}

                <button
                    className="floating-bot"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img
                        src={AIImage}
                        alt="Learnova AI"
                    />
                </button>

            </div>
        </div>
    );
}

export default LearnovaAI;