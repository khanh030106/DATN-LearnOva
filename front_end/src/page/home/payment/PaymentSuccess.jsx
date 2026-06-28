import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPaymentStatusApi } from "../../../api/PaymentApi.js";
import { useAuth } from "../../../hook/UseAuth.jsx";
import { useAxiosPrivate } from "../../../hook/UseAxiosPrivate.js";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const axiosPrivate = useAxiosPrivate();
  const { accessToken, loading: authLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const [syncState, setSyncState] = useState("syncing");
  const [message, setMessage] = useState("Đang xác nhận thanh toán với payOS...");
  const orderCode = searchParams.get("orderCode") || searchParams.get("orderId");

  useEffect(() => {
    if (authLoading) return undefined;

    if (!orderCode) {
      setSyncState("warning");
      setMessage("Không tìm thấy mã đơn hàng trong đường dẫn trả về. Hãy mở lại trang khóa học của tôi sau vài giây.");
      return undefined;
    }

    let mounted = true;

    getPaymentStatusApi(axiosPrivate, orderCode, accessToken)
      .then((status) => {
        if (!mounted) return;

        const isPaid = status?.orderStatus === "PAID" || status?.paymentStatus === "SUCCESS";
        setSyncState(isPaid ? "success" : "warning");
        setMessage(
          isPaid
            ? "Thanh toán đã được xác nhận. Khóa học đã được mở trong tài khoản của bạn."
            : "payOS đã chuyển hướng về LearnOva, nhưng đơn hàng chưa được xác nhận thanh toán.",
        );
      })
      .catch((err) => {
        if (!mounted) return;
        setSyncState("error");
        setMessage(err?.response?.data?.message || "Không thể xác nhận thanh toán. Vui lòng thử lại sau.");
      });

    return () => {
      mounted = false;
    };
  }, [accessToken, authLoading, axiosPrivate, orderCode]);

  return (
    <div className="payment-success-page">
      <div className="payment-success-panel">
        <h1>payOS đã chuyển hướng về LearnOva</h1>
        <p>{message}</p>
        {syncState === "syncing" ? <p>Vui lòng chờ trong giây lát.</p> : null}
        <Link to="/learnova/user/profile/courses">Xem khóa học của tôi</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
