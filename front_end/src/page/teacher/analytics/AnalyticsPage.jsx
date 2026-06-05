import { BarChart3, Clock3, Gauge, PieChart, Target, TriangleAlert, Zap } from "lucide-react";
import "./AnalyticsPage.css";

const metrics = [
  {
    label: "Ti le hoan thanh",
    value: "74.2%",
    note: "Trung binh he thong",
    icon: Target,
    tone: "blue",
  },
  {
    label: "Do hai long",
    value: "4.9/5",
    note: "Dua tren 1.2k phan hoi",
    icon: Zap,
    tone: "gold",
  },
  {
    label: "Thoi gian hoc TB",
    value: "42m",
    note: "Moi phien hoc cua hoc vien",
    icon: Clock3,
    tone: "green",
  },
  {
    label: "Ti le bo hoc",
    value: "12.4%",
    note: "Tap trung o Module 3",
    icon: TriangleAlert,
    tone: "red",
  },
];

const completionByCourse = [
  { label: "Triet hoc", value: 82, tone: "blue" },
  { label: "Khoa hoc", value: 65, tone: "slate" },
  { label: "Lich su", value: 74, tone: "slate" },
];

const demographics = [
  { label: "Viet Nam", value: 72, tone: "blue" },
  { label: "Hoc sinh/Sinh vien", value: 45, tone: "sky" },
  { label: "Duoi 25 tuoi", value: 58, tone: "violet" },
  { label: "Nguoi di lam", value: 38, tone: "slate" },
];

const AnalyticsPage = () => {
  return (
    <section className="teacher-page teacher-analytics-page">
      <div className="teacher-analytics-grid">
        {metrics.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.label} className="teacher-analytics-stat">
              <span className={`teacher-analytics-stat__icon teacher-analytics-stat__icon--${item.tone}`}>
                <Icon size={24} />
              </span>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </article>
          );
        })}
      </div>

      <div className="teacher-analytics-details">
        <article className="teacher-analytics-panel teacher-analytics-panel--completion">
          <header>
            <span className="teacher-analytics-panel__icon teacher-analytics-panel__icon--blue">
              <BarChart3 size={28} />
            </span>
            <h2>Ti le hoan thanh theo khoa hoc</h2>
          </header>

          <div className="teacher-analytics-course-chart">
            {completionByCourse.map((item) => (
              <div key={item.label} className="teacher-analytics-course-row">
                <strong>{item.label}</strong>
                <div>
                  <span
                    className={`teacher-analytics-course-row__bar teacher-analytics-course-row__bar--${item.tone}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="teacher-analytics-panel teacher-analytics-panel--demographics">
          <header>
            <span className="teacher-analytics-panel__icon teacher-analytics-panel__icon--gold">
              <PieChart size={28} />
            </span>
            <h2>Chi tiet nhan khau hoc</h2>
          </header>

          <div className="teacher-analytics-demographic-list">
            {demographics.map((item) => (
              <div key={item.label} className="teacher-analytics-demographic-item">
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.value}%</span>
                </div>
                <em>
                  <i
                    className={`teacher-analytics-demographic-item__bar teacher-analytics-demographic-item__bar--${item.tone}`}
                    style={{ width: `${item.value}%` }}
                  />
                </em>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="teacher-analytics-focus">
        <span>
          <Gauge size={22} />
        </span>
        <div>
          <strong>Goi y toi uu</strong>
          <p>Module 3 co dau hieu giam tuong tac. Nen them bai tap ngan va phan hoi nhanh de cai thien ti le hoan thanh.</p>
        </div>
      </article>
    </section>
  );
};

export default AnalyticsPage;
