import "./VoucherHistory.css";

// ===== DỮ LIỆU LỊCH SỬ SỬ DỤNG VOUCHER =====
const voucherHistories = [
  {
    id: 1,
    student: "Nguyễn Văn A",
    course: "Lập Trình Web với React",
    code: "WELCOME2026",
    originalPrice: "2.500.000 VND",
    discount: "500.000 VND",
    finalPrice: "2.000.000 VND",
    date: "2026-05-15 14:30",
  },
  {
    id: 2,
    student: "Trần Thị B",
    course: "Python Cho Người Mới Bắt Đầu",
    code: "LEARNOVA50",
    originalPrice: "1.500.000 VND",
    discount: "750.000 VND",
    finalPrice: "750.000 VND",
    date: "2026-05-14 09:15",
  },
  {
    id: 3,
    student: "Lê Minh C",
    course: "Khóa Lập Trình Web",
    code: "WEBDEV30",
    originalPrice: "3.000.000 VND",
    discount: "30 USD",
    finalPrice: "2.970.000 VND",
    date: "2026-05-13 16:45",
  },
  {
    id: 4,
    student: "Phạm Hồng D",
    course: "JavaScript Advanced",
    code: "FIX500FF",
    originalPrice: "2.200.000 VND",
    discount: "500.000 VND",
    finalPrice: "1.700.000 VND",
    date: "2026-05-12 11:20",
  },
  {
    id: 5,
    student: "Đặng Anh E",
    course: "Design UI/UX",
    code: "WELCOME2026",
    originalPrice: "1.800.000 VND",
    discount: "500.000 VND",
    finalPrice: "1.300.000 VND",
    date: "2026-05-11 13:00",
  },
  {
    id: 6,
    student: "Vũ Tuấn F",
    course: "Node.js & Express",
    code: "LEARNOVA50",
    originalPrice: "2.100.000 VND",
    discount: "1.050.000 VND",
    finalPrice: "1.050.000 VND",
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
            <h2 className="voucherHistoryTitle">Nhật Ký Sử Dụng Voucher</h2>
          </div>
          <p className="voucherHistorySubtitle">
            Xem về các giao dịch đang ký khóa học sử dụng mã ưu đãi gặp đây
          </p>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div className="voucherHistoryControls">
        <input
          type="text"
          placeholder="Tìm tên học viên, mã..."
          className="voucherHistorySearchInput"
        />
      </div>

      {/* TABLE SECTION */}
      <div className="voucherHistoryTableWrapper">
        <table className="voucherHistoryTable">
          <thead>
            <tr>
              <th>HỌC VIÊN</th>
              <th>KHÓA HỌC ĐĂNG KÝ</th>
              <th>MÃ ÁP DỤNG</th>
              <th>ĐƠN GIÁ GỐC</th>
              <th>MỨC ĐÃ GIẢM</th>
              <th>THANH TOÁN</th>
              <th>THỜI ĐIỂM DÙNG</th>
            </tr>
          </thead>
          <tbody>
            {/* MAPPING DỮ LIỆU LỊCH SỬ VOUCHER */}
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
