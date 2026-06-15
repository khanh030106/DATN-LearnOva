import "./VoucherTable.css";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

// ===== VOUCHER DATA =====
const vouchers = [
  {
    code: "WELCOME2026",
    name: "New Year Welcome",
    discount: "20%",
    used: "812 / 1,000",
    expires: "30/09/2026",
    status: "Active",
    statusClass: "active",
  },
  {
    code: "LEARNOVA50",
    name: "Learning Promotion",
    discount: "50%",
    used: "234 / 500",
    expires: "15/08/2026",
    status: "Active",
    statusClass: "active",
  },
  {
    code: "WEBDEV30",
    name: "Web Development Course",
    discount: "$30",
    used: "142 / 200",
    expires: "10/07/2026",
    status: "Active",
    statusClass: "active",
  },
  {
    code: "FIX500FF",
    name: "$500 Off",
    discount: "$500",
    used: "89 / 100",
    expires: "05/06/2026",
    status: "Expiring Soon",
    statusClass: "expired",
  },
];

// ===== FILTER OPTIONS =====
const statusOptions = ["All statuses", "Active", "Expiring Soon", "Expired"];

const VoucherTable = ({ onCreateVoucher }) => {
  return (
    <section className="voucherTableSection">
      {/* HEADER SECTION */}
      <div className="voucherTableHeader">
        <div>
          <h2 className="voucherTableTitle">Discount Program Archive</h2>
          <p className="voucherTableSubtitle">
            Manage created discount programs and activity status.
          </p>
        </div>
        <span className="voucherTableCount">
          Count: {vouchers.length} items
        </span>
      </div>

      <div className="voucherTableCard">
        {/* SEARCH & FILTER SECTION */}
        <div className="voucherTableControls">
          <input
            type="text"
            placeholder="Search code or campaign..."
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
            onClick={onCreateVoucher}
          >
            Create New Voucher
          </button>
        </div>

        {/* TABLE SECTION */}
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
              {/* MAPPING VOUCHER DATA */}
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
      </div>
    </section>
  );
};

export default VoucherTable;
