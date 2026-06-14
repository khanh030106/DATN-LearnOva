import React from "react";
import {
  FaSearch,
  FaRegCommentDots,
  FaRegThumbsUp
} from "react-icons/fa";
import {course, qaData} from "./mockCourseData.js";

function QATab({
                 qaData,
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

                      <input
                          type="text"
                          placeholder="Question title..."
                          className="qa-input"
                      />

                      <textarea
                          placeholder="Describe your question in detail..."
                          className="qa-textarea"
                      />

                      <div className="qa-form-actions">
                          <button
                              onClick={() => setShowQuestionForm(false)}
                              className="qa-cancel-btn"
                          >
                              Cancel
                          </button>

                          <button className="qa-submit-btn">
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
                      <div className="qa-detail-title">{selectedQuestion.title}</div>
                      <div className="qa-detail-meta">

                          <div className="qa-author-info">

                              <div className="qa-avatar-large">
                                  {selectedQuestion.author.initials}
                              </div>
                              <div className="qa-author-name">
                                  {selectedQuestion.author.name}
                              </div>

                              <div className="qa-author-time">
                                  • {selectedQuestion.author.level}
                              </div>
                              {/*<div className="qa-author-row">*/}

                              {/*</div>*/}

                              <div className="qa-content">



                                  <div className="qa-question-body">
                                      <p>{selectedQuestion.description}</p>
                                  </div>

                              </div>

                          </div>

                      </div>

                      <div className="qa-detail-tags">
                          {selectedQuestion.tags.map((t,i) => <span key={i} className="qa-tag">{t}</span>)}
                      </div>
                  </div>



                  {/* Instructor answer (mock or from data) */}
                  <div className="qa-answer">

                      <div className="answer-by">

                          <img
                              src={course.instructor.avatar}
                              alt={course.instructor.name}
                              className="answer-instructor-avatar"
                          />

                          <div className="answer-instructor-info">

                              <div className="answer-instructor-header">
                                  <div className="answer-instructor-name">
                                      {course.instructor.name}
                                  </div>

                                  <span className="instructor-badge">
                                                   {course.instructor.role}
                                                </span>
                              </div>

                              <div className="answer-instructor-time">
                                  15 phút trước
                              </div>

                          </div>

                      </div>

                      <div className="answer-content">
                          <p>
                              Đây là câu trả lời mẫu từ giảng viên.

                          </p>

                          <pre className="code-block">
                                                    {`// Ví dụ code
                                                    public class JwtUtil {
                                                    
                                                        private String secretKey;
                                                    
                                                    }`}
                                                            </pre>
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
                              <span>24</span>
                          </button>

                      </div>

                  </div>



                  {/* Reply form */}
                  {showReplyForm && (
                      <div className="qa-reply-form">
                                            <textarea
                                                className="qa-reply-input"
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder="Viết phản hồi của bạn..."
                                                rows={4}
                                            />

                          <div className="qa-reply-actions">
                              <button
                                  className="btn-cancel"
                                  onClick={() => setShowReplyForm(false)}
                              >
                                  Hủy
                              </button>

                              <button
                                  className="btn-primary"
                                  onClick={() => handleReplySubmit(selectedQuestion.id)}
                              >
                                  Gửi
                              </button>
                          </div>
                      </div>
                  )}
              </div>
          ) : (
              <div className="qa-items-list">
                  {qaData.map(q => (
                      <div key={q.id} className="qa-card" onClick={() => setSelectedQuestion(q)}>

                          <div className="qa-right">
                              <div className="qa-author">
                                  <div className="qa-avatar">{q.author.initials}</div>
                                  <div className="qa-author-info">
                                      <div className="qa-qa-author-name">{q.author.name}</div>
                                      <div className="qa-qa-author-time">{q.author.level}</div>
                                  </div>
                              </div>
                          </div>
                          <div className="qa-middle">
                              <h5 className="qa-title">{q.title}</h5>
                              <p className="qa-description">{q.description}</p>
                              <div className="qa-tag-list">{q.tags.map((tag,i) => <span key={i} className="qa-tag">{tag}</span>)}</div>
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