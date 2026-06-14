import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import RevenueCard from "./revenueCard/RevenueCard.jsx";
import RevenueChart from "./revenueChart/RevenueChart.jsx";
import RevenueDonut from "./revenueDonut/RevenueDonut.jsx";
import revenueOverviewImage from "../../../assets/dashboard/revenue.png";
import "./Revenue.css";

const Revenue = () => {
  return (
    <div className="revenuePage">
      <div className="revenuePageInner">
        <div className="revenueHero">
          <div className="revenueHeroImageWrap">
            <img
              className="revenueHeroImage"
              src={revenueOverviewImage}
              alt="Revenue overview"
            />
          </div>

          <div className="revenueHeroText">
            <h1>Revenue</h1>
            <p>Track and analyze your platform revenue</p>
            <span>
              <ShieldCheck size={16} aria-hidden="true" />
              Monitor your earnings and financial performance
            </span>
          </div>
        </div>

        <RevenueCard />
        <nav className="revenueQuickNav" aria-label="Revenue detail pages">
          <Link to="/learnova/admin/revenue/top-rankings">
            View top revenue tables
          </Link>
          <Link to="/learnova/admin/revenue/transactions">
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
