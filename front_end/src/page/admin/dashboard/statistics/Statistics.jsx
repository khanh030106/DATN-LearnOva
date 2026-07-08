import {
  BookOpen,
  GraduationCap,
  SquareUserRound,
  CircleDollarSign,
} from "lucide-react";
import "./Statistics.css";

const createStatisticsData = (data, loading) => [
  {
    id: "users",
    label: "Total Users",
    value: loading ? "..." : data.totalUsers,
    change: "+12%",
    changeColor: "success",
    icon: SquareUserRound,
  },
  {
    id: "teachers",
    label: "Total Teachers",
    value: loading ? "..." : data.totalTeachers,
    change: "+5%",
    changeColor: "success",
    icon: GraduationCap,
  },
  {
    id: "courses",
    label: "Total Courses",
    value: loading ? "..." : data.totalCourses,
    change: "+8%",
    changeColor: "success",
    icon: BookOpen,
  },
  {
    id: "revenue",
    label: "Total Revenue",
    value: loading ? "..." : data.totalRevenue,
    change: "+15%",
    changeColor: "info",
    icon: CircleDollarSign,
  },
];

const Statistics = ({ data, loading = false }) => {
  const statisticsData = createStatisticsData(data, loading);

  return (
    <section className="dashboardStatistics" aria-label="Dashboard statistics">
      {statisticsData.map((item) => {
        const Icon = item.icon;

        return (
          <article key={item.id} className="dashboardStatisticsCard">
            <div className="dashboardStatisticsCardIcon">
              <Icon size={24} strokeWidth={2.2} aria-hidden="true" />
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
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Statistics;
