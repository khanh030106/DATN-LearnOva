import Statistics from "./statistics/Statistics";
import "./Dashboard.css";
import GrowthChart from "./growthChart/GrowthChart";
import RoleDistribution from "./roleDistribution/RoleDistribution";
import UserRow from "./userRow/UserRow";
import TeacherRow from "./teacherRow/TeacherRow";
import ActivityRow from "./activityRow/ActivityRow";
import overviewIllustration from "../../../assets/dashboard/admin-overview-illustration.png";

const Dashboard = () => {
  return (
    <div className="adminDashboard">
      <div className="adminDashboardContent">
        <section className="adminDashboardOverview" aria-label="Admin overview">
          <div className="adminDashboardIllustration">
            <img src={overviewIllustration} alt="Admin overview illustration" />
          </div>

          <div className="adminDashboardIntro">
            <h1>Overview</h1>
            <p>Welcome back, Hieu. Here is what is happening with your platform today.</p>
          </div>
        </section>

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
