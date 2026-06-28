import React, { useEffect, useState, useRef, useContext } from "react";

import { toast } from "react-toastify";
import { FaInbox } from "react-icons/fa";

import {
    FaCheck,
    FaSearch,
    FaRegCommentDots,
    FaRegThumbsUp
} from "react-icons/fa";

import {
    FaEllipsisVertical,
    FaPenToSquare,
    FaTrashCan
} from "react-icons/fa6";

import {
    getLessonQAApi,
    createQuestionApi,
    createAnswerApi,
    deleteAnswerApi,
    deleteQuestionApi,
    updateAnswerApi,
    updateQuestionApi
} from "../../../../api/lessonQAApi";

import { AuthContext } from "../../../../context/AuthContext";

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
    const [replyTarget, setReplyTarget] = useState(null);
    const replyFormRef = useRef(null);
    const replyTextareaRef = useRef(null);
    const { currentUser } = useContext(AuthContext);
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");
    const [editError, setEditError] = useState("");
    const [editQuestionId, setEditQuestionId] = useState(null);
    const [editQuestionText, setEditQuestionText] = useState("");
    const [editQuestionError, setEditQuestionError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;
    const [searchText, setSearchText] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    const currentUserId =
        currentUser?.id ||
        currentUser?.userId ||
        currentUser?.idUser;
    const [openMenuId, setOpenMenuId] = useState(null);
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
                autoClose: 1000,
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
                autoClose: 1000
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
                parentId: replyTarget.id,
                content: replyText
            });

            toast.success("Reply sent successfully!", {
                position: "top-right",
                autoClose: 1000,
                className: "toast-green",
                progressClassName: "toast-progress-white",
                icon: <FaCheck color="#22c55e" />
            });

            setReplyText("");
            setReplyError("");
            setShowReplyForm(false);
            setReplyTarget(null);


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
                autoClose: 1000
            });

        }
    };
    useEffect(() => {

        const handleClickOutside = () => {
            setOpenMenuId(null);
        };

        window.addEventListener("click", handleClickOutside);

        return () =>
            window.removeEventListener("click", handleClickOutside);

    }, []);
    const renderReplies = (answers) => {

        return answers.map(answer => (

            <div
                key={answer.id}
                className="reply-node"
            >

                <div className="reply-item">

                    <div className="qa-user-card">

                        <div className="answer-by">

                            <div className="qa-avatar">
                                {answer.userName
                                    ?.split(" ")
                                    .map(s => s[0])
                                    .slice(-2)
                                    .join("")}
                            </div>

                            <div className="qa-user-header">

                                <div>

                                    <div className="qa-author-name-in">
                                        {answer.userName}

                                        {answer.instructor && (
                                            <span className="qa-instructor-badge">
                    Instructor
                </span>
                                        )}
                                    </div>

                                    <div className="qa-author-time-in">
                                        {new Date(answer.createdAt).toLocaleString()}
                                    </div>

                                </div>

                                {currentUserId === answer.userId && (

                                    <div className="qa-menu">

                                        <button
                                            className="qa-menu-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                setOpenMenuId(
                                                    openMenuId === answer.id
                                                        ? null
                                                        : answer.id
                                                );
                                            }}
                                        >
                                            <FaEllipsisVertical />
                                        </button>

                                        {openMenuId === answer.id && (

                                            <div className="qa-dropdown">

                                                <button
                                                    className="qa-edit-icon"
                                                    onClick={() => {
                                                        setEditId(answer.id);
                                                        setEditText(answer.content);
                                                        setOpenMenuId(null); // đóng menu luôn cho UX tốt
                                                    }}
                                                >
                                                    <FaPenToSquare />
                                                    <span>Edit</span>
                                                </button>

                                                <button
                                                    className="qa-delete-icon"
                                                    onClick={() => handleDeleteAnswer(answer.id)}
                                                >
                                                    <FaTrashCan />
                                                    <span>Delete</span>
                                                </button>

                                            </div>

                                        )}

                                    </div>

                                )}

                            </div>

                        </div>

                        <div>
                            {answer.replyToUserName &&
                                <b className="user-1">@{answer.replyToUserName} </b>
                            }

                            {editId === answer.id ? (
                                <div>
           <textarea
               value={editText}
               onChange={(e) => {
                   setEditText(e.target.value);
                   setEditError("");
               }}
               className="qa-edit-textarea"
           />
                                    {editError && (
                                        <div className="qa-edit-error">
                                            {editError}
                                        </div>
                                    )}

                                    <div className="qa-edit-actions">
                                        <button
                                            className="qa-edit-save-btn"
                                            onClick={() => handleUpdateAnswer(answer.id)}
                                        >
                                            Save
                                        </button>

                                        <button
                                            className="qa-edit-cancel-btn"
                                            onClick={() => setEditId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <span>{answer.content}</span>
                            )}
                        </div>

                        <div className="qa-actions">
                            <button className={"btn-reply"}
                                    onClick={() => {

                                        setReplyTarget(answer);

                                        setShowReplyForm(true);

                                        setTimeout(() => {

                                            replyFormRef.current?.scrollIntoView({
                                                behavior: "smooth",
                                                block: "center"
                                            });

                                            replyTextareaRef.current?.focus();

                                        }, 100);

                                    }}
                            >
                                <FaRegCommentDots />
                                Reply
                            </button>
                            <button className="btn-like">
                                <FaRegThumbsUp />
                                <span>{selectedQuestion.likeCount || 0}</span>
                            </button>
                        </div>


                    </div>

                </div>

                {
                    answer.replies?.length > 0 && (

                        <div className="reply-children">

                            {renderReplies(answer.replies)}

                        </div>

                    )
                }

            </div>

        ));

    };
    const handleDeleteAnswer = async (answerId) => {

        try {

            await deleteAnswerApi(answerId);

            toast.success("Deleted successfully!");

            setOpenMenuId(null);

            const data = await getLessonQAApi(lessonId);

            setQuestions(data.questions || []);

            const updatedQuestion = data.questions.find(
                q => q.id === selectedQuestion.id
            );

            setSelectedQuestion(updatedQuestion);

        } catch (e) {

            console.log(e);
            toast.error("Delete failed!");
        }
    };
    const handleDeleteQuestion = async (id) => {
        try {
            await deleteQuestionApi(id);

            toast.success("Deleted successfully!");

            // reset UI trước
            setSelectedQuestion(null);

            // reload data
            const data = await getLessonQAApi(lessonId);
            setQuestions(data.questions || []);

        } catch (e) {
            console.log("DELETE ERROR:", e);
            toast.error("Delete failed!");
        }
    };
    const handleUpdateAnswer = async (id) => {
        const content = editText.trim();


        if (!content) {
            setEditError("Content cannot be empty.");
            return;
        }

        try {
            await updateAnswerApi(id, { content });

            setEditId(null);
            setEditText("");
            setEditError("");

            const data = await getLessonQAApi(lessonId);
            setQuestions(data.questions || []);

            const updatedQuestion = data.questions.find(
                q => q.id === selectedQuestion.id
            );

            setSelectedQuestion(updatedQuestion);

            toast.success("Updated!");
        } catch (e) {
            console.error(e);
            toast.error("Update failed!");
        }
    };
    const handleUpdateQuestion = async (id) => {
        const content = editQuestionText.trim();

        if (!content) {
            setEditQuestionError("Question content cannot be empty.");
            return;
        }

        try {
            await updateQuestionApi(id, { content });

            setEditQuestionId(null);
            setEditQuestionText("");
            setEditQuestionError("");

            const data = await getLessonQAApi(lessonId);
            setQuestions(data.questions || []);

            toast.success("Question updated!");
        } catch (e) {
            console.error(e);
            toast.error("Update failed!");
        }
    };
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

    const currentQuestions = questions.slice(
        indexOfFirstQuestion,
        indexOfLastQuestion
    );
    const filteredQuestions = (currentQuestions || []).filter((q) => {
        const matchSearch =
            q.content.toLowerCase().includes(searchText.toLowerCase()) ||
            q.userName?.toLowerCase().includes(searchText.toLowerCase());

        const matchTab =
            activeTab === "all"
                ? true
                : activeTab === "answered"
                    ? (q.answers && q.answers.length > 0)
                    : (!q.answers || q.answers.length === 0);

        return matchSearch && matchTab;
    });
    const totalPages = Math.ceil(questions.length / questionsPerPage);

  return (
      <div className="qa-content">
          <div className="qa-search-container">
              <input
                  type="text"
                  placeholder="Search all course questions"
                  className="qa-search-box"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="qa-search-btn">
                  <FaSearch />
              </button>
          </div>

          {/* Filters */}


          {/* Tabs */}
          <div className="qa-tab-section">
              <div className="qa-tabs">
                  <button
                      className={`qa-tab-btn ${activeTab === "all" ? "active" : ""}`}
                      onClick={() => setActiveTab("all")}
                  >
                      All questions
                  </button>

                  <button
                      className={`qa-tab-btn ${activeTab === "unanswered" ? "active" : ""}`}
                      onClick={() => setActiveTab("unanswered")}
                  >
                      Unanswered
                  </button>

                  <button
                      className={`qa-tab-btn ${activeTab === "answered" ? "active" : ""}`}
                      onClick={() => setActiveTab("answered")}
                  >
                      Answered
                  </button>
              </div>
              <span className="qa-total">
                {questions.length} Questions
            </span>
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
                          Question
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
                                  <div className="qa-actions">

                                      <button className={"btn-reply"}
                                              onClick={() => {

                                                  setReplyTarget(selectedQuestion);

                                                  setShowReplyForm(true);

                                                  setReplyText("");

                                                  setTimeout(() => {

                                                      replyFormRef.current?.scrollIntoView({
                                                          behavior: "smooth",
                                                          block: "center"
                                                      });

                                                      replyTextareaRef.current?.focus();

                                                  }, 100);

                                              }}
                                      >
                                          <FaRegCommentDots />
                                          <span>Reply</span>
                                      </button>

                                      <button className="btn-like">
                                          <FaRegThumbsUp />
                                          <span>{selectedQuestion.likeCount || 0}</span>
                                      </button>

                                  </div>

                              </div>

                          </div>

                      </div>

                      {/*<div className="qa-detail-tags">*/}
                      {/*    {selectedQuestion.tags.map((t,i) => <span key={i} className="qa-tag">{t}</span>)}*/}
                      {/*</div>*/}
                  </div>



                  {/* Instructor answer (mock or from data) */}
                  <div className="qa-thread">

                      {renderReplies(selectedQuestion.answers || [])}

                  </div>



                  {/* Reply form */}
                  {showReplyForm && (
                      <div
                          className="qa-reply-form"
                          ref={replyFormRef}
                      >
                          {replyTarget && (
                              <div className="reply-to-box">
                                  Replying to <b className="user-1">@{replyTarget.userName}</b>
                              </div>
                          )}
                          <textarea
                              ref={replyTextareaRef}
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
                                  onClick={() => {
                                      setShowReplyForm(false);
                                      setReplyTarget(null);

                                      setReplyText("");
                                  }}
                              >
                                  Cancel
                              </button>

                              <button
                                  className="btn-primary"
                                  onClick={handleReplySubmituser}
                              >
                                  Send
                              </button>
                          </div>
                      </div>
                  )}
              </div>
          ) : (
              <div className="qa-items-list">

                  {filteredQuestions && filteredQuestions.length === 0 ? (
                      <div className="qa-empty-state">
                          <div className="qa-empty-icon">
                              <FaInbox size={40} />
                          </div>

                          <h3>No results found</h3>

                          <p>
                              No questions match your search:{" "}
                              <b>"{searchText}"</b>
                          </p>

                          <button
                              className="qa-reset-btn"
                              onClick={() => {
                                  setSearchText("");
                                  setActiveTab("all");
                              }}
                          >
                              Clear filters
                          </button>
                      </div>
                  ) : (
                      (filteredQuestions || []).map(q => (
                          <div
                              key={q.id}
                              className="qa-card"
                              onClick={() => {
                                  if (editQuestionId !== q.id) {
                                      setSelectedQuestion(q);
                                  }
                              }}
                          >

                              <div className="qa-card-top">

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

                                              <div className="qa-qa-author-name">
                                                  {q.userName}
                                              </div>

                                              <div className="qa-qa-author-time">
                                                  {new Date(q.createdAt).toLocaleString()}
                                              </div>

                                          </div>

                                      </div>

                                  </div>

                              </div>

                              <div className="qa-middle">

                                  <h5 className="qa-title">Question</h5>

                                  {editQuestionId === q.id ? (
                                      <div className="qa-edit-box">

                            <textarea
                                className="qa-edit-textarea"
                                value={editQuestionText}
                                onChange={(e) => {
                                    setEditQuestionText(e.target.value);
                                    setEditQuestionError("");
                                }}
                            />

                                          {editQuestionError && (
                                              <div className="qa-edit-error">
                                                  {editQuestionError}
                                              </div>
                                          )}

                                          <div className="qa-edit-actions">
                                              <button
                                                  className="qa-edit-save-btn"
                                                  onClick={() => handleUpdateQuestion(q.id)}
                                              >
                                                  Save
                                              </button>

                                              <button
                                                  className="qa-edit-cancel-btn"
                                                  onClick={() => {
                                                      setEditQuestionId(null);
                                                      setEditQuestionText("");
                                                      setEditQuestionError("");
                                                  }}
                                              >
                                                  Cancel
                                              </button>
                                          </div>

                                      </div>
                                  ) : (
                                      <p className="qa-description">{q.content}</p>
                                  )}

                              </div>

                              {currentUserId === q.userId && (
                                  <div
                                      className="qa-menu"
                                      onClick={(e) => e.stopPropagation()}
                                  >
                                      <button
                                          className="qa-menu-btn"
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              setOpenMenuId(
                                                  openMenuId === q.id ? null : q.id
                                              );
                                          }}
                                      >
                                          <FaEllipsisVertical />
                                      </button>

                                      {openMenuId === q.id && (
                                          <div
                                              className="qa-dropdown"
                                              onClick={(e) => e.stopPropagation()}
                                          >
                                              <button
                                                  className="qa-edit-icon"
                                                  onClick={() => {
                                                      setEditQuestionId(q.id);
                                                      setEditQuestionText(q.content);
                                                      setEditQuestionError("");
                                                      setOpenMenuId(null);
                                                  }}
                                              >
                                                  <FaPenToSquare />
                                                  <span>Edit</span>
                                              </button>

                                              <button
                                                  className="qa-delete-icon"
                                                  onClick={() => handleDeleteQuestion(q.id)}
                                              >
                                                  <FaTrashCan />
                                                  <span>Delete</span>
                                              </button>
                                          </div>
                                      )}
                                  </div>
                              )}

                          </div>
                      ))
                  )}

              </div>
          )}
          {/* Pagination */}
          <div className="qa-pagination">

              <button
                  className="qa-page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
              >
                  ‹
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                  <button
                      key={index + 1}
                      className={`qa-page-btn ${
                          currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                  >
                      {index + 1}
                  </button>
              ))}

              <button
                  className="qa-page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
              >
                  ›
              </button>

          </div>
      </div>
  );
}

export default QATab;