import { ExternalLink, Loader2, QrCode, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { getPaymentStatusApi } from "../../api/PaymentApi.js";
import { useAuth } from "../../hook/UseAuth.jsx";
import { useAxiosPrivate } from "../../hook/UseAxiosPrivate.js";
import "./PaymentModal.css";

const formatVnd = (value) => `${Number(value || 0).toLocaleString("vi-VN")}đ`;

const getPayOSQrPayload = (payment) => {
  if (payment?.qrCode) {
    const qrCode = String(payment.qrCode);
    if (qrCode.startsWith("http") || qrCode.startsWith("data:image")) {
      return { type: "image", value: qrCode };
    }
    return { type: "payload", value: qrCode };
  }

  return payment?.checkoutUrl ? { type: "payload", value: payment.checkoutUrl } : null;
};

const PaymentModal = ({ payment, onClose, onPaid }) => {
  const axiosPrivate = useAxiosPrivate();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState(payment);
  const [pollError, setPollError] = useState("");
  const [qrImageSrc, setQrImageSrc] = useState("");
  const [qrError, setQrError] = useState("");
  const completedRef = useRef(false);

  useEffect(() => {
    let mounted = true;
    const qrPayload = getPayOSQrPayload(payment);

    setQrImageSrc("");
    setQrError("");

    if (!qrPayload?.value) {
      setQrError("payOS không trả về mã QR hoặc checkoutUrl.");
      return undefined;
    }

    if (qrPayload.type === "image") {
      setQrImageSrc(qrPayload.value);
      return undefined;
    }

    QRCode.toDataURL(qrPayload.value, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 360,
      color: {
        dark: "#111827",
        light: "#ffffff",
      },
    })
      .then((dataUrl) => {
        if (mounted) setQrImageSrc(dataUrl);
      })
      .catch(() => {
        if (mounted) setQrError("Không thể tạo mã QR payOS.");
      });

    return () => {
      mounted = false;
    };
  }, [payment]);

  useEffect(() => {
    if (!payment?.orderId) return undefined;

    setStatus(payment);
    setPollError("");
    completedRef.current = false;

    const poll = async () => {
      try {
        const nextStatus = await getPaymentStatusApi(axiosPrivate, payment.orderId, accessToken);
        setStatus((current) => ({ ...current, ...nextStatus }));

        if (
          !completedRef.current &&
          (nextStatus.orderStatus === "PAID" || nextStatus.paymentStatus === "SUCCESS")
        ) {
          completedRef.current = true;
          onPaid?.(nextStatus);
          onClose?.();
          navigate("/learnova/user/profile/courses");
        }
      } catch (err) {
        setPollError(err?.response?.data?.message || "Không thể kiểm tra trạng thái thanh toán.");
      }
    };

    const timer = window.setInterval(poll, 2000);
    poll();

    return () => window.clearInterval(timer);
  }, [accessToken, axiosPrivate, navigate, onClose, onPaid, payment]);

  if (!payment) return null;

  const isPaid = status?.orderStatus === "PAID" || status?.paymentStatus === "SUCCESS";

  return (
    <div className="payment-modal-backdrop" role="presentation">
      <div className="payment-modal" role="dialog" aria-modal="true" aria-labelledby="payment-modal-title">
        <button className="payment-modal-close" type="button" onClick={onClose} aria-label="Close payment modal">
          <X size={18} />
        </button>

        <div className="payment-modal-header">
          <div>
            <p>payOS Sandbox</p>
            <h3 id="payment-modal-title">{status.courseTitle || payment.courseTitle}</h3>
          </div>
          <span className={`payment-pill ${isPaid ? "payment-pill--success" : ""}`}>
            {isPaid ? "SUCCESS" : "PENDING"}
          </span>
        </div>

        <div className="payment-modal-grid">
          <div className="payment-qr-panel">
            {qrImageSrc ? (
              <img src={qrImageSrc} alt="payOS QR code" />
            ) : !qrError ? (
              <div className="payment-qr-empty">
                <Loader2 size={42} className="payment-spin" />
                <span>Đang tạo mã QR</span>
              </div>
            ) : (
              <div className="payment-qr-empty">
                <QrCode size={52} />
                <span>{qrError}</span>
              </div>
            )}
          </div>

          <div className="payment-summary-list">
            <div>
              <span>Giá gốc</span>
              <strong>{formatVnd(payment.subtotal)}</strong>
            </div>
            <div>
              <span>Giảm giá</span>
              <strong>-{formatVnd(payment.discountAmount)}</strong>
            </div>
            <div className="payment-summary-total">
              <span>Tổng tiền</span>
              <strong>{formatVnd(payment.totalAmount || status.totalAmount)}</strong>
            </div>
          </div>
        </div>

        <div className="payment-status-line">
          {isPaid ? (
            <span>Thanh toán thành công</span>
          ) : (
            <>
              <Loader2 size={16} className="payment-spin" />
              <span>Quét mã payOS, hệ thống tự kiểm tra mỗi 2 giây.</span>
            </>
          )}
        </div>

        <p className="payment-hint">
          Đây là môi trường payOS sandbox/test. Webhook hợp lệ từ payOS mới mở khóa học.
        </p>

        {pollError ? <p className="payment-error">{pollError}</p> : null}

        <div className="payment-modal-actions">
          <button
            className="payment-checkout-button"
            type="button"
            onClick={() => window.open(payment.checkoutUrl, "_blank", "noopener,noreferrer")}
            disabled={!payment.checkoutUrl || isPaid}
          >
            <ExternalLink size={18} />
            Mở payOS
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
