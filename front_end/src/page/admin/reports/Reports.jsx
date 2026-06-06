import ReportCards from "./reportCards/ReportCards.jsx";
import ReportFilter from "./reportFilter/ReportFilter.jsx";
import ReportCharts from "./reportCharts/ReportCharts.jsx";
import "./Reports.css";

const Reports = () => {
  return (
    <div className="reportsPage">
      <div className="reportsPageInner">
        <ReportCards />
        <ReportFilter />
        <ReportCharts />
      </div>
    </div>
  );
};

export default Reports;
