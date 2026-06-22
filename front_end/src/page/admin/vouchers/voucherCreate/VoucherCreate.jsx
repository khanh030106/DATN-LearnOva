import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAxiosPrivate } from "../../../../hook/UseAxiosPrivate.js";
import { useAuth } from "../../../../hook/UseAuth.jsx";
import {
  createAdminVoucherApi,
  updateAdminVoucherApi,
} from "../../../../api/admin/VoucherApi.js";
import "./VoucherCreate.css";

const toDateInputValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const formatNumberInput = (value) => {
  const digits = String(value).replace(/[^0-9]/g, "");
  return digits;
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatDateLabel = (value) => {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return new Intl.DateTimeFormat("vi-VN").format(date);
};

const getPayload = (form, currentUser, voucher) => ({
  code: form.code.trim(),
  description: form.description.trim(),
  discountType: "Percent",
  discountValue: Number(form.discountValue || 0),
  minimumOrder: 0,
  maximumDiscountAmount: 0,
  usageLimit: Number(form.usageLimit || 0),
  startDate: form.startDate ? `${form.startDate}T00:00:00Z` : "",
  endDate: form.endDate ? `${form.endDate}T23:59:59Z` : "",
  isActive: Boolean(form.isActive),
  createdById: currentUser?.id ?? voucher?.createdById ?? 0,
});

const VoucherCreate = ({
  mode = "create",
  voucher = null,
  onClose,
  onEdit,
  onSaved,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    code: "",
    description: "",
    discountType: "Percent",
    discountValue: "",
    usageLimit: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const isView = mode === "view";
  const isEdit = mode === "edit";

  useEffect(() => {
    if (!voucher) return;

    setForm({
      code: voucher.code || "",
      description: voucher.description || "",
      discountType: "Percent",
      discountValue:
        voucher.discountValue != null ? String(voucher.discountValue) : "",
      usageLimit: voucher.usageLimit != null ? String(voucher.usageLimit) : "",
      startDate: toDateInputValue(voucher.startDate),
      endDate: toDateInputValue(voucher.endDate),
      isActive: voucher.isActive !== false,
    });
  }, [voucher]);

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isView) return;

    if (!currentUser?.id) {
      setError("Không xác định được người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    if (!form.code.trim() || !form.description.trim()) {
      setError("Code và description không được để trống.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const payload = getPayload(form, currentUser, voucher);

      if (mode === "create") {
        await createAdminVoucherApi(payload, axiosPrivate);
      } else {
        await updateAdminVoucherApi(voucher.id, payload, axiosPrivate);
      }

      onSaved?.();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Lưu voucher thất bại. Vui lòng thử lại."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section
      className={`voucherCreateSection ${onClose ? "voucherCreateSection--modal" : ""}`}
    >
      <div className="voucherCreateHeader">
        <div>
          <div className="voucherCreateTitleRow">
            <span className="voucherCreateIcon">🎟️</span>
            <h2 className="voucherCreateTitle" id="voucher-create-title">
              {isView
                ? "Voucher Details"
                : isEdit
                ? "Edit Voucher"
                : "Create Voucher"}
            </h2>
          </div>
          <p className="voucherCreateSubtitle">
            {isView
              ? "Xem thông tin voucher. Nhấn Edit để sửa."
              : isEdit
              ? "Sửa chi tiết voucher."
              : "Nhập thông tin để tạo voucher mới."}
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            className="voucherCreateCloseBtn"
            onClick={onClose}
            aria-label="Close voucher form"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <form className="voucherCreateContent" onSubmit={handleSubmit}>
        <div className="voucherCreateFormCard">
          <div className="voucherCreateFormRow">
            <label className="voucherCreateLabel">
              Discount Code
              <input
                type="text"
                value={form.code}
                onChange={handleChange("code")}
                className="voucherCreateInput"
                disabled={isView}
              />
            </label>
            <label className="voucherCreateLabel">
              Campaign Name
              <input
                type="text"
                value={form.description}
                onChange={handleChange("description")}
                className="voucherCreateInput"
                disabled={isView}
              />
            </label>
          </div>

          <div className="voucherCreateFormRow">
            <label className="voucherCreateLabel">
              Discount Percent
              <div className="voucherCreatePercentInputWrap">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.discountValue}
                  onChange={handleChange("discountValue")}
                  className="voucherCreateInput voucherCreatePercentInput"
                  disabled={isView}
                />
                <span>%</span>
              </div>
            </label>
          </div>

          <div className="voucherCreateFormRow">
            <label className="voucherCreateLabel">
              Usage Limit
              <input
                type="number"
                min="0"
                value={form.usageLimit}
                onChange={handleChange("usageLimit")}
                className="voucherCreateInput"
                disabled={isView}
              />
            </label>
            <label className="voucherCreateLabel">
              Active
              <select
                value={form.isActive ? "true" : "false"}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    isActive: event.target.value === "true",
                  }))
                }
                className="voucherCreateInput"
                disabled={isView}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </label>
          </div>

          <div className="voucherCreateFormRow">
            <label className="voucherCreateLabel">
              Start Date
              <input
                type="date"
                value={form.startDate}
                onChange={handleChange("startDate")}
                className="voucherCreateInput"
                disabled={isView}
              />
            </label>
            <label className="voucherCreateLabel">
              End Date
              <input
                type="date"
                value={form.endDate}
                onChange={handleChange("endDate")}
                className="voucherCreateInput"
                disabled={isView}
              />
            </label>
          </div>

          {error ? <p className="voucherCreateError">{error}</p> : null}

          <div className="voucherCreateActions">
            {isView ? (
              <button
                type="button"
                className="voucherCreateSubmitBtn"
                onClick={onEdit}
              >
                Edit
              </button>
            ) : (
              <button
                type="submit"
                className="voucherCreateSubmitBtn"
                disabled={isSaving}
              >
                {isSaving
                  ? "Saving..."
                  : isEdit
                  ? "Save Changes"
                  : "Create Voucher"}
              </button>
            )}
            <button
              type="button"
              className="voucherCreateCancelBtn"
              onClick={onClose}
            >
              {isView ? "Close" : "Cancel"}
            </button>
          </div>
        </div>

        <aside className="voucherCreateSummaryCard" aria-label="Voucher preview">
          <div className="voucherCreateSummaryHeader">
            <div>
              <p className="voucherCreateSummaryLabel">Live Preview</p>
              <h3 className="voucherCreateSummaryTitle">
                {form.description.trim() || "New Campaign"}
              </h3>
            </div>
            <span className="voucherCreateSummaryCode">
              {form.code.trim() || "CODE"}
            </span>
          </div>

          <div className="voucherCreatePreviewBox">
            <span>Discount</span>
            <strong>{Number(form.discountValue || 0)}%</strong>
            <small>Percent</small>
          </div>

          <div className="voucherCreateSummaryItem">
            <span>Usage limit</span>
            <strong>{Number(form.usageLimit || 0).toLocaleString("vi-VN")}</strong>
          </div>
          <div className="voucherCreateSummaryItem">
            <span>Status</span>
            <strong>{form.isActive ? "Active" : "Inactive"}</strong>
          </div>
          <div className="voucherCreateSummaryItem">
            <span>Start date</span>
            <strong>{formatDateLabel(form.startDate)}</strong>
          </div>
          <div className="voucherCreateSummaryItem">
            <span>End date</span>
            <strong>{formatDateLabel(form.endDate)}</strong>
          </div>
        </aside>
      </form>
    </section>
  );
};

export default VoucherCreate;
