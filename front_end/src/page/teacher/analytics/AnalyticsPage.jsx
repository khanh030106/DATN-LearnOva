import { CalendarDays, Clock3, Info, Star, TrendingDown, TrendingUp, TriangleAlert, Users } from "lucide-react";
import { courses } from "../data/teacherDashboardData.js";
import "./AnalyticsPage.css";

const analyticsStats = [
  {
    label: "Completion Rate",
    value: "74.2%",
    change: "12.5%",
    compare: "vs Apr 1 - Apr 30",
    tone: "blue",
    icon: TrendingUp,
  },
  {
    label: "Average Rating",
    value: "4.9/5",
    change: "0.2",
    compare: "vs Apr 1 - Apr 30",
    tone: "gold",
    icon: Star,
  },
  {
    label: "Average Watch Time",
    value: "42m",
    change: "8.3%",
    compare: "vs Apr 1 - Apr 30",
    tone: "green",
    icon: Clock3,
  },
  {
    label: "Drop-off Rate",
    value: "12.4%",
    change: "2.1%",
    compare: "vs Apr 1 - Apr 30",
    tone: "red",
    icon: TrendingDown,
    negative: true,
  },
];

const performanceSeries = {
  completion: [48, 52, 56, 60, 61, 63, 62, 64, 66, 74, 66, 72, 69, 66, 64, 63, 66, 69, 71, 76, 74, 73, 72, 73, 76, 84, 87],
  watchTime: [32, 35, 38, 39, 45, 48, 50, 49, 52, 55, 47, 50, 46, 44, 45, 47, 49, 53, 52, 53, 54, 53, 54, 55, 56, 57, 56],
  engagement: [15, 18, 16, 17, 22, 24, 25, 26, 31, 24, 22, 25, 23, 22, 26, 29, 25, 31, 30, 31, 31, 32, 30, 30, 29, 31, 28],
};

const coursePerformance = [
  {
    title: "Eastern Philosophy",
    image: courses[0].image,
    completion: 82,
    rating: "4.9",
    trend: "up",
  },
  {
    title: "Research Skills",
    image: courses[1].image,
    completion: 76,
    rating: "4.8",
    trend: "up",
  },
  {
    title: "UI/UX Design",
    image: courses[2].image,
    completion: 71,
    rating: "4.7",
    trend: "up",
  },
  {
    title: "JavaScript Advanced",
    image: courses[0].image,
    completion: 68,
    rating: "4.6",
    trend: "down",
  },
];

const engagementItems = [
  { label: "Active students", value: "1,248", progress: 82, change: "15.8%", icon: Users, tone: "blue" },
  { label: "Lessons completed", value: "8,420", progress: 81, change: "11.2%", icon: CalendarDays, tone: "green" },
  { label: "Questions asked", value: "326", progress: 36, change: "6.7%", icon: Info, tone: "purple" },
  { label: "Reviews submitted", value: "214", progress: 34, change: "9.3%", icon: Star, tone: "gold" },
];

const attentionItems = [
  {
    title: "Module 3: The Art of Balance",
    detail: "High drop-off rate",
    value: "28%",
    label: "Drop-off rate",
    tone: "red",
  },
  {
    title: "Lesson 8: Practical Exercise",
    detail: "Low completion rate",
    value: "54%",
    label: "Completion rate",
    tone: "orange",
  },
  {
    title: "Quiz 2: Key Concepts",
    detail: "Average score below target",
    value: "62%",
    label: "Average score",
    tone: "orange",
  },
  {
    title: "Final Project",
    detail: "Many pending submissions",
    value: "32",
    label: "Pending",
    tone: "blue",
  },
];

const chartLabels = ["May 1", "May 8", "May 15", "May 22", "May 31"];

const buildChartPoints = (values) =>
  values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 720;
      const y = 230 - (value / 100) * 220;
      return `${x},${y}`;
    })
    .join(" ");

const AnalyticsStatCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <article className={`teacher-analytics-stat teacher-analytics-stat--${item.tone}`}>
      <span className="teacher-analytics-stat__icon">
        <Icon size={23} />
      </span>
      <div>
        <small>{item.label}</small>
        <strong>{item.value}</strong>
        <p className={item.negative ? "teacher-analytics-negative" : ""}>
          <span>{item.negative ? "↓" : "↑"} {item.change}</span>
          {item.compare}
        </p>
      </div>
    </article>
  );
};

const TrendLine = ({ direction }) => (
  <svg className={`teacher-analytics-trend teacher-analytics-trend--${direction}`} viewBox="0 0 58 34" aria-hidden="true">
    {direction === "down" ? (
      <polyline points="2,8 16,14 28,22 42,18 56,30" />
    ) : (
      <polyline points="2,28 16,14 28,20 42,8 56,2" />
    )}
  </svg>
);

