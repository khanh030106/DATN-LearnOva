import NewUsersChart from "./newUsersChart/NewUsersChart.jsx";
import ActiveUsersChart from "./activeUsersChart/ActiveUsersChart.jsx";
import RoleDistributionChart from "./roleDistributionChart/RoleDistributionChart.jsx";
import ConversionChart from "./conversionChart/ConversionChart.jsx";
import "./UsersTab.css";

const UsersTab = () => {
  return (
    <div className="usersTabContent">
      <div className="usersChartsGrid">
        <NewUsersChart />
        <ActiveUsersChart />
        <RoleDistributionChart />
        <ConversionChart />
      </div>
    </div>
  );
};

export default UsersTab;
