import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import AdminHoverSelect from "../../shared/AdminHoverSelect";
import { useAxiosPrivate } from "../../../../hook/UseAxiosPrivate.js";
import {
  getAdminVouchersApi,
  deleteAdminVoucherApi,
} from "../../../../api/admin/VoucherApi.js";
import "./VoucherTable.css";

const statusOptions = ["All statuses", "Active", "Inactive", "Expiring Soon"];
const pageSize = 5;

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-GB");
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatDiscount = (voucher) => {
  if (!voucher?.discountType || voucher?.discountValue == null) return "";
  const type = String(voucher.discountType).toLowerCase();
  if (type.includes("percent")) return `${voucher.discountValue}%`;
  return formatCurrency(voucher.discountValue);
};

const VoucherTable = ({
  onCreateVoucher,
  onViewVoucher,
  onEditVoucher,
  refreshKey,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [vouchers, setVouchers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchVouchers = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await getAdminVouchersApi(axiosPrivate);
        if (mounted) {
          setVouchers(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err?.response?.data?.message || "Không tải được danh sách voucher."
          );
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchVouchers();
    return () => {
      mounted = false;
    };
  }, [axiosPrivate, refreshKey]);

  const normalizedVouchers = useMemo(
    () =>
      vouchers.map((item) => {
        const isActive = Boolean(item.isActive);
        const status = isActive ? "Active" : "Inactive";
        const statusClass =
          isActive && item.endDate && new Date(item.endDate) < new Date()
            ? "expired"
            : isActive
            ? "active"
            : "expired";

        return {
          id: item.id,
          code: item.code || "",
          name: item.description || "",
          discount: formatDiscount(item),
          used: `${item.usedCount ?? 0} / ${item.usageLimit ?? "-"}`,
          expires: formatDate(item.endDate),
          status,
          statusClass,
          raw: item,
        };
      }),
    [vouchers]
  );

  const filteredVouchers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return normalizedVouchers.filter((voucher) => {
      const text =
        [voucher.code, voucher.name, voucher.discount, voucher.used]
          .join(" ")
          .toLowerCase();
      const matchesSearch = !keyword || text.includes(keyword);
      const matchesStatus =
        selectedStatus === "All statuses" || voucher.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [normalizedVouchers, searchTerm, selectedStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredVouchers.length / pageSize));
  const currentPageItems = filteredVouchers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa voucher này không?")) return;
    try {
      const deletedVoucher = await deleteAdminVoucherApi(id, axiosPrivate);
      setVouchers((current) =>
        current.map((voucher) =>
          voucher.id === id ? { ...voucher, ...deletedVoucher, isActive: false } : voucher,
        ),
      );
    } catch (err) {
      console.error(err);
      alert("Xóa voucher thất bại.");
    }
  };

  return (
    <section className="voucherTableSection">
      <div className="voucherTableHeader">
        <div>
          <h2 className="voucherTableTitle">Discount Program Archive</h2>
          <p className="voucherTableSubtitle">
            Manage created discount programs and activity status.
          </p>
        </div>
        <span className="voucherTableCount">
          Count: {filteredVouchers.length} items
        </span>
      </div>

      <div className="voucherTableCard">
        <div className="voucherTableControls">
          <input
            type="text"
            placeholder="Search code or campaign..."
            className="voucherSearchInput"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <AdminHoverSelect
            className="voucherStatusSelect"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            ariaLabel="Filter vouchers by status"
          />
          <button
            type="button"
            className="voucherCreateBtn"
            onClick={onCreateVoucher}
          >
            Create New Voucher
          </button>
        </div>

        <div className="voucherTableWrapper">
          <table className="voucherTable">
            <thead>
              <tr>
                <th>CODE</th>
                <th>CAMPAIGN NAME</th>
                <th>DISCOUNT</th>
                <th>USED / CAPACITY</th>
                <th>EXPIRY DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="voucherTableLoading">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="voucherTableError">
                    {error}
                  </td>
                </tr>
              ) : currentPageItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="voucherTableEmpty">
                    Không có voucher phù hợp.
                  </td>
                </tr>
              ) : (
                currentPageItems.map((v) => (
                  <tr key={v.id}>
                    <td>{v.code}</td>
                    <td>{v.name}</td>
                    <td>{v.discount}</td>
                    <td>{v.used}</td>
                    <td>{v.expires}</td>
                    <td>
                      <span className={`voucherBadge ${v.statusClass}`}>
                        {v.status}
                      </span>
                    </td>
                    <td>
                      <div className="voucherActions">
                        <button
                          className="voucherActionBtn"
                          title="Xem"
                          onClick={() => onViewVoucher?.(v.raw)}
                        >
                          <FiEye size={16} />
                        </button>
                        <button
                          className="voucherActionBtn"
                          title="Sửa"
                          onClick={() => onEditVoucher?.(v.raw)}
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          className="voucherActionBtn"
                          title="Xóa"
                          onClick={() => handleDelete(v.id)}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="voucherTablePagination">
          <button
            type="button"
            className="voucherPaginationBtn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                className={`voucherPaginationBtn ${
                  page === currentPage ? "voucherPaginationBtn--active" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            className="voucherPaginationBtn"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(page + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default VoucherTable;
