import {
  BarChart3,
  Bell,
  BookOpenCheck,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Gift,
  Megaphone,
  Settings,
  Star,
  TrendingUp,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";
import { courses, metrics, notifications, questions, teacherProfile } from "../data/teacherDashboardData.js";
import { overviewLinks } from "./overviewConfig.js";
import "./OverviewPage.css";

const metricIcons = {
  "Total Students": Users,
  "Avg. Rating": Star,
  Revenue: WalletCards,
  Completion: TrendingUp,
};

const metricSeries = {
  "Total Students": "M10,44 C22,28 34,48 48,32 C62,16 72,42 86,28 C100,14 110,34 124,18 C138,2 146,20 158,8",
  "Avg. Rating": "M10,42 C22,48 34,34 48,38 C62,42 68,12 84,22 C100,32 104,12 120,18 C136,24 142,10 158,8",
  Revenue: "M10,44 C24,40 36,46 50,30 C64,14 72,18 86,38 C100,58 110,8 126,24 C142,40 146,12 158,14",
  Completion: "M10,44 C22,28 34,48 50,30 C66,12 72,44 88,28 C104,12 112,42 126,24 C140,6 148,28 158,8",
};

const statTones = ["blue", "gold", "green", "violet"];

const quickActions = [
  { label: "Create Course", icon: BookOpenCheck, tone: "blue", href: overviewLinks.courses },
  { label: "Upload Lecture", icon: WalletCards, tone: "green", href: overviewLinks.courses },
  { label: "Create Quiz", icon: ClipboardCheck, tone: "violet", href: overviewLinks.qa },
  { label: "View Analytics", icon: BarChart3, tone: "orange", href: overviewLinks.analytics },
];

const recentEnrollments = [
  { name: "Nguyen Van A", course: "Web Development Bootcamp", time: "10 minutes ago", avatar: questions[0].avatar },
  { name: "Tran Thi B", course: "Data Science Fundamentals", time: "1 hour ago", avatar: questions[1].avatar },
  { name: "Le Hoang C", course: "UI/UX Design Mastery", time: "2 hours ago", avatar: questions[0].avatar },
  { name: "Pham My D", course: "Digital Marketing Strategy", time: "3 hours ago", avatar: questions[1].avatar },
];

const notices = [
  ...notifications,
  {
    title: "System maintenance",
    detail: "Scheduled maintenance on May 25, 2:00 AM - 4:00 AM.",
    time: "2 days ago",
    tone: "violet",
  },
];

const headerInsights = ["+24 new students this week", "Revenue increased by 8.4%"];

const formatCompletion = (value) => Number.parseInt(value, 10) || 0;

const MetricCard = ({ metric, index }) => {
  const tone = statTones[index] || "blue";
  const Icon = metricIcons[metric.label] || TrendingUp;
  const value = metric.label === "Completion" ? "76.2%" : metric.value;
  const label = metric.label === "Completion" ? "Completion Rate" : metric.label;
  const note = metric.note.replace("+", "");

  return (
    <article className={`overview-card overview-metric overview-tone-${tone}`}>
      <div className="overview-metric__heading">
        <span>
          <Icon size={20} />
        </span>
        <p>{label}</p>
      </div>
      <strong>
        {value}
        {metric.suffix && <small>{metric.suffix}</small>}
      </strong>
      <em>↑ {note}</em>
      <svg className="overview-sparkline" viewBox="0 0 168 58" role="img" aria-label={`${label} trend`}>
        <path className="overview-sparkline__fill" d={`${metricSeries[metric.label]} L158,58 L10,58 Z`} />
        <path className="overview-sparkline__line" d={metricSeries[metric.label]} />
        <circle cx="158" cy="8" r="4.5" />
      </svg>
    </article>
  );
};

const DashboardHeader = () => (
  <header className="overview-hero">
    <div className="overview-hero__content">
      <div>
        <h1>Good morning, Khanh <span aria-hidden="true">👋</span></h1>
        <p>Here's what's happening with your academy today.</p>
      </div>
      <div className="overview-hero__insights" aria-label="Dashboard insights">
        {headerInsights.map((insight) => (
          <span key={insight}>{insight}</span>
        ))}
      </div>
    </div>

    <div className="overview-header-actions" aria-label="Dashboard actions">
      <button type="button" aria-label="Notifications">
        <Bell size={20} />
        <span>3</span>
      </button>
      <button type="button" aria-label="Settings">
        <Settings size={20} />
      </button>
      <button className="overview-profile-menu" type="button" aria-label="Open user menu">
        <img src={teacherProfile.avatar} alt={teacherProfile.name} />
        <strong>Khanh</strong>
        <ChevronDown size={16} />
      </button>
    </div>
  </header>
);

const RevenueChart = () => {
  const points = "M0,102 C34,88 54,102 86,72 C124,36 160,92 198,72 C236,52 252,8 294,34 C336,62 360,78 408,46 C446,20 480,56 524,18";

  return (
    <section className="overview-card overview-revenue">
      <div className="overview-panel-header">
        <div>
          <h2>Revenue Overview</h2>
          <strong>
            42.580.000 <small>VND</small>
          </strong>
          <em>↑ 8.4% vs last month</em>
        </div>
        <button type="button">This Month</button>
      </div>
      <div className="overview-revenue__chart">
        <div className="overview-revenue__axis">
          <span>60M</span>
          <span>45M</span>
          <span>30M</span>
          <span>15M</span>
          <span>0</span>
        </div>
        <svg viewBox="0 0 524 126" preserveAspectRatio="none" aria-label="Revenue trend for May">
          <defs>
            <linearGradient id="overviewRevenueFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <path d={`${points} L524,126 L0,126 Z`} fill="url(#overviewRevenueFill)" />
          <path d={points} fill="none" stroke="#2563eb" strokeLinecap="round" strokeWidth="3" />
          <line x1="416" x2="416" y1="0" y2="126" />
          <circle cx="416" cy="50" r="6" />
        </svg>
        <div className="overview-revenue__tooltip">
          <b>May 24</b>
          <span>42.5M VND</span>
        </div>
        <div className="overview-revenue__months">
          <span>May 1</span>
          <span>May 7</span>
          <span>May 14</span>
          <span>May 21</span>
          <span>May 28</span>
          <span>May 31</span>
        </div>
      </div>
    </section>
  );
};

const QuickActions = () => (
  <section className="overview-card overview-quick">
    <h2>Quick Actions</h2>
    <div className="overview-quick__list">
      {quickActions.map((action) => {
        const Icon = action.icon;

        return (
          <Link key={action.label} className="overview-action" to={action.href}>
            <span className={`overview-action__icon overview-action__icon--${action.tone}`}>
              <Icon size={18} />
            </span>
            <strong>{action.label}</strong>
            <ChevronRight size={18} />
          </Link>
        );
      })}
    </div>
  </section>
);

const ImportantNotices = () => {
  const noticeIcons = [Megaphone, Gift, Bell];

  return (
    <section className="overview-card overview-notices">
      <div className="overview-panel-title">
        <h2>Important Notices</h2>
        <Link to={overviewLinks.qa}>View all</Link>
      </div>
      <div className="overview-notices__list">
        {notices.map((notice, index) => {
          const Icon = noticeIcons[index] || Bell;

          return (
            <article key={notice.title} className={`overview-notice overview-notice--${notice.tone}`}>
              <span className="overview-notice__icon" aria-hidden="true">
                <Icon size={19} />
              </span>
              <div>
                <strong>{notice.title}</strong>
                <p>{notice.detail}</p>
              </div>
              <time>{notice.time}</time>
            </article>
          );
        })}
      </div>
    </section>
  );
};

const TopCourses = () => (
  <section className="overview-card overview-courses">
    <div className="overview-panel-title">
      <h2>Top Courses</h2>
      <Link to={overviewLinks.courses}>View all</Link>
    </div>
    <div className="overview-course-grid">
      {courses.slice(0, 2).map((course) => {
        const progress = formatCompletion(course.completion);

        return (
          <article key={course.id} className="overview-course">
            <div className="overview-course__media">
              <img src={course.image} alt={course.title} />
              <span>{course.status}</span>
            </div>
            <div className="overview-course__body">
              <small>{course.category}</small>
              <h3>{course.title}</h3>
              <div className="overview-course__goal">
                <span>Course Completion</span>
                <strong>{progress}%</strong>
              </div>
              <footer>
                <span>
                  <Users size={14} />
                  {course.students}
                </span>
                <span>
                  <Star size={14} fill="currentColor" />
                  {course.rating}
                </span>
                <div className="overview-course__progress">
                  <i style={{ width: `${progress}%` }} />
                </div>
                <b>{progress}%</b>
              </footer>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

const RecentEnrollments = () => (
  <section className="overview-card overview-enrollments">
    <div className="overview-panel-title">
      <h2>Recent Enrollments</h2>
      <Link to={overviewLinks.courses}>View all</Link>
    </div>
    <div className="overview-enrollments__list">
      {recentEnrollments.map((student) => (
        <article key={student.name} className="overview-enrollment">
          <img src={student.avatar} alt={student.name} />
          <div>
            <strong>{student.name}</strong>
            <p>{student.course}</p>
          </div>
          <time>{student.time}</time>
          <span>
            <UserPlus size={18} />
          </span>
        </article>
      ))}
    </div>
  </section>
);

const OverviewPage = () => {
  return (
    <div className="teacher-overview">
      <DashboardHeader />

      <section className="overview-metrics" aria-label="Teacher metrics">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </section>

      <section className="overview-main-grid">
        <RevenueChart />
        <QuickActions />
        <ImportantNotices />
      </section>

      <section className="overview-bottom-grid">
        <TopCourses />
        <RecentEnrollments />
      </section>

      <section className="overview-success">
        <span>
          <BarChart3 size={22} />
        </span>
        <div>
          <strong>You're doing great!</strong>
          <p>Your student engagement is 24% higher than last month.</p>
        </div>
        <Link to={overviewLinks.analytics}>
          View detailed report
          <ChevronRight size={18} />
        </Link>
      </section>
    </div>
  );
};

export default OverviewPage;
