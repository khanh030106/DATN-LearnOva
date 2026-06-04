import { useState } from "react";
import { Search, RefreshCcw, ChevronDown, FileText } from "lucide-react";
import "./TransactionLog.css";

const transactions = [
  {
    id: "GD-20240603-001",
    student: "Nguyễn Thị An",
    course: "Tiếng Anh Giao Tiếp cơ bản",
    gateway: "VNPay",
    amount: "$240",
    status: "Thành công",
    type: "Hoàn tất",
  },
  {
    id: "GD-20240603-002",
    student: "Trần Minh Quân",
    course: "Lập trình Next.js từ cơ bản đến nâng cao",
    gateway: "Momo",
    amount: "$360",
    status: "Đang xử lý",
    type: "Thanh toán",
  },
  {
    id: "GD-20240603-003",
    student: "Lê Thị Hương",
    course: "Thiết kế UX/UI cho sản phẩm học trực tuyến",
    gateway: "Banking",
    amount: "$180",
    status: "Thất bại",
    type: "Hoàn học phí",
  },
  {
    id: "GD-20240603-004",
    student: "Phạm Văn Dũng",
    course: "Phân tích dữ liệu với Python",
    gateway: "VNPay",
    amount: "$420",
    status: "Thành công",
    type: "Thanh toán",
  },
  {
    id: "GD-20240603-005",
    student: "Hoàng Ngọc Mai",
    course: "Quản lý dự án Agile cho giảng viên",
    gateway: "Momo",
    amount: "$95",
    status: "Thành công",
    type: "Hoàn tất",
  },
  {
    id: "GD-20240603-006",
    student: "Đỗ Đức Anh",
    course: "Marketing khóa học trên nền tảng số",
    gateway: "Banking",
    amount: "$275",
    status: "Đang xử lý",
    type: "Thanh toán",
  },
  {
    id: "GD-20240603-007",
    student: "Nguyễn Thị Thu",
    course: "Tạo nội dung tương tác với video",
    gateway: "VNPay",
    amount: "$150",
    status: "Thành công",
    type: "Hoàn tất",
  },
  {
    id: "GD-20240603-008",
    student: "Trần Duy Khang",
    course: "Phát triển kỹ năng giảng dạy trực tuyến",
    gateway: "Momo",
    amount: "$310",
    status: "Thành công",
    type: "Thanh toán",
  },
  {
    id: "GD-20240603-009",
    student: "Vũ Ngọc Mai",
    course: "Nâng cao SEO cho khóa học",
    gateway: "Banking",
    amount: "$135",
    status: "Thành công",
    type: "Hoàn tất",
  },
  {
    id: "GD-20240603-010",
    student: "Phạm Quốc Bảo",
    course: "Xây dựng lộ trình học cho doanh nghiệp",
    gateway: "VNPay",
    amount: "$530",
    status: "Đang xử lý",
    type: "Thanh toán",
  },
  {
    id: "GD-20240603-011",
    student: "Hà Thanh Vân",
    course: "Kỹ thuật livestream tương tác",
    gateway: "Momo",
    amount: "$210",
    status: "Thành công",
    type: "Hoàn tất",
  },
  {
    id: "GD-20240603-012",
    student: "Trần Minh Tâm",
    course: "Chiến lược bán khóa học trên LearnOva",
    gateway: "Banking",
    amount: "$390",
    status: "Thành công",
    type: "Thanh toán",
  },
];

const statusClasses = {
  "Thành công": "statusSuccess",
  "Đang xử lý": "statusPending",
  "Thất bại": "statusFailed",
};

const PAGE_SIZE = 5;

const TransactionLog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const currentTransactions = transactions.slice(
    pageStart,
    pageStart + PAGE_SIZE,
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  return (
    <section
      className="transactionLogCard"
      aria-label="Nhật ký giao dịch doanh thu"
    >
      <div className="transactionLogHeader">
        <div>
          <h2 className="transactionLogTitle">Nhật Ký Giao Dịch Doanh Thu</h2>
          <p className="transactionLogSubtitle">
            Tra cứu nhanh toàn bộ luồng thu quỹ, lọc theo cổng thanh toán và
            trạng thái đối soát.
          </p>
        </div>
      </div>

      <div className="transactionLogControls">
        <label className="transactionSearch">
          <Search size={16} />
          <input placeholder="Tìm theo Mã GD, Tên học viên, Khóa học" />
        </label>
        <div className="transactionFilters">
          <button type="button">
            Tất cả Lĩnh vực <ChevronDown size={14} />
          </button>
          <button type="button">
            Mọi cổng TT <ChevronDown size={14} />
          </button>
          <button type="button">
            Mọi Trạng thái <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="transactionLogTableWrapper">
        <table className="transactionLogTable">
          <thead>
            <tr>
              <th>MÃ GD</th>
              <th>HỌC VIÊN</th>
              <th>TÊN KHÓA HỌC</th>
              <th>CỔNG THANH TOÁN</th>
              <th>GIÁ TRỊ GIAO DỊCH</th>
              <th>TRẠNG THÁI</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.student}</td>
                <td>{transaction.course}</td>
                <td>{transaction.gateway}</td>
                <td className="textRight">{transaction.amount}</td>
                <td>
                  <span
                    className={`transactionStatus ${statusClasses[transaction.status]}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="textCenter">
                  <button
                    type="button"
                    className="transactionActionButton"
                    aria-label={`Xem hóa đơn ${transaction.id}`}
                  >
                    <FileText size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="transactionLogPagination">
          <button
            type="button"
            className="paginationButton"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              type="button"
              className={`paginationButton ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            type="button"
            className="paginationButton"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Sau
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default TransactionLog;
