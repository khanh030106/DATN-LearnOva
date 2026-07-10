import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, Tag, Trash2, X } from "lucide-react";
import "./Cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CART_UPDATED_EVENT,
  getStoredCartItems,
  removeStoredCartItem,
  setStoredCartItems,
} from "../../../utils/cartStorage.js";
import { applyVoucherApi } from "../../../api/VoucherApi.js";
import { createPaymentApi } from "../../../api/PaymentApi.js";
import { getPublicCoursesApi } from "../../../api/CourseApi.js";
import PaymentModal from "../../../component/payment/PaymentModal.jsx";
import { useAuth } from "../../../hook/UseAuth.jsx";
import { useAxiosPrivate } from "../../../hook/UseAxiosPrivate.js";

const parseCoursePrice = (price) => {
  if (typeof price === "number") return price;

  const numericValue = Number(String(price).replace(/[^\d]/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
};

const normalizeCourseTitle = (title) =>
  String(title || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const Cart = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { accessToken, isAuthenticated, loading: authLoading } = useAuth();
  const [items, setItems] = useState(() => getStoredCartItems());
  const [dbCourses, setDbCourses] = useState([]);
  const [promo, setPromo] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherMessage, setVoucherMessage] = useState("");
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [activePayment, setActivePayment] = useState(null);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    const syncCartItems = () => {
      setItems(getStoredCartItems());
      setAppliedVoucher(null);
      setVoucherMessage("");
    };

    window.addEventListener(CART_UPDATED_EVENT, syncCartItems);
    window.addEventListener("storage", syncCartItems);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncCartItems);
      window.removeEventListener("storage", syncCartItems);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    getPublicCoursesApi()
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          setDbCourses(data);
        }
      })
      .catch(() => {
        if (mounted) setDbCourses([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const askRemoveItem = (item) => setItemToRemove(item);

  const closeRemovePopup = () => setItemToRemove(null);

  const confirmRemoveItem = () => {
    if (!itemToRemove) return;
    const removedTitle = itemToRemove.title;
    const nextItems = removeStoredCartItem(itemToRemove.id);
    setItems(nextItems);
    setAppliedVoucher(null);
    setVoucherMessage("");
    closeRemovePopup();
    toast.success(`Đã xóa "${removedTitle}" khỏi giỏ hàng.`);
  };

  const subtotal = items.reduce((sum, it) => sum + parseCoursePrice(it.price), 0);
  const discount = Number(appliedVoucher?.discountAmount || 0);
  const total = Math.max(0, subtotal - discount);

  const handleVoucherChange = (event) => {
    setPromo(event.target.value);
    setAppliedVoucher(null);
    setVoucherMessage("");
  };

  const handleApplyVoucher = async () => {
    const code = promo.trim();

    if (!code) {
      setVoucherMessage("Vui lòng nhập mã voucher.");
      return;
    }

    if (items.length === 0 || subtotal <= 0) {
      setVoucherMessage("Giỏ hàng đang trống.");
      return;
    }

    if (appliedVoucher?.code?.toLowerCase() === code.toLowerCase()) {
      setVoucherMessage("Voucher này đã được áp dụng.");
      return;
    }

    try {
      setIsApplyingVoucher(true);
      setVoucherMessage("");
      const result = await applyVoucherApi({ code, subtotal });
      setAppliedVoucher(result);
      setVoucherMessage(
        `Đã áp dụng ${result.code}. Đã dùng ${result.usedCount}/${result.usageLimit} lượt.`,
      );
      toast.success("Áp dụng voucher thành công.");
    } catch (err) {
      setAppliedVoucher(null);
      const message =
        err?.response?.data?.message || "Voucher không hợp lệ hoặc không còn sử dụng được.";
      setVoucherMessage(message);
      toast.error(message);
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  const handleCheckout = async () => {
    if (authLoading) return;

    if (!isAuthenticated) {
      toast.error("Bạn cần đăng nhập để thanh toán.");
      return;
    }

    if (items.length === 0) {
      toast.error("Giỏ hàng đang trống.");
      return;
    }

    const checkoutPairs = items
      .map((item) => ({ item, course: resolveCheckoutCourse(item) }))
      .filter((pair) => pair.course);

    if (checkoutPairs.length !== items.length) {
      toast.error("Có khóa học trong giỏ không còn tồn tại hoặc chưa được publish.");
      return;
    }

    const courseIds = Array.from(new Set(checkoutPairs.map((pair) => pair.course.courseId)));

    try {
      setIsCreatingPayment(true);
      const payment = await createPaymentApi(
        axiosPrivate,
        {
          courseIds,
          voucherCode: promo.trim() || null,
        },
        accessToken,
      );
      setActivePayment({
        ...payment,
        cartItemIds: checkoutPairs.map((pair) => pair.item.id),
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Không thể tạo thanh toán payOS.";
      toast.error(message);
    } finally {
      setIsCreatingPayment(false);
    }
  };

  const resolveCheckoutCourse = (item) => {
    const rawId = item?.courseId || item?.id;
    const byId = dbCourses.find((course) => String(course.courseId) === String(rawId));
    if (byId) return byId;

    const itemTitle = normalizeCourseTitle(item?.title);
    if (!itemTitle) return null;

    return dbCourses.find((course) => normalizeCourseTitle(course.title) === itemTitle) || null;
  };

  const handlePaymentPaid = () => {
    if (!activePayment?.courseId) return;
    const paidItemIds = new Set((activePayment.cartItemIds || [activePayment.cartItemId || activePayment.courseId]).map(String));
    const nextItems = setStoredCartItems(
      getStoredCartItems().filter((item) => !paidItemIds.has(String(item.id))),
    );
    setItems(nextItems);
    setAppliedVoucher(null);
    setVoucherMessage("");
  };

  return (
    <div className="cart-page">
      <div className="cart-panel">
        <div className="cart-left">
          <div className="cart-list">
            <div className="cart-list-header">
              <div>Course</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div>Actions</div>
            </div>

            {items.length === 0 && (
              <div className="cart-empty">
                <p>Giỏ hàng của bạn đang trống.</p>
                <Link to="/learnova/courses">Tiếp tục mua khóa học</Link>
              </div>
            )}

            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-course">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <Link
                      to={`/learnova/CoursesDetail/${item.id}`}
                      className="cart-item-title"
                    >
                      {item.title}
                    </Link>
                    <div className="cart-item-teacher">By {item.teacher}</div>
                  </div>
                </div>

                <div className="cart-item-price">
                  {parseCoursePrice(item.price).toLocaleString("vi-VN")}đ
                </div>

                <div className="cart-item-qty">
                  <span className="qty-num">1</span>
                </div>

                <div className="cart-item-total">
                  {parseCoursePrice(item.price).toLocaleString("vi-VN")}đ
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => askRemoveItem(item)}
                  type="button"
                  aria-label={`Remove ${item.title}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="cart-right">
          <div className="order-card">
            <h3>Order summary</h3>
            <div className="order-row">
              <span>Subtotal ({items.length} courses)</span>
              <span>{subtotal.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="order-row">
              <span>Discount</span>
              <span className="discount">-{discount.toLocaleString("vi-VN")}đ</span>
            </div>

            <div className="voucher-box">
              <label htmlFor="voucher-code">Voucher code</label>
              <div className="voucher-input-wrap">
                <Tag size={18} />
                <input
                  id="voucher-code"
                  type="text"
                  value={promo}
                  onChange={handleVoucherChange}
                  placeholder="Enter voucher"
                />
                <button
                  type="button"
                  className="voucher-apply-btn"
                  onClick={handleApplyVoucher}
                  disabled={isApplyingVoucher}
                >
                  {isApplyingVoucher ? "..." : "Apply"}
                </button>
              </div>
              {voucherMessage ? (
                <p
                  className={`voucher-message ${
                    appliedVoucher ? "voucher-message--success" : "voucher-message--error"
                  }`}
                >
                  {voucherMessage}
                </p>
              ) : null}
            </div>

            <div className="order-total">
              <span>Total</span>
              <span className="total-amount">{total.toLocaleString("vi-VN")}đ</span>
            </div>

            <button
              className="checkout"
              type="button"
              onClick={handleCheckout}
              disabled={isCreatingPayment || items.length === 0}
            >
              {isCreatingPayment ? "Creating payment..." : "Proceed to checkout"}
            </button>
            <button
              className="continue"
              type="button"
              onClick={() => navigate("/learnova/courses")}
            >
              Continue shopping
            </button>
          </div>
        </aside>
      </div>

      {itemToRemove && (
        <div className="cart-popup-backdrop" role="presentation">
          <div
            className="cart-confirm-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="remove-cart-title"
          >
            <button
              className="cart-popup-close"
              type="button"
              onClick={closeRemovePopup}
              aria-label="Close popup"
            >
              <X size={18} />
            </button>

            <div className="cart-popup-icon">
              <AlertTriangle size={26} />
            </div>

            <h3 id="remove-cart-title">Remove course?</h3>
            <p>
              Are you sure you want to remove{" "}
              <strong>{itemToRemove.title}</strong> from your cart?
            </p>

            <div className="cart-popup-actions">
              <button
                className="cart-popup-cancel"
                type="button"
                onClick={closeRemovePopup}
              >
                Cancel
              </button>
              <button
                className="cart-popup-confirm"
                type="button"
                onClick={confirmRemoveItem}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      {activePayment && (
        <PaymentModal
          payment={activePayment}
          onClose={() => setActivePayment(null)}
          onPaid={handlePaymentPaid}
        />
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Cart;
