import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import {
  FaSearch,
  FaRegCommentDots,
  FaRegThumbsUp
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
    getLessonQAApi,
    createQuestionApi,
    createAnswerApi
} from "../../../../api/lessonQAApi";

function QATab({
                   lessonId,
                   course,
                   selectedQuestion,
                   setSelectedQuestion,
                   showQuestionForm,
                   setShowQuestionForm,
                   showReplyForm,
                   setShowReplyForm,
                   replyText,
                   setReplyText,
                   handleReplySubmit
               }) {
    const [questions, setQuestions] = useState([]);
    const [questionContent, setQuestionContent] = useState("");
    const [questionError, setQuestionError] = useState("");
    const [replyError, setReplyError] = useState("");

    useEffect(() => {

        const loadQA = async () => {

            try {

                const data = await getLessonQAApi(lessonId);

                console.log("QA DATA =", data);

                setQuestions(data.questions || []);

            } catch (e) {
                console.log(e);
            }

        };

        if (lessonId) {
            loadQA();
        }

    }, [lessonId]);
    const handleCreateQuestion = async () => {

        if (!questionContent.trim()) {
            setQuestionError("Please enter your question.");
            return;
        }

        try {

            await createQuestionApi({
                lessonId,
                content: questionContent
            });

            toast.success("Question sent successfully!", {
                position: "top-right",
                autoClose: 2000,
                className: "toast-green",
                progressClassName: "toast-progress-white",
                icon: <FaCheck color="#22c55e" />
            });

            setQuestionContent("");
            setQuestionError("");
            setShowQuestionForm(false);

            const data = await getLessonQAApi(lessonId);
            setQuestions(data.questions || []);

        } catch (error) {

            console.log(error);

            toast.error("Failed to send question!", {
                position: "top-right",
                autoClose: 2000
            });

        }
    };
    const handleReplySubmituser = async () => {

        if (!replyText.trim()) {
            setReplyError("Please enter your reply.");
            return;
        }

        try {

            console.log("selectedQuestion.id =", selectedQuestion.id);

            console.log("questionId =", selectedQuestion.id);

            console.log("replyText =", replyText);

            console.log(
                JSON.stringify({
                    questionId: selectedQuestion.id,
                    content: replyText
                }, null, 2)
            );

            await createAnswerApi({
                questionId: selectedQuestion.id,
                content: replyText
            });

            toast.success("Reply sent successfully!", {
                position: "top-right",
                autoClose: 2000,
                className: "toast-green",
                progressClassName: "toast-progress-white",
                icon: <FaCheck color="#22c55e" />
            });

            setReplyText("");
            setReplyError("");
            setShowReplyForm(false);

            const data = await getLessonQAApi(lessonId);

            setQuestions(data.questions || []);

            const updatedQuestion = data.questions.find(
                q => q.id === selectedQuestion.id
            );

            setSelectedQuestion(updatedQuestion);

        } catch (error) {

            console.log(error);

            if (error.response) {
                console.log("Status =", error.response.status);
                console.log("Data =", error.response.data);
            }

            toast.error("Failed to send reply!", {
                position: "top-right",
                autoClose: 2000
            });

        }
    };
  return (
      <div className="qa-content">
          <div className="qa-search-container">
              <input
                  type="text"
                  placeholder="Search all course questions"
                  className="qa-search-box"
              />
              <button className="qa-search-btn">
                  <FaSearch />
              </button>
          </div>

          {/* Filters */}
          <div className="qa-filter-bar">
              <div className="qa-filter-group">
                  <label>Filter:</label>
                  <select className="qa-select">
                      <option>All lectures</option>
                  </select>
              </div>

              <div className="qa-filter-group">
                  <label>Sort by:</label>
                  <select className="qa-select">
                      <option>Newest first</option>
                  </select>
              </div>

              <button className="qa-filter-btn">Filter questions</button>
          </div>

          {/* Tabs */}
          <div className="qa-tab-section">
              <div className="qa-tabs">
                  <button className="qa-tab-btn active">All questions</button>
                  <button className="qa-tab-btn">Unanswered</button>
                  <button className="qa-tab-btn">Answered</button>
              </div>
              <span className="qa-total">128 Question</span>
          </div>
          <div className="qa-action-bar">
              <button
                  className="qa-ask-btn"
                  onClick={() => setShowQuestionForm(!showQuestionForm)}
              >
                  + Ask a new question
              </button>


          </div>
          {
              showQuestionForm && (
                  <div className="qa-question-form">

                      <h4>Ask the instructor a question</h4>

                      <textarea
                          placeholder="Describe your question in detail..."
                          className="qa-textarea"
                          value={questionContent}
                          onChange={(e) => {
                              setQuestionContent(e.target.value);
                              setQuestionError(""); // xóa lỗi khi người dùng nhập
                          }}
                      />

                      {questionError && (
                          <p className="qa-error-message">
                              {questionError}
                          </p>
                      )}

                      <div className="qa-form-actions">
                          <button
                              onClick={() => setShowQuestionForm(false)}
                              className="qa-cancel-btn"
                          >
                              Cancel
                          </button>

                          <button
                              className="qa-submit-btn"
                              onClick={handleCreateQuestion}
                          >
                              Send question
                          </button>
                      </div>

                  </div>
              )
          }

          {/* Q&A List */}
          {/* QA area */}
          {selectedQuestion ? (
              <div className="qa-detail">
                  <button className="qa-back" onClick={() => setSelectedQuestion(null)}>‹ Back to questions list</button>

                  <div className="qa-detail-header">
                      <div className="qa-detail-title">
                          Câu hỏi
                      </div>
                      <div className="qa-detail-meta">

                          <div className="qa-author-info">

                              <div className="qa-avatar-large">
                                  {selectedQuestion.userName
                                      ?.split(" ")
                                      .map(s => s[0])
                                      .slice(-2)
                                      .join("")}
                              </div>
                              <div className="qa-author-name">
                                  {selectedQuestion.userName}
                              </div>

                              <div className="qa-author-time">
                                  {new Date(selectedQuestion.createdAt).toLocaleString()}
                              </div>
                              {/*<div className="qa-author-row">*/}

                              {/*</div>*/}

                              <div className="qa-content">



                                  <div className="qa-question-body">
                                      <p>{selectedQuestion.content}</p>
                                  </div>

                              </div>

                          </div>

                      </div>

                      {/*<div className="qa-detail-tags">*/}
                      {/*    {selectedQuestion.tags.map((t,i) => <span key={i} className="qa-tag">{t}</span>)}*/}
                      {/*</div>*/}
                  </div>



                  {/* Instructor answer (mock or from data) */}
                  {selectedQuestion.answers?.map(answer => (
                      <div className="qa-answer" key={answer.id}>

                          <div className="answer-by">

                              <img
                                  src={course.instructor.avatar}
                                  alt={answer.userName}
                                  className="answer-instructor-avatar"
                              />

                              <div className="answer-instructor-info">

                                  <div className="answer-instructor-header">

                                      <div className="answer-instructor-name">
                                          {answer.userName}
                                      </div>

                                      <span className="instructor-badge">
                        Instructor
                    </span>

                                  </div>

                                  <div className="answer-instructor-time">
                                      {new Date(answer.createdAt).toLocaleString()}
                                  </div>

                              </div>

                          </div>

                          <div className="answer-content">
                              <p>{answer.content}</p>
                          </div>

                          <div className="answer-actions">
                              <button
                                  className="btn-reply"
                                  onClick={() => setShowReplyForm(!showReplyForm)}
                              >
                                  <FaRegCommentDots />
                                  <span>Reply</span>
                              </button>

                              <button className="btn-like">
                                  <FaRegThumbsUp />
                                  <span>{answer.likeCount}</span>
                              </button>
                          </div>

                      </div>
                  ))}



                  {/* Reply form */}
                  {showReplyForm && (
                      <div className="qa-reply-form">
                                           <textarea
                                               className={`qa-reply-input ${replyError ? "error" : ""}`}
                                               value={replyText}
                                               onChange={(e) => {
                                                   setReplyText(e.target.value);
                                                   setReplyError("");
                                               }}
                                               placeholder="Write your reply..."
                                               rows={4}
                                           />

                          {replyError && (
                              <p className="qa-error-message">
                                  {replyError}
                              </p>
                          )}

                          <div className="qa-reply-actions">
                              <button
                                  className="btn-cancel"
                                  onClick={() => setShowReplyForm(false)}
                              >
                                  Hủy
                              </button>

                              <button
                                  className="btn-primary"
                                  onClick={handleReplySubmituser}
                              >
                                  Gửi
                              </button>
                          </div>
                      </div>
                  )}
              </div>
          ) : (
              <div className="qa-items-list">
                  {(questions || []).map(q => (
                      <div key={q.id} className="qa-card" onClick={() => setSelectedQuestion(q)}>

                          <div className="qa-right">
                              <div className="qa-author">
                                  <div className="qa-avatar">
                                      {q.userName
                                          ?.split(" ")
                                          .map(s => s[0])
                                          .slice(-2)
                                          .join("")}
                                  </div>
                                  <div className="qa-author-info">
                                      <div className="qa-qa-author-name">{q.userName}</div>
                                      <div className="qa-qa-author-time">{new Date(q.createdAt).toLocaleString()}</div>
                                  </div>
                              </div>
                          </div>
                          <div className="qa-middle">
                              <h5 className="qa-title">{"Question"}</h5>
                              <p className="qa-description">{q.content}</p>
                              {/*<div className="qa-tag-list">{q.tags.map((tag,i) => <span key={i} className="qa-tag">{tag}</span>)}</div>*/}
                          </div>


                      </div>
                  ))}
              </div>
          )}
          {/* Pagination */}
          <div className="qa-pagination">
              <button className="qa-page-btn">‹</button>
              <button className="qa-page-btn active">1</button>
              <button className="qa-page-btn">2</button>
              <button className="qa-page-btn">3</button>
              <span className="qa-dots">...</span>
              <button className="qa-page-btn">11</button>
              <button className="qa-page-btn">›</button>
          </div>
      </div>
  );
}

export default QATab;