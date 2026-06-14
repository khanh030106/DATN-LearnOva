import UserTrendChart from "./userTrendChart/UserTrendChart.jsx";
import CourseProgressChart from "./courseProgressChart/CourseProgressChart.jsx";
import RevenueChart from "./revenueChart/RevenueChart.jsx";
import VoucherChart from "./voucherChart/VoucherChart.jsx";
import "./DashboardTab.css";

const DashboardTab = () => {
  return (
    <div className="dashboardTabContent">
      <div className="dashboardChartsGrid">
        <UserTrendChart />
        <CourseProgressChart />
        <RevenueChart />
        <VoucherChart />
      </div>
    </div>
  );
};

export default DashboardTab;
