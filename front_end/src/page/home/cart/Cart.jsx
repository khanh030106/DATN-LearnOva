import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
    toast.success(t("cart.removedFromCart", { title: removedTitle }));
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
      setVoucherMessage(t("cart.enterVoucherCode"));
      return;
    }

    if (items.length === 0 || subtotal <= 0) {
      setVoucherMessage(t("cart.cartEmpty"));
      return;
    }

    if (appliedVoucher?.code?.toLowerCase() === code.toLowerCase()) {
      setVoucherMessage(t("cart.voucherAlreadyApplied"));
      return;
    }

    try {
      setIsApplyingVoucher(true);
      setVoucherMessage("");
      const result = await applyVoucherApi({ code, subtotal });
      setAppliedVoucher(result);
      setVoucherMessage(
        t("cart.voucherApplied", { code: result.code, usedCount: result.usedCount, usageLimit: result.usageLimit }),
      );
      toast.success(t("cart.voucherAppliedSuccess"));
    } catch (err) {
      setAppliedVoucher(null);
      const message =
        err?.response?.data?.message || t("cart.voucherInvalid");
      setVoucherMessage(message);
      toast.error(message);
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  const handleCheckout = async () => {
    if (authLoading) return;

    if (!isAuthenticated) {
      toast.error(t("cart.loginToCheckout"));
      return;
    }

    if (items.length === 0) {
      toast.error(t("cart.cartEmpty"));
      return;
    }

    const checkoutPairs = items
      .map((item) => ({ item, course: resolveCheckoutCourse(item) }))
      .filter((pair) => pair.course);

    if (checkoutPairs.length !== items.length) {
      toast.error(t("cart.coursesUnavailable"));
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
        t("cart.paymentCreateError");
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
              <div>{t("cart.colCourse")}</div>
              <div>{t("cart.colPrice")}</div>
              <div>{t("cart.colQuantity")}</div>
              <div>{t("cart.colTotal")}</div>
              <div>{t("cart.colActions")}</div>
            </div>

            {items.length === 0 && (
              <div className="cart-empty">
                <p>{t("cart.emptyMessage")}</p>
                <Link to="/learnova/courses">{t("cart.continueBrowsing")}</Link>
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
                    <div className="cart-item-teacher">{t("cart.byInstructor", { name: item.teacher })}</div>
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
                  aria-label={t("cart.removeAria", { title: item.title })}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="cart-right">
          <div className="order-card">
            <h3>{t("cart.orderSummary")}</h3>
            <div className="order-row">
              <span>{t("cart.subtotal", { count: items.length })}</span>
              <span>{subtotal.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="order-row">
              <span>{t("cart.discount")}</span>
              <span className="discount">-{discount.toLocaleString("vi-VN")}đ</span>
            </div>

            <div className="voucher-box">
              <label htmlFor="voucher-code">{t("cart.voucherLabel")}</label>
              <div className="voucher-input-wrap">
                <Tag size={18} />
                <input
                  id="voucher-code"
                  type="text"
                  value={promo}
                  onChange={handleVoucherChange}
                  placeholder={t("cart.voucherPlaceholder")}
                />
                <button
                  type="button"
                  className="voucher-apply-btn"
                  onClick={handleApplyVoucher}
                  disabled={isApplyingVoucher}
                >
                  {isApplyingVoucher ? t("cart.applying") : t("cart.apply")}
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
              <span>{t("cart.total")}</span>
              <span className="total-amount">{total.toLocaleString("vi-VN")}đ</span>
            </div>

            <button
              className="checkout"
              type="button"
              onClick={handleCheckout}
              disabled={isCreatingPayment || items.length === 0}
            >
              {isCreatingPayment ? t("cart.creatingPayment") : t("cart.proceedToCheckout")}
            </button>
            <button
              className="continue"
              type="button"
              onClick={() => navigate("/learnova/courses")}
            >
              {t("cart.continueShopping")}
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
              aria-label={t("cart.closePopup")}
            >
              <X size={18} />
            </button>

            <div className="cart-popup-icon">
              <AlertTriangle size={26} />
            </div>

            <h3 id="remove-cart-title">{t("cart.removeTitle")}</h3>
            <p>
              {t("cart.removeConfirm")}{" "}
              <strong>{itemToRemove.title}</strong> {t("cart.removeConfirmSuffix")}
            </p>

            <div className="cart-popup-actions">
              <button
                className="cart-popup-cancel"
                type="button"
                onClick={closeRemovePopup}
              >
                {t("cart.cancel")}
              </button>
              <button
                className="cart-popup-confirm"
                type="button"
                onClick={confirmRemoveItem}
              >
                {t("cart.remove")}
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
