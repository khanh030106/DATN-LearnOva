import { Link } from "react-router-dom";
import RevenueCategory from "./revenueCategory/RevenueCategory.jsx";
import RevenueRecords from "./revenueRecords/RevenueRecords.jsx";
import TransactionLog from "./transactionLog/TransactionLog.jsx";
import "./Revenue.css";

const RevenueTransactions = () => {
  return (
    <div className="revenuePage">
      <div className="revenuePageInner">
        <div className="revenueDetailHeader">
          <div>
            <h2>Revenue Transaction Details</h2>
            <p>Inspect transaction logs, category metrics, and system revenue records.</p>
          </div>
          <Link className="revenueDetailBack" to="/learnova/admin/revenue">
            Back to overview
          </Link>
        </div>

        <div className="revenueDetailGrid">
          <div className="revenueDetailMain">
            <TransactionLog />
          </div>
          <div className="revenueDetailSide">
            <RevenueCategory />
            <RevenueRecords />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTransactions;
