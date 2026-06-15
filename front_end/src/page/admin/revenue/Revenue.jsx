import RevenueCard from "./revenueCard/RevenueCard.jsx";
import RevenueChart from "./revenueChart/RevenueChart.jsx";
import RevenueDonut from "./revenueDonut/RevenueDonut.jsx";
import "./Revenue.css";

const Revenue = () => {
  return (
    <div className="revenuePage">
      <div className="revenuePageInner">
        <RevenueCard />
        <nav className="revenueQuickNav" aria-label="Revenue detail pages">
          <span className="revenueQuickNavItem">View top revenue tables</span>
          <span className="revenueQuickNavItem">View transaction details</span>
        </nav>
        <div className="revenueOverviewRow">
          <RevenueChart />
          <RevenueDonut />
        </div>
      </div>
    </div>
  );
};

export default Revenue;
