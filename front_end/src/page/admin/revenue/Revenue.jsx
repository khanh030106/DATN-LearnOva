import RevenueCard from "./revenueCard/RevenueCard.jsx";
import RevenueChart from "./revenueChart/RevenueChart.jsx";
import RevenueDonut from "./revenueDonut/RevenueDonut.jsx";
import TopCourseRevenue from "./topCourseRevenue/TopCourseRevenue.jsx";
import TopTeacherRevenue from "./topTeacherRevenue/TopTeacherRevenue.jsx";
import RevenueRecords from "./revenueRecords/RevenueRecords.jsx";
import RevenueCategory from "./revenueCategory/RevenueCategory.jsx";
import TransactionLog from "./transactionLog/TransactionLog.jsx";
import "./Revenue.css";

const Revenue = () => {
  return (
    <div className="revenuePage">
      <div className="revenuePageInner">
        <RevenueCard />
        <div className="revenueOverviewRow">
          <RevenueChart />
          <RevenueDonut />
        </div>
        <div className="revenueTopBlocksRow">
          <TopCourseRevenue />
          <TopTeacherRevenue />
        </div>
        <div className="revenueTwoColumn">
          <div className="leftColumn">
            <TransactionLog />
          </div>
          <div className="rightColumn">
            <RevenueCategory />
            <RevenueRecords />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
