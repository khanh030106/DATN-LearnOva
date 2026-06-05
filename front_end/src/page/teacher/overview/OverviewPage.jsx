import { ArrowRight, Gift, Megaphone } from "lucide-react";
import {
  analytics,
  courses,
  metrics,
  notifications,
  questions,
} from "../data/teacherDashboardData.js";
import CoursePreviewCard from "./components/CoursePreviewCard.jsx";
import MetricCard from "./components/MetricCard.jsx";
import "./OverviewPage.css";

const OverviewPage = () => {
  return (
    <div className="teacher-overview">
      <section className="teacher-metrics-grid" aria-label="Teacher metrics">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="teacher-dashboard-grid">
        <div className="teacher-panel teacher-panel--courses">
          <div className="teacher-panel__header">
            <h1>Current Courses</h1>
            <a href="/learnova/teacher/courses">
              View all
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="teacher-course-preview-grid">
            {courses.slice(0, 2).map((course) => (
              <CoursePreviewCard key={course.title} course={course} />
            ))}
          </div>
        </div>

        <aside className="teacher-side-stack">
          <section className="teacher-panel">
            <div className="teacher-panel__header">
              <h2>Important Notices</h2>
              <a href="/learnova/teacher/qa">
                View all
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="teacher-notification-list">
              {notifications.map((item) => {
                const Icon = item.tone === "gold" ? Megaphone : Gift;
                return (
                  <article key={item.title} className="teacher-notification">
                    <span className={`teacher-notification__icon teacher-notification__icon--${item.tone}`}>
                      <Icon size={20} />
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                    <time>{item.time}</time>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="teacher-panel teacher-income-card">
            <div className="teacher-panel__header">
              <h2>Monthly Revenue</h2>
              <a href="/learnova/teacher/revenue">
                View details
                <ArrowRight size={16} />
              </a>
            </div>
            <strong>42.580.000 <small>VND</small></strong>
            <p>+ 8.4% vs last month</p>
            <div className="teacher-income-chart" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </section>
        </aside>
      </section>

      <section className="teacher-lower-grid">
        <div className="teacher-panel">
          <h2>Student Analytics</h2>
          <div className="teacher-donut-grid">
            {analytics.slice(0, 2).map((item) => (
              <article key={item.label} className="teacher-donut">
                <span>{item.value}</span>
                <strong>{item.label}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="teacher-panel">
          <div className="teacher-panel__header">
            <h2>Course Performance</h2>
            <a href="/learnova/teacher/analytics">
              View details
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="teacher-performance-table">
            {courses.map((course) => (
              <div key={course.title}>
                <span>{course.category}</span>
                <strong>{course.rating}</strong>
                <em>{course.completion}</em>
                <b>{course.revenue}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="teacher-panel">
          <div className="teacher-panel__header">
            <h2>Pending Q&A</h2>
            <a href="/learnova/teacher/qa">
              View all
              <ArrowRight size={16} />
            </a>
          </div>
          <article className="teacher-question-card">
            <img src={questions[0].avatar} alt={questions[0].student} />
            <div>
              <div className="teacher-question-card__top">
                <strong>{questions[0].student}</strong>
                <time>{questions[0].time}</time>
              </div>
              <small>Course: {questions[0].course}</small>
              <p>"{questions[0].question}"</p>
              <footer>
                <button>Reply</button>
                <button>Skip</button>
              </footer>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default OverviewPage;
