import TopCourseRevenue from "./topCourseRevenue/TopCourseRevenue.jsx";
import TopTeacherRevenue from "./topTeacherRevenue/TopTeacherRevenue.jsx";
import "./Revenue.css";

const RevenueTopRankings = () => {
  return (
    <div className="revenuePage">
      <div className="revenuePageInner">
        <div className="revenueDetailHeader">
          <div>
            <h2>Revenue Ranking Tables</h2>
            <p>Review course and instructor earning performance in full-width tables.</p>
          </div>
          <span className="revenueDetailBack">Back to overview</span>
        </div>

        <div className="revenueDetailStack">
          <TopCourseRevenue />
          <TopTeacherRevenue />
        </div>
      </div>
    </div>
  );
};

export default RevenueTopRankings;