const AnalyticsPage = () => {
  const completionLine = buildChartPoints(performanceSeries.completion);
  const watchTimeLine = buildChartPoints(performanceSeries.watchTime);
  const engagementLine = buildChartPoints(performanceSeries.engagement);

  return (
    <section className="teacher-page teacher-analytics-page">
      <header className="teacher-analytics-header">
        <div>
          <h1>Learning Analytics</h1>
          <p>Track student engagement, course performance, and learning outcomes.</p>
        </div>
        <button type="button">
          <CalendarDays size={16} />
          01 May - 31 May, 2026
        </button>
      </header>

      <div className="teacher-analytics-stat-grid">
        {analyticsStats.map((item) => (
          <AnalyticsStatCard key={item.label} item={item} />
        ))}
      </div>

      <div className="teacher-analytics-main-grid">
        <article className="teacher-analytics-panel teacher-analytics-performance">
          <header className="teacher-analytics-panel__header">
            <h2>
              Learning Performance
              <Info size={15} />
            </h2>
            <select defaultValue="30d" aria-label="Learning performance range">
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </header>

          <div className="teacher-analytics-performance-tabs">
            <button type="button" className="teacher-analytics-performance-tabs__active">
              Completion
            </button>
            <button type="button">Watch Time</button>
            <button type="button">Engagement</button>
          </div>

          <div className="teacher-analytics-chart">
            <div className="teacher-analytics-chart__legend">
              <span className="teacher-analytics-chart__legend--completion">Completion</span>
              <span className="teacher-analytics-chart__legend--watch">Watch Time</span>
              <span className="teacher-analytics-chart__legend--engagement">Engagement</span>
            </div>
            <div className="teacher-analytics-chart__body">
              <div className="teacher-analytics-chart__axis" aria-hidden="true">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
              <div className="teacher-analytics-chart__plot">
                <svg viewBox="0 0 720 230" role="img" aria-label="Learning performance chart">
                  <defs>
                    <linearGradient id="analyticsCompletionFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="analyticsEngagementFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`M0,230 L${completionLine} L720,230 Z`} fill="url(#analyticsCompletionFill)" />
                  <path d={`M0,230 L${engagementLine} L720,230 Z`} fill="url(#analyticsEngagementFill)" />
                  <polyline points={completionLine} className="teacher-analytics-chart__line teacher-analytics-chart__line--completion" />
                  <polyline points={watchTimeLine} className="teacher-analytics-chart__line teacher-analytics-chart__line--watch" />
                  <polyline points={engagementLine} className="teacher-analytics-chart__line teacher-analytics-chart__line--engagement" />
                </svg>
                <div className="teacher-analytics-chart__labels" aria-hidden="true">
                  {chartLabels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="teacher-analytics-panel teacher-analytics-course-performance">
          <header className="teacher-analytics-panel__header">
            <h2>Course Performance</h2>
            <button type="button">View all</button>
          </header>
          <div className="teacher-analytics-course-head">
            <span>Course</span>
            <span>Completion Rate</span>
            <span>Rating</span>
            <span>Trend</span>
          </div>
          <div className="teacher-analytics-course-list">
            {coursePerformance.map((course) => (
              <div key={course.title} className="teacher-analytics-course-row">
                <div>
                  <img src={course.image} alt="" />
                  <strong>{course.title}</strong>
                </div>
                <p>
                  <i style={{ width: `${course.completion}%` }} />
                </p>
                <strong>{course.completion}%</strong>
                <span>
                  <Star size={15} fill="currentColor" />
                  {course.rating}
                </span>
                <TrendLine direction={course.trend} />
              </div>
            ))}
          </div>
        </article>

        <article className="teacher-analytics-panel teacher-analytics-engagement">
          <header className="teacher-analytics-panel__header">
            <h2>
              Student Engagement
              <Info size={15} />
            </h2>
          </header>
          <div className="teacher-analytics-engagement-list">
            {engagementItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className={`teacher-analytics-engagement-item teacher-analytics-engagement-item--${item.tone}`}>
                  <span>
                    <Icon size={20} />
                  </span>
                  <strong>{item.label}</strong>
                  <p>
                    <i style={{ width: `${item.progress}%` }} />
                  </p>
                  <b>{item.value}</b>
                  <small>
                    ↑ {item.change}
                    <em>vs Apr 1 - Apr 30</em>
                  </small>
                </div>
              );
            })}
          </div>
        </article>

        <article className="teacher-analytics-panel teacher-analytics-attention">
          <header className="teacher-analytics-panel__header">
            <h2>
              Lessons Need Attention
              <Info size={15} />
            </h2>
            <button type="button">View all</button>
          </header>
          <div className="teacher-analytics-attention-list">
            {attentionItems.map((item) => (
              <button key={item.title} type="button" className={`teacher-analytics-attention-item teacher-analytics-attention-item--${item.tone}`}>
                <span>
                  <TriangleAlert size={19} />
                </span>
                <strong>
                  {item.title}
                  <small>{item.detail}</small>
                </strong>
                <b>
                  {item.value}
                  <small>{item.label}</small>
                </b>
                <i aria-hidden="true">›</i>
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default AnalyticsPage;
