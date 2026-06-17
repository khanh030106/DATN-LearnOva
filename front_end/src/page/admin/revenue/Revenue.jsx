import { Link } from "react-router-dom";
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
          <Link className="revenueQuickNavItem" to="/learnova/admin/revenue/top-rankings">
            View top revenue tables
          </Link>
          <Link className="revenueQuickNavItem" to="/learnova/admin/revenue/transactions">
            View transaction details
          </Link>
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
