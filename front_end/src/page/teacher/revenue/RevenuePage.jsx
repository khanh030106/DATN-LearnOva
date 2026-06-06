import { useState } from "react";
import {
  ArrowDownToLine,
  CalendarDays,
  CreditCard,
  FileText,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { courses } from "../data/teacherDashboardData.js";
import "./RevenuePage.css";

const periodOptions = [
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "90 days", value: "90d" },
  { label: "1 year", value: "1y" },
];

const metricCards = [
  {
    label: "Revenue",
    value: "₫42.500.000",
    note: "+12.5% vs previous 30 days",
    tone: "blue",
    icon: Wallet,
    sparkline: [18, 24, 23, 32, 29, 42, 36],
  },
  {
    label: "New Students",
    value: "820",
    note: "+8.3% vs previous 30 days",
    tone: "green",
    icon: Users,
    sparkline: [14, 20, 28, 24, 21, 34, 30],
  },
  {
    label: "Orders",
    value: "352",
    note: "+10.7% vs previous 30 days",
    tone: "purple",
    icon: FileText,
    sparkline: [24, 18, 25, 22, 34, 27, 30],
  },
  {
    label: "Average Rating",
    value: "4.8 / 5",
    note: "+0.2 points vs previous 30 days",
    tone: "gold",
    icon: Star,
    bars: [22, 35, 25, 48, 31, 56, 75],
  },
];

const revenueChart = [6, 9, 15, 12, 14, 18, 15, 17, 23, 19, 21, 26, 24, 29, 25, 22, 23, 21, 19, 27, 26, 28, 27, 30, 28, 31, 36, 37, 43, 41];
const previousRevenueChart = [5, 8, 11, 10, 12, 11, 13, 12, 14, 15, 15, 17, 18, 16, 19, 18, 19, 17, 16, 19, 18, 17, 20, 19, 18, 20, 23, 26, 28, 30];

const topCourses = [
  {
    title: "React Masterclass",
    subtitle: "From Zero to Hero",
    image: courses[0].image,
    revenue: "₫24.500.000",
    students: 421,
    trend: "+15.2%",
    trendTone: "up",
  },
  {
    title: "Python for Beginners",
    subtitle: "The Complete Guide",
    image: courses[1].image,
    revenue: "₫18.200.000",
    students: 358,
    trend: "+9.1%",
    trendTone: "up",
  },
  {
    title: "UI/UX Design",
    subtitle: "Fundamentals",
    image: courses[2].image,
    revenue: "₫15.800.000",
    students: 289,
    trend: "+7.3%",
    trendTone: "up",
  },
  {
    title: "JavaScript",
    subtitle: "Advanced Concepts",
    image: courses[0].image,
    revenue: "₫12.450.000",
    students: 245,
    trend: "-1.2%",
    trendTone: "down",
  },
  {
    title: "Node.js",
    subtitle: "Backend Developer",
    image: courses[1].image,
    revenue: "₫9.850.000",
    students: 187,
    trend: "+3.6%",
    trendTone: "up",
  },
];

const transactions = [
  { student: "Nguyen Van A", course: "React Masterclass", amount: "₫499.000", method: "Momo", time: "31 May, 2026" },
  { student: "Tran Thi B", course: "Python for Beginners", amount: "₫399.000", method: "VNPay", time: "31 May, 2026" },
  { student: "Le Minh C", course: "UI/UX Design", amount: "₫599.000", method: "Credit Card", time: "30 May, 2026" },
  { student: "Pham Hoang D", course: "JavaScript Advanced", amount: "₫499.000", method: "Momo", time: "30 May, 2026" },
  { student: "Do Thu H", course: "Node.js Backend", amount: "₫399.000", method: "VNPay", time: "29 May, 2026" },
];

const chartLabels = ["1 May", "6 May", "11 May", "16 May", "21 May", "26 May", "31 May"];

const buildLinePoints = (values, width = 720, height = 230) => {
  const maxValue = Math.max(...values);
  const step = width / (values.length - 1);

  return values
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / maxValue) * (height - 18);
      return `${x},${y}`;
    })
    .join(" ");
};

