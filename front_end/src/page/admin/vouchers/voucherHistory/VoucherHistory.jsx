import "./VoucherHistory.css";

// ===== VOUCHER USAGE HISTORY DATA =====
const voucherHistories = [
  {
    id: 1,
    student: "Nguyễn Văn A",
    course: "Web Programming with React",
    code: "WELCOME2026",
    originalPrice: "$105",
    discount: "$21",
    finalPrice: "$84",
    date: "2026-05-15 14:30",
  },
  {
    id: 2,
    student: "Trần Thị B",
    course: "Python for Beginners",
    code: "LEARNOVA50",
    originalPrice: "$63",
    discount: "$31",
    finalPrice: "$32",
    date: "2026-05-14 09:15",
  },
  {
    id: 3,
    student: "Lê Minh C",
    course: "Web Programming Course",
    code: "WEBDEV30",
    originalPrice: "$125",
    discount: "$30",
    finalPrice: "$95",
    date: "2026-05-13 16:45",
  },
  {
    id: 4,
    student: "Phạm Hồng D",
    course: "JavaScript Advanced",
    code: "FIX500FF",
    originalPrice: "$96",
    discount: "$22",
    finalPrice: "$74",
    date: "2026-05-12 11:20",
  },
  {
    id: 5,
    student: "Đặng Anh E",
    course: "Design UI/UX",
    code: "WELCOME2026",
    originalPrice: "$78",
    discount: "$22",
    finalPrice: "$56",
    date: "2026-05-11 13:00",
  },
  {
    id: 6,
    student: "Vũ Tuấn F",
    course: "Node.js & Express",
    code: "LEARNOVA50",
    originalPrice: "$91",
    discount: "$46",
    finalPrice: "$46",
    date: "2026-05-10 10:30",
  },
];

const VoucherHistory = () => {
  return (
    <section className="voucherHistorySection">
      {/* HEADER SECTION */}
      <div className="voucherHistoryHeader">
        <div>
          <div className="voucherHistoryTitleIcon">
            <span className="voucherHistoryIcon">📋</span>
            <h2 className="voucherHistoryTitle">Voucher Usage History</h2>
          </div>
          <p className="voucherHistorySubtitle">
            View course registration transactions using discount codes.
          </p>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div className="voucherHistoryControls">
        <input
          type="text"
          placeholder="Search student name, code..."
          className="voucherHistorySearchInput"
        />
      </div>

      {/* TABLE SECTION */}
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
            {/* MAPPING VOUCHER HISTORY DATA */}
            {voucherHistories.map((h) => (
              <tr key={h.id}>
                <td>{h.student}</td>
                <td>{h.course}</td>
                <td>
                  <span className="voucherHistoryCode">{h.code}</span>
                </td>
                <td>{h.originalPrice}</td>
                <td className="voucherHistoryDiscount">{h.discount}</td>
                <td className="voucherHistoryFinal">{h.finalPrice}</td>
                <td>{h.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VoucherHistory;
