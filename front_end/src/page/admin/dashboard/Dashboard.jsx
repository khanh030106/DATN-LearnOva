import Statistics from "./statistics/Statistics";
import "./Dashboard.css";
import GrowthChart from "./growthChart/GrowthChart";
import RoleDistribution from "./roleDistribution/RoleDistribution";
import UserRow from "./userRow/UserRow";
import TeacherRow from "./teacherRow/TeacherRow";
import ActivityRow from "./activityRow/ActivityRow";

const Dashboard = () => {
  return (
    <div className="adminDashboard">
      <div className="adminDashboardContent">
        <Statistics />

        <div className="dashboardCharts">
          <div className="growthChartWrapper">
            <GrowthChart />
          </div>

          <div className="roleDistributionWrapper">
            <RoleDistribution />
          </div>
        </div>

        <div className="dashboardRows">
          <div className="dashboardRowItem">
            <UserRow />
          </div>

          <hr className="dashboardRowSeparator" />

          <div className="dashboardRowItem">
            <TeacherRow />
          </div>

          <hr className="dashboardRowSeparator" />

          <div className="dashboardRowItem">
            <ActivityRow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