const Sparkline = ({ values, tone }) => (
  <svg className="teacher-revenue-sparkline" viewBox="0 0 110 54" aria-hidden="true">
    <defs>
      <linearGradient id={`sparkline-${tone}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d={`M0,52 L${buildLinePoints(values, 110, 52)} L110,52 Z`} fill={`url(#sparkline-${tone})`} />
    <polyline points={buildLinePoints(values, 110, 52)} fill="none" stroke="currentColor" strokeWidth="2.5" />
  </svg>
);

const MetricCard = ({ metric }) => {
  const Icon = metric.icon;

  return (
    <article className={`teacher-revenue-metric teacher-revenue-metric--${metric.tone}`}>
      <div className="teacher-revenue-metric__icon">
        <Icon size={21} />
      </div>
      <div>
        <span>{metric.label}</span>
        <strong>{metric.value}</strong>
        <small>{metric.note}</small>
      </div>
      {metric.bars ? (
        <div className="teacher-revenue-mini-bars" aria-hidden="true">
          {metric.bars.map((height, index) => (
            <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
          ))}
        </div>
      ) : (
        <Sparkline values={metric.sparkline} tone={metric.tone} />
      )}
    </article>
  );
};

const RevenuePage = () => {
  const [period, setPeriod] = useState("30d");
  const activeLine = buildLinePoints(revenueChart);
  const previousLine = buildLinePoints(previousRevenueChart);

  return (
    <section className="teacher-page teacher-revenue-page">
      <header className="teacher-revenue-topbar">
        <div>
          <h1>Revenue</h1>
          <p>Track course revenue and instructor performance.</p>
        </div>

        <div className="teacher-revenue-actions">
          <button className="teacher-revenue-date" type="button">
            <CalendarDays size={15} />
            01 May - 31 May, 2026
          </button>

          <div className="teacher-revenue-periods" aria-label="Filter revenue by period">
            {periodOptions.map((option) => (
              <button
                key={option.value}
                className={period === option.value ? "teacher-revenue-periods__item--active" : ""}
                type="button"
                onClick={() => setPeriod(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button className="teacher-revenue-export" type="button">
            <ArrowDownToLine size={16} />
            Export report
          </button>
        </div>
      </header>

      <div className="teacher-revenue-metrics-grid">
        {metricCards.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="teacher-revenue-dashboard-grid">
        <article className="teacher-revenue-panel teacher-revenue-chart-panel">
          <header className="teacher-revenue-panel__header">
            <h2>Revenue in the last 30 days</h2>
            <select aria-label="Chart grouping" defaultValue="day">
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
            </select>
          </header>

          <div className="teacher-revenue-chart-shell">
            <div className="teacher-revenue-y-axis" aria-hidden="true">
              <span>50M</span>
              <span>40M</span>
              <span>30M</span>
              <span>20M</span>
              <span>10M</span>
              <span>0</span>
            </div>
            <div className="teacher-revenue-chart-area">
              <div className="teacher-revenue-chart-legend">
                <span className="teacher-revenue-chart-legend__solid">Revenue</span>
                <span className="teacher-revenue-chart-legend__dashed">Previous 30 days</span>
              </div>
              <svg viewBox="0 0 720 230" role="img" aria-label="Revenue line chart">
                <defs>
                  <linearGradient id="teacherRevenueFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`M0,230 L${activeLine} L720,230 Z`} fill="url(#teacherRevenueFill)" />
                <polyline points={previousLine} fill="none" stroke="#93c5fd" strokeDasharray="7 7" strokeWidth="3" />
                <polyline points={activeLine} fill="none" stroke="#2563eb" strokeWidth="4" />
              </svg>
              <div className="teacher-revenue-x-axis" aria-hidden="true">
                {chartLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </div>

          <footer className="teacher-revenue-chart-footer">
            <div>
              <CalendarDays size={18} />
              <span>Highest revenue day</span>
              <strong>29 May, 2026</strong>
              <small>₫5.250.000</small>
            </div>
            <div>
              <CreditCard size={18} />
              <span>Total refunds</span>
              <strong>₫920.000</strong>
              <small>2.2% of orders</small>
            </div>
            <div>
              <Wallet size={18} />
              <span>Average order value</span>
              <strong>₫120.739</strong>
              <small>+7.5% vs previous 30 days</small>
            </div>
          </footer>
        </article>

        <article className="teacher-revenue-panel teacher-revenue-top-courses">
          <header className="teacher-revenue-panel__header">
            <h2>Top revenue courses</h2>
            <button type="button">View all</button>
          </header>

          <div className="teacher-revenue-course-list">
            {topCourses.map((course) => (
              <div key={course.title} className="teacher-revenue-course-row">
                <img src={course.image} alt="" />
                <div>
                  <strong>{course.title}</strong>
                  <span>{course.subtitle}</span>
                </div>
                <div>
                  <strong>{course.revenue}</strong>
                  <span>Revenue</span>
                </div>
                <div>
                  <strong>{course.students}</strong>
                  <span>Students</span>
                </div>
                <b className={`teacher-revenue-trend teacher-revenue-trend--${course.trendTone}`}>{course.trend}</b>
              </div>
            ))}
          </div>
        </article>

        <article className="teacher-revenue-panel teacher-revenue-transactions">
          <header className="teacher-revenue-panel__header">
            <h2>Latest transactions</h2>
          </header>

          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={`${transaction.student}-${transaction.course}`}>
                  <td>{transaction.student}</td>
                  <td>{transaction.course}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.method}</td>
                  <td>{transaction.time}</td>
                  <td>
                    <span>Completed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button">View all transactions</button>
        </article>

        <article className="teacher-revenue-panel teacher-revenue-payout">
          <header className="teacher-revenue-panel__header">
            <h2>Upcoming payout</h2>
          </header>

          <div className="teacher-revenue-payout-card">
            <div>
              <span>Next payout date</span>
              <strong>12 Jun, 2026</strong>
            </div>
            <div>
              <span>Estimated amount</span>
              <strong>₫18.250.000</strong>
            </div>
            <div className="teacher-revenue-payout-progress" aria-hidden="true">
              <span />
            </div>
            <small>Payout schedule: Monthly on day 12</small>
            <button type="button">View details</button>
            <div className="teacher-revenue-payout-visual" aria-hidden="true">
              <Wallet size={58} />
              <TrendingUp size={34} />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default RevenuePage;
