import { createElement } from "react";
import RevenueCategoryChart from "./RevenueCategoryChart/RevenueCategoryChart.jsx";
import VoucherStructureChart from "./VoucherStructureChart/VoucherStructureChart.jsx";
import "./RevenueTab.css";

const charts = [
  { id: "revenue-category", component: RevenueCategoryChart },
  { id: "voucher-structure", component: VoucherStructureChart },
];

const RevenueTab = () => {
  return (
    <div className="revenueTabContent">
      <div className="revenueChartsGrid">
        {charts.map(({ id, component: ChartComponent }) => (
          createElement(ChartComponent, { key: id })
        ))}
      </div>
    </div>
  );
};

export default RevenueTab;
