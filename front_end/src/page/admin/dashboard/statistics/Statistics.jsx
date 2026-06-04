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
    label: "Tổng số người dùng",
    value: "25,480",
    note: "* tổng số người dùng cập nhật gần nhất",
    change: "+12%",
    changeColor: "success",
    icon: SquareUserRound,
  },
  {
    id: "teachers",
    label: "Tổng số giảng viên",
    value: "1,284",
    note: "* tổng số giảng viên cập nhật gần nhất",
    change: "+5%",
    changeColor: "success",
    icon: GraduationCap,
  },
  {
    id: "courses",
    label: "Tổng số khóa học",
    value: "3,560",
    note: "* tổng số khóa học cập nhật gần nhất",
    change: "+8%",
    changeColor: "success",
    icon: BookOpen,
  },
  {
    id: "revenue",
    label: "Tổng doanh thu",
    value: "1.25B VND",
    note: "* tổng doanh thu cập nhật gần nhất",
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
