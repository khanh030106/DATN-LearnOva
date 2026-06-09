import React from "react";
import {
  FaGraduationCap,
  FaCheckCircle,
  FaUserGraduate
} from "react-icons/fa";

function OverviewTab({ courseDescription, instructor, expandedDescription, setExpandedDescription }) {
  return (

          <div className="overview-content">
              {/* Thông tin cơ bản */}
              <div className="course-stats">
                  <div className="stat">
                      <span className="star">★</span>
                      <strong className="stat-value">5.0</strong>
                      <small className="stat-label">(92 ratings)</small>
                  </div>
                  <div className="stat">
                      <span className="stat-value">32 hours</span>
                  </div>
                  <div className="stat">
                      <span className="stat-label">Beginner level</span>
                  </div>
              </div>

              {/* Phần mô tả sản phẩm */}
              <div className="description-section">
                  <h3>Course Description</h3>
                  <div className={`description-content ${expandedDescription ? 'expanded' : 'collapsed'}`}>
                      {expandedDescription
                          ? courseDescription.map((desc, idx) => (
                              <p key={idx} className="description-para">{desc}</p>
                          ))
                          : courseDescription.slice(0, 2).map((desc, idx) => (
                              <p key={idx} className="description-para">{desc}</p>
                          ))
                      }
                  </div>
                  <button
                      className="see-more-btn"
                      onClick={() => setExpandedDescription(!expandedDescription)}
                  >
                      {expandedDescription ? 'See less' : 'See more'}
                  </button>
              </div>

              {/* Bạn sẽ học được */}
              <div className="learn-section">
                  <h4 className="learn-title">
                      <FaGraduationCap className="title-icon" />
                      What you'll learn
                  </h4>

                  <ul className="learn-list">
                      <li>
                          <FaCheckCircle className="learn-icon" />
                          Xây dựng ứng dụng với Spring Boot
                      </li>

                      <li>
                          <FaCheckCircle className="learn-icon" />
                          Truy xuất dữ liệu với Spring Data JPA
                      </li>

                      <li>
                          <FaCheckCircle className="learn-icon" />
                          Tích hợp GitHub Copilot vào quy trình làm việc
                      </li>

                      <li>
                          <FaCheckCircle className="learn-icon" />
                          Xây dựng RESTful API với Spring WEB
                      </li>

                      <li>
                          <FaCheckCircle className="learn-icon" />
                          Triển khai ứng dụng thực tế
                      </li>
                  </ul>
              </div>
              <hr />

              {/* INSTRUCTOR SECTION */}
              <div className="instructor-section">
                  <h4 className="section-header-title">
                      <FaUserGraduate className="OV-section-icon" />
                      Instructor
                  </h4>

                  <div className="instructor-container">
                      <div className="instructor-header-box">
                          <div className="OV-instructor-avatar-wrapper">
                              <img
                                  src={instructor.avatar}
                                  alt={instructor.name}
                                  className="instructor-avatar-large"
                              />
                          </div>

                          <div className="instructor-details">
                              <h3 className="instructor-name-large">{instructor.name}</h3>
                              <p className="instructor-subtitle">{instructor.title}</p>

                              <div className="instructor-social-links">
                                  <a href="#" className="social-link" title="Twitter">
                                      <span>𝕏</span>
                                  </a>
                                  <a href="#" className="social-link" title="Facebook">
                                      <span>f</span>
                                  </a>
                                  <a href="#" className="social-link" title="LinkedIn">
                                      <span>in</span>
                                  </a>
                                  <a href="#" className="social-link" title="YouTube">
                                      <span>▶</span>
                                  </a>
                                  <a href="#" className="social-link" title="Website">
                                      <span>🔗</span>
                                  </a>
                              </div>
                          </div>
                      </div>

                      <p className="instructor-bio-text">{instructor.bio}</p>
                  </div>
              </div>
          </div>

  );
}

export default OverviewTab;