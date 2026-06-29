import { Link } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentCancel = () => (
  <div className="payment-success-page">
    <div className="payment-success-panel">
      <h1>Thanh toán đã bị hủy</h1>
      <p>Đơn hàng vẫn chưa được thanh toán. Khóa học sẽ không được mở cho đến khi payOS xác nhận thành công.</p>
      <Link to="/learnova/cart">Quay lại giỏ hàng</Link>
    </div>
  </div>
);

export default PaymentCancel;
