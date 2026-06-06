import "./Vouchers.css";
import VoucherCards from "./voucherCard/VoucherCards.jsx";
import VoucherChart from "./voucherChart/VoucherChart.jsx";
import VoucherCampaignChart from "./voucherCampaignChart/VoucherCampaignChart.jsx";
import VoucherTable from "./voucherTable/VoucherTable.jsx";
import VoucherHistory from "./voucherHistory/VoucherHistory.jsx";

const Vouchers = () => {
  return (
    <section className="vouchersPage">
      <VoucherCards />
      <div className="voucherChartsRow">
        <div className="voucherChartColumn">
          <VoucherChart />
        </div>
        <div className="voucherChartColumn">
          <VoucherCampaignChart />
        </div>
      </div>
      <VoucherTable />
      <VoucherHistory />
    </section>
  );
};

export default Vouchers;
