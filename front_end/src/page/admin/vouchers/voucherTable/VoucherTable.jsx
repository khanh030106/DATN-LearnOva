import "./VoucherTable.css";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

// ===== DỮ LIỆU CÁC VOUCHER =====
const vouchers = [
  {
    code: "WELCOME2026",
    name: "Chào mừng đầu năm",
    discount: "20%",
    used: "812 / 1.000",
    expires: "30/09/2026",
    status: "Đang hoạt động",
    statusClass: "active",
  },
  {
    code: "LEARNOVA50",
    name: "Khuyến mãi học tập",
    discount: "50%",
    used: "234 / 500",
    expires: "15/08/2026",
    status: "Đang hoạt động",
    statusClass: "active",
  },
  {
    code: "WEBDEV30",
    name: "Khóa lập trình web",
    discount: "$30",
    used: "142 / 200",
    expires: "10/07/2026",
    status: "Đang hoạt động",
    statusClass: "active",
  },
  {
    code: "FIX500FF",
    name: "Giảm 500k",
    discount: "$500",
    used: "89 / 100",
    expires: "05/06/2026",
    status: "Sắp hết hạn",
    statusClass: "expired",
  },
];

// ===== LỰA CHỌN BỘ LỌC =====
const statusOptions = [
  "Mọi trạng thái",
  "Đang hoạt động",
  "Sắp hết hạn",
  "Hết hạn",
];

const VoucherTable = () => {
  const navigate = useNavigate();

  return (
    <section className="voucherTableSection">
      {/* HEADER SECTION */}
      <div className="voucherTableHeader">
        <div>
          <h2 className="voucherTableTitle">
            Kho Lưu Trữ Chương Trình Giảm Giá
          </h2>
          <p className="voucherTableSubtitle">
            Quản lý chương trình giảm giá đã tạo và trạng thái hoạt động.
          </p>
        </div>
        <span className="voucherTableCount">Đếm: {vouchers.length} mục</span>
      </div>

      {/* SEARCH & FILTER SECTION */}
      <div className="voucherTableControls">
        <input
          type="text"
          placeholder="Tìm kiếm mã hoặc chiến dịch..."
          className="voucherSearchInput"
        />
        <select className="voucherStatusSelect">
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="voucherCreateBtn"
          onClick={() => navigate("/learnova/admin/vouchers/create")}
        >
          Tạo Voucher Mới
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="voucherTableWrapper">
        <table className="voucherTable">
          <thead>
            <tr>
              <th>MÃ CODE</th>
              <th>TÊN CHƯƠNG TRÌNH</th>
              <th>MỨC ƯU ĐÃI</th>
              <th>ĐÃ DÙNG / SỨC CHỨA</th>
              <th>KỲ HẠN SỬ DỤNG</th>
              <th>TRẠNG THÁI</th>
              <th>HÀNH VI</th>
            </tr>
          </thead>
          <tbody>
            {/* MAPPING DỮ LIỆU CÁC VOUCHER */}
            {vouchers.map((v) => (
              <tr key={v.code}>
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
                    <button className="voucherActionBtn" title="Xem">
                      <FiEye size={16} />
                    </button>
                    <button className="voucherActionBtn" title="Sửa">
                      <FiEdit size={16} />
                    </button>
                    <button className="voucherActionBtn" title="Xóa">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VoucherTable;
