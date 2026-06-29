import { useEffect, useMemo, useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { getAdminVoucherUsageHistoriesApi } from "../../../../api/admin/VoucherApi.js";
import { useAxiosPrivate } from "../../../../hook/UseAxiosPrivate.js";
import "./VoucherHistory.css";

const pageSize = 10;

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const datePart = date.toLocaleDateString("en-CA");
  const timePart = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${datePart} ${timePart}`;
};

const VoucherHistory = ({ refreshKey }) => {
  const axiosPrivate = useAxiosPrivate();
  const [histories, setHistories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchVoucherUsageHistories = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await getAdminVoucherUsageHistoriesApi(axiosPrivate);
        if (mounted) {
          setHistories(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err?.response?.data?.message ||
              "Không tải được lịch sử sử dụng voucher."
          );
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchVoucherUsageHistories();
    return () => {
      mounted = false;
    };
  }, [axiosPrivate, refreshKey]);

  const normalizedHistories = useMemo(
    () =>
      histories.map((history, index) => ({
        id: `${history.usedAt || "history"}-${index}`,
        student: history.studentName || "",
        course: history.registeredCourse || "",
        code: history.appliedCode || "-",
        originalPrice: formatCurrency(history.originalPrice),
        discount: formatCurrency(history.discount),
        paid: formatCurrency(history.paid),
        usedAt: formatDateTime(history.usedAt),
      })),
    [histories]
  );

  const filteredHistories = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return normalizedHistories;

    return normalizedHistories.filter((history) =>
      [history.student, history.course, history.code]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [normalizedHistories, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredHistories.length / pageSize));
  const currentPageItems = filteredHistories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const startItem = filteredHistories.length
    ? (currentPage - 1) * pageSize + 1
    : 0;
  const endItem = Math.min(currentPage * pageSize, filteredHistories.length);

  return (
    <section className="voucherHistorySection">
      <div className="voucherHistoryHeader">
        <div>
          <div className="voucherHistoryTitleIcon">
            <FiClipboard className="voucherHistoryIcon" aria-hidden="true" />
            <h2 className="voucherHistoryTitle">Voucher Usage History</h2>
          </div>
          <p className="voucherHistorySubtitle">
            View course registration transactions using discount codes.
          </p>
        </div>
        <span className="voucherHistoryCount">
          Showing {startItem}-{endItem} of {filteredHistories.length}
        </span>
      </div>

      <div className="voucherHistoryCard">
        <div className="voucherHistoryControls">
          <input
            type="text"
            placeholder="Search student name, code..."
            className="voucherHistorySearchInput"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="voucherHistoryTableWrapper">
          <table className="voucherHistoryTable">
            <thead>
              <tr>
                <th>STUDENT</th>
                <th>REGISTERED COURSE</th>
                <th>APPLIED CODE</th>
                <th>ORIGINAL PRICE</th>
                <th>DISCOUNT</th>
                <th>PAID</th>
                <th>USED AT</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="voucherHistoryLoading">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="voucherHistoryError">
                    {error}
                  </td>
                </tr>
              ) : currentPageItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="voucherHistoryEmpty">
                    Không có lịch sử sử dụng voucher phù hợp.
                  </td>
                </tr>
              ) : (
                currentPageItems.map((history) => (
                  <tr key={history.id}>
                    <td>{history.student}</td>
                    <td>{history.course}</td>
                    <td>
                      <span className="voucherHistoryCode">{history.code}</span>
                    </td>
                    <td>{history.originalPrice}</td>
                    <td className="voucherHistoryDiscount">
                      {history.discount}
                    </td>
                    <td className="voucherHistoryFinal">{history.paid}</td>
                    <td>{history.usedAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="voucherHistoryPagination">
          <button
            type="button"
            className="voucherHistoryPaginationBtn"
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
                className={`voucherHistoryPaginationBtn ${
                  page === currentPage
                    ? "voucherHistoryPaginationBtn--active"
                    : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            className="voucherHistoryPaginationBtn"
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

export default VoucherHistory;
