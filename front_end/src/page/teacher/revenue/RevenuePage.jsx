import { useState } from "react";
import { ArrowDownToLine, CalendarDays, CreditCard, DollarSign, TrendingUp, Wallet } from "lucide-react";
import "./RevenuePage.css";

const periodOptions = [
  { label: "Ngay", value: "day" },
  { label: "Tuan", value: "week" },
  { label: "Thang", value: "month" },
];

const revenueData = {
  day: {
    label: "Hom nay",
    chartTitle: "Bieu do doanh thu ngay",
    available: "4.250.000d",
    periodRevenue: "1.840.000d",
    netProfit: "950.000d",
    trendNote: "+6.4% so voi hom qua",
    profitNote: "Sau phi nen tang va khuyen mai",
    chart: [24, 38, 30, 58, 46, 76, 64],
  },
  week: {
    label: "Tuan nay",
    chartTitle: "Bieu do doanh thu tuan",
    available: "42.500.000d",
    periodRevenue: "18.240.000d",
    netProfit: "8.850.000d",
    trendNote: "+12.5% so voi tuan truoc",
    profitNote: "Loi nhuan tu cac khoa hoc dang ban",
    chart: [22, 40, 34, 66, 52, 84, 72],
  },
  month: {
    label: "Thang nay",
    chartTitle: "Bieu do doanh thu thang",
    available: "126.800.000d",
    periodRevenue: "72.430.000d",
    netProfit: "38.920.000d",
    trendNote: "+18.2% so voi thang truoc",
    profitNote: "Tong hop doanh thu sau doi soat",
    chart: [30, 44, 39, 70, 64, 92, 86],
  },
};

const transactions = [
  {
    title: "Ban khoa hoc",
    detail: "Triet hoc phuong Dong (Ma: #124)",
    amount: "+850.000d",
    time: "2 gio truoc",
    tone: "green",
  },
  {
    title: "Hoan phi khoa hoc",
    detail: "Ky nang nghien cuu (Ma: #119)",
    amount: "-320.000d",
    time: "6 gio truoc",
    tone: "blue",
  },
  {
    title: "Ban khoa hoc",
    detail: "Tu duy phan bien (Ma: #123)",
    amount: "+420.000d",
    time: "1 ngay truoc",
    tone: "green",
  },
];

const buildChartPoints = (values) => {
  const maxValue = Math.max(...values);
  return values
    .map((value, index) => {
      const x = 20 + index * (360 / (values.length - 1));
      const y = 150 - (value / maxValue) * 118;
      return `${x},${y}`;
    })
    .join(" ");
};

const RevenuePage = () => {
  const [period, setPeriod] = useState("week");
  const activeData = revenueData[period];

  return (
    <section className="teacher-page teacher-revenue-page">
      <div className="teacher-revenue-header">
        <div>
          <h1>Thu nhap</h1>
          <p>Toan canh tinh hinh tai chinh va loi nhuan tu tri thuc cua ban.</p>
        </div>

        <div className="teacher-revenue-actions">
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
            <ArrowDownToLine size={19} />
            Xuat bao cao
          </button>
        </div>
      </div>

      <div className="teacher-revenue-summary-grid">
        <article className="teacher-revenue-card">
          <span className="teacher-revenue-card__icon teacher-revenue-card__icon--blue">
            <Wallet size={26} />
          </span>
          <small>So du kha dung</small>
          <strong>{activeData.available}</strong>
          <p>Co the doi soat trong ky hien tai</p>
        </article>

        <article className="teacher-revenue-card">
          <span className="teacher-revenue-card__icon teacher-revenue-card__icon--green">
            <TrendingUp size={26} />
          </span>
          <small>Doanh thu {activeData.label.toLowerCase()}</small>
          <strong>{activeData.periodRevenue}</strong>
          <p>{activeData.trendNote}</p>
        </article>

        <article className="teacher-revenue-card">
          <span className="teacher-revenue-card__icon teacher-revenue-card__icon--gold">
            <DollarSign size={28} />
          </span>
          <small>Loi nhuan uoc tinh</small>
          <strong>{activeData.netProfit}</strong>
          <p>{activeData.profitNote}</p>
        </article>
      </div>

      <div className="teacher-revenue-main-grid">
        <article className="teacher-revenue-chart-card">
          <header>
            <h2>{activeData.chartTitle}</h2>
            <span>
              <CalendarDays size={16} />
              {activeData.label}
            </span>
          </header>

          <div className="teacher-revenue-chart" aria-label={`${activeData.chartTitle} chart`}>
            <svg viewBox="0 0 400 170" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="revenueChartFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#003f98" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#003f98" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`M20,150 L${buildChartPoints(activeData.chart)} L380,150 Z`} fill="url(#revenueChartFill)" />
              <polyline points={buildChartPoints(activeData.chart)} fill="none" stroke="#003f98" strokeWidth="4" />
            </svg>
          </div>
        </article>

        <article className="teacher-revenue-history-card">
          <h2>Lich su giao dich</h2>
          <div className="teacher-revenue-history-list">
            {transactions.map((transaction) => (
              <div key={`${transaction.title}-${transaction.time}`} className="teacher-revenue-history-item">
                <span className={`teacher-revenue-history-item__icon teacher-revenue-history-item__icon--${transaction.tone}`}>
                  <CreditCard size={20} />
                </span>
                <div>
                  <strong>{transaction.title}</strong>
                  <p>{transaction.detail}</p>
                </div>
                <div className="teacher-revenue-history-item__amount">
                  <strong>{transaction.amount}</strong>
                  <time>{transaction.time}</time>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default RevenuePage;
