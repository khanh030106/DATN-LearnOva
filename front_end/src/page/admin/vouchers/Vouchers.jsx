import { useState } from "react";
import "./Vouchers.css";
import VoucherCards from "./voucherCard/VoucherCards.jsx";
import VoucherChart from "./voucherChart/VoucherChart.jsx";
import VoucherCampaignChart from "./voucherCampaignChart/VoucherCampaignChart.jsx";
import VoucherTable from "./voucherTable/VoucherTable.jsx";
import VoucherHistory from "./voucherHistory/VoucherHistory.jsx";
import VoucherCreate from "./voucherCreate/VoucherCreate.jsx";

const Vouchers = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
      <VoucherTable onCreateVoucher={() => setIsCreateOpen(true)} />
      <VoucherHistory />

      {isCreateOpen && (
        <div
          className="voucherModalBackdrop"
          role="presentation"
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className="voucherModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="voucher-create-title"
            onClick={(event) => event.stopPropagation()}
          >
            <VoucherCreate onClose={() => setIsCreateOpen(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Vouchers;
