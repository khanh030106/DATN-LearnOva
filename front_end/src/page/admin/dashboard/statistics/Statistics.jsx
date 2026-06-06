import {
  BookOpen,
  GraduationCap,
  SquareUserRound,
  CircleDollarSign,
} from "lucide-react";
import "./Statistics.css";

const statisticsData = [
  {
    id: "users",
    label: "Total Users",
    value: "25,480",
    note: "* latest updated user count",
    change: "+12%",
    changeColor: "success",
    icon: SquareUserRound,
  },
  {
    id: "teachers",
    label: "Total Teachers",
    value: "1,284",
    note: "* latest updated teacher count",
    change: "+5%",
    changeColor: "success",
    icon: GraduationCap,
  },
  {
    id: "courses",
    label: "Total Courses",
    value: "3,560",
    note: "* latest updated course count",
    change: "+8%",
    changeColor: "success",
    icon: BookOpen,
  },
  {
    id: "revenue",
    label: "Total Revenue",
    value: "1.25B VND",
    note: "* latest updated revenue count",
    change: "+15%",
    changeColor: "info",
    icon: CircleDollarSign,
  },
];

const Statistics = () => {
  return (
    <section className="dashboardStatistics" aria-label="Thống kê tổng quan">
      {statisticsData.map((item) => {
        const Icon = item.icon;

        return (
          <article key={item.id} className="dashboardStatisticsCard">
            <div className="dashboardStatisticsCardIcon">
              <Icon size={22} strokeWidth={2.2} aria-hidden="true" />
            </div>

            <div className="dashboardStatisticsCardBody">
              <div className="dashboardStatisticsCardHeader">
                <h3 className="dashboardStatisticsCardLabel">{item.label}</h3>

                <span
                  className={`dashboardStatisticsCardChange dashboardStatisticsCardChange--${item.changeColor}`}
                >
                  {item.change}
                </span>
              </div>

              <div className="dashboardStatisticsCardValue">{item.value}</div>

              <p className="dashboardStatisticsCardNote">{item.note}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Statistics;
