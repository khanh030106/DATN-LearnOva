import { useState } from "react";
import "./Vouchers.css";
import VoucherCards from "./voucherCard/VoucherCards.jsx";
import VoucherChart from "./voucherChart/VoucherChart.jsx";
import VoucherCampaignChart from "./voucherCampaignChart/VoucherCampaignChart.jsx";
import VoucherTable from "./voucherTable/VoucherTable.jsx";
import VoucherHistory from "./voucherHistory/VoucherHistory.jsx";
import VoucherCreate from "./voucherCreate/VoucherCreate.jsx";

const Vouchers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create | view | edit
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const openCreate = () => {
    setSelectedVoucher(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const openView = (voucher) => {
    setSelectedVoucher(voucher);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const openEdit = (voucher) => {
    setSelectedVoucher(voucher);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleSaved = () => {
    setRefreshKey((prev) => prev + 1);
    setIsModalOpen(false);
  };

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

      <VoucherTable
        onCreateVoucher={openCreate}
        onViewVoucher={openView}
        onEditVoucher={openEdit}
        refreshKey={refreshKey}
      />

      <VoucherHistory />

      {isModalOpen && (
        <div
          className="voucherModalBackdrop"
          role="presentation"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="voucherModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="voucher-create-title"
            onClick={(event) => event.stopPropagation()}
          >
            <VoucherCreate
              mode={modalMode}
              voucher={selectedVoucher}
              onClose={() => setIsModalOpen(false)}
              onEdit={() => setModalMode("edit")}
              onSaved={handleSaved}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Vouchers;