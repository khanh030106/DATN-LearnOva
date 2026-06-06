import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VoucherCreate.css";

const formatCurrency = (value) => {
  const number = Number(value) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number);
};

const formatNumberInput = (value) => {
  const digits = String(value).replace(/[^0-9]/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("en-US").format(Number(digits));
};

const VoucherCreate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code: "LEARNOVA10",
    name: "Summer Learning Promotion",
    originalPrice: "2500",
    discountPercent: "10",
    useLimit: "100",
    expiryDate: "2026-12-31",
  });

  const discountAmount = useMemo(() => {
    const price = Number(form.originalPrice) || 0;
    const percent = Number(form.discountPercent) || 0;
    return Math.round((price * percent) / 100);
  }, [form.originalPrice, form.discountPercent]);

  const finalPrice = useMemo(() => {
    return Math.max((Number(form.originalPrice) || 0) - discountAmount, 0);
  }, [form.originalPrice, discountAmount]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <section className="voucherCreateSection">
      <div className="voucherCreateHeader">
        <div>
          <div className="voucherCreateTitleRow">
            <span className="voucherCreateIcon">🎟️</span>
            <h2 className="voucherCreateTitle">Promotion Setup</h2>
          </div>
          <p className="voucherCreateSubtitle">
            Enter details to create a new discount code.
          </p>
        </div>
      </div>

      <div className="voucherCreateContent">
        <div className="voucherCreateFormCard">
          <div className="voucherCreateFormRow">
            <label className="voucherCreateLabel">
              Discount Code
              <input
                type="text"
                value={form.code}
                onChange={handleChange("code")}
                className="voucherCreateInput"
              />
            </label>
            <label className="voucherCreateLabel">
              Program Name
              <input
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                className="voucherCreateInput"
              />
            </label>
          </div>

          <div className="voucherCreateFormRow">
            <label className="voucherCreateLabel">
              Original Price
              <div className="voucherInputGroup">
                <span className="voucherInputPrefix">$</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={formatNumberInput(form.originalPrice)}
                  onChange={(event) => {
                    const digits = event.target.value.replace(/[^0-9]/g, "");
                    setForm((prev) => ({ ...prev, originalPrice: digits }));
                  }}
                  className="voucherCreateInput voucherCreateCurrencyInput"
                />
              </div>
            </label>
            <label className="voucherCreateLabel">
              Discount (%)
              <input
                type="number"
                min="0"
                max="100"
                value={form.discountPercent}
                onChange={handleChange("discountPercent")}
                className="voucherCreateInput"
              />
            </label>
          </div>

          <div className="voucherCreateFormRow">
            <label className="voucherCreateLabel">
              Usage Limit
              <input
                type="number"
                min="1"
                value={form.useLimit}
                onChange={handleChange("useLimit")}
                className="voucherCreateInput"
              />
            </label>
            <label className="voucherCreateLabel">
              Expiry Date
              <input
                type="date"
                value={form.expiryDate}
                onChange={handleChange("expiryDate")}
                className="voucherCreateInput"
              />
            </label>
          </div>

          <div className="voucherCreateActions">
            <button type="button" className="voucherCreateSubmitBtn">
              Save Voucher
            </button>
            <button
              type="button"
              className="voucherCreateCancelBtn"
              onClick={() => navigate("/learnova/admin/vouchers")}
            >
              Cancel
            </button>
          </div>
        </div>

        <aside className="voucherCreateSummaryCard">
          <div className="voucherCreateSummaryHeader">
            <p className="voucherCreateSummaryLabel">Summary</p>
            <span className="voucherCreateSummaryCode">{form.code}</span>
          </div>
          <div className="voucherCreateSummaryItem">
            <span>Discount (%)</span>
            <strong>{form.discountPercent}%</strong>
          </div>
          <div className="voucherCreateSummaryItem">
            <span>Discount Amount</span>
            <strong>{formatCurrency(discountAmount)}</strong>
          </div>
          <div className="voucherCreateSummaryItem">
            <span>Price After Discount</span>
            <strong>{formatCurrency(finalPrice)}</strong>
          </div>
          <div className="voucherCreateSummaryItem">
            <span>Expiry Date</span>
            <strong>{form.expiryDate}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default VoucherCreate;
