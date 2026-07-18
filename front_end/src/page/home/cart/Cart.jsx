import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, Tag, Trash2, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
import { applyVoucherApi } from "../../../api/VoucherApi.js";
import { createPaymentApi } from "../../../api/PaymentApi.js";
import { getPublicCoursesApi } from "../../../api/CourseApi.js";
import { getMyCartApi, removeCartItemApi } from "../../../api/CartApi.js";
import PaymentModal from "../../../component/payment/PaymentModal.jsx";
import { useAuth } from "../../../hook/UseAuth.jsx";
import { useAxiosPrivate } from "../../../hook/UseAxiosPrivate.js";
import {
  CART_UPDATED_EVENT,
  getStoredCartItems,
  mapCartApiItem,
  removeStoredCartItem,
  setStoredCartItems,
} from "../../../utils/cartStorage.js";

/** Catalog prices are USD. */
function toUsdNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatUsd(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(toUsdNumber(amount));
}

function normalizeTitle(title) {
  return String(title || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

const Cart = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { accessToken, isAuthenticated, loading: authLoading } = useAuth();

  const [items, setItems] = useState([]);
  const [dbCourses, setDbCourses] = useState([]);
  const [promo, setPromo] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [activePayment, setActivePayment] = useState(null);
  const [itemToRemove, setItemToRemove] = useState(null);

  // Load cart: guest = localStorage, logged-in = API
  const loadCartItems = async () => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setItems(getStoredCartItems());
      return;
    }

    try {
      const data = await getMyCartApi(axiosPrivate, accessToken);
      setItems(Array.isArray(data) ? data.map(mapCartApiItem) : []);
    } catch {
      setItems(getStoredCartItems());
    }
  };

  useEffect(() => {
    loadCartItems();

    const onCartChange = () => {
      loadCartItems();
      setAppliedVoucher(null);
    };

    window.addEventListener(CART_UPDATED_EVENT, onCartChange);
    window.addEventListener("storage", onCartChange);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, onCartChange);
      window.removeEventListener("storage", onCartChange);
    };
  }, [authLoading, isAuthenticated, accessToken]);

  useEffect(() => {
    getPublicCoursesApi()
      .then((data) => setDbCourses(Array.isArray(data) ? data : []))
      .catch(() => setDbCourses([]));
  }, []);

  const subtotal = items.reduce((sum, item) => sum + toUsdNumber(item.price), 0);
  const discount = Number(appliedVoucher?.discountAmount || 0);
  const total = Math.max(0, subtotal - discount);

  const findCheckoutCourse = (item) => {
    const rawId = item.courseId ?? item.id;
    const byId = dbCourses.find((course) => String(course.courseId) === String(rawId));
    if (byId) return byId;

    const title = normalizeTitle(item.title);
    if (!title) return null;
    return dbCourses.find((course) => normalizeTitle(course.title) === title) || null;
  };

  const confirmRemoveItem = async () => {
    if (!itemToRemove) return;

    const courseId = itemToRemove.courseId ?? itemToRemove.id;
    const title = itemToRemove.title;

    try {
      if (isAuthenticated) {
        await removeCartItemApi(axiosPrivate, courseId, accessToken);
        await loadCartItems();
        window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
      } else {
        setItems(removeStoredCartItem(courseId));
      }

      setAppliedVoucher(null);
      setItemToRemove(null);
      toast.success(`Removed "${title}" from cart.`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to remove course from cart.");
    }
  };

  const handleApplyVoucher = async () => {
    const code = promo.trim();

    if (!code) {
      toast.error("Please enter a voucher code.");
      return;
    }
    if (items.length === 0 || subtotal <= 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (appliedVoucher?.code?.toLowerCase() === code.toLowerCase()) {
      toast.info("Voucher already applied.");
      return;
    }

    try {
      setIsApplyingVoucher(true);
      const result = await applyVoucherApi({ code, subtotal });
      setAppliedVoucher(result);
      toast.success("Voucher applied.");
    } catch (err) {
      setAppliedVoucher(null);
      const message = err?.response?.data?.message || "Invalid or unavailable voucher.";
      toast.error(message);
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  const handleCheckout = async () => {
    if (authLoading) return;

    if (!isAuthenticated) {
      toast.error("Please log in to checkout.");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    // Free cart (or voucher to $0): still checkout — server enrolls without PayOS
    const checkoutPairs = items
      .map((item) => ({ item, course: findCheckoutCourse(item) }))
      .filter((pair) => pair.course);

    if (checkoutPairs.length !== items.length) {
      toast.error("Some courses in your cart are unavailable or not published.");
      return;
    }

    const courseIds = checkoutPairs.map((pair) => pair.course.courseId);

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

      if (
        payment?.orderStatus === "PAID" ||
        payment?.paymentStatus === "SUCCESS" ||
        payment?.paymentMethod === "FREE"
      ) {
        const paidIds = checkoutPairs.map((pair) => pair.item.id);
        if (isAuthenticated) {
          for (const id of paidIds) {
            try {
              await removeCartItemApi(axiosPrivate, id, accessToken);
            } catch {
              // ignore
            }
          }
        } else {
          setStoredCartItems([]);
        }
        window.dispatchEvent(new Event(CART_UPDATED_EVENT));
        await loadCartItems();
        toast.success("Enrolled for free. Opening My Courses…");
        navigate("/learnova/user/profile/courses");
        return;
      }

      setActivePayment({
        ...payment,
        cartItemIds: checkoutPairs.map((pair) => pair.item.id),
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Unable to create payment.";
      toast.error(msg, { autoClose: 4000 });
    } finally {
      setIsCreatingPayment(false);
    }
  };

  const handlePaymentPaid = async () => {
    if (!activePayment) return;

    const paidIds = new Set(
      (activePayment.cartItemIds || [
        activePayment.cartItemId || activePayment.courseId,
      ]).map(String),
    );

    if (isAuthenticated) {
      for (const id of paidIds) {
        try {
          await removeCartItemApi(axiosPrivate, id, accessToken);
        } catch {
          // ignore single remove failure
        }
      }
      await loadCartItems();
      window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
    } else {
      const nextItems = getStoredCartItems().filter(
        (item) => !paidIds.has(String(item.courseId ?? item.id)),
      );
      setItems(setStoredCartItems(nextItems));
    }

    setAppliedVoucher(null);
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
                <p>Your cart is empty.</p>
                <Link to="/learnova/courses">Continue shopping</Link>
              </div>
            )}

            {items.map((item) => {
              const courseId = item.courseId ?? item.id;
              const priceText = formatUsd(item.price);

              return (
                <div className="cart-item" key={courseId}>
                  <div className="cart-item-course">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <Link
                        to={`/learnova/CoursesDetail/${courseId}`}
                        className="cart-item-title"
                      >
                        {item.title}
                      </Link>
                      <div className="cart-item-teacher">By {item.teacher}</div>
                    </div>
                  </div>

                  <div className="cart-item-price">{priceText}</div>
                  <div className="cart-item-qty">
                    <span className="qty-num">1</span>
                  </div>
                  <div className="cart-item-total">{priceText}</div>

                  <button
                    className="cart-item-remove"
                    type="button"
                    aria-label={`Remove ${item.title}`}
                    onClick={() => setItemToRemove(item)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="cart-right">
          <div className="order-card">
            <h3>Order summary</h3>

            <div className="order-row">
              <span>Subtotal ({items.length} courses)</span>
              <span>{formatUsd(subtotal)}</span>
            </div>

            <div className="order-row">
              <span>Discount</span>
              <span className="discount">-{formatUsd(discount)}</span>
            </div>

            <div className="voucher-box">
              <label htmlFor="voucher-code">Voucher code</label>
              <div className="voucher-input-wrap">
                <Tag size={18} />
                <input
                  id="voucher-code"
                  type="text"
                  value={promo}
                  placeholder="Enter voucher"
                  onChange={(event) => {
                    setPromo(event.target.value);
                    setAppliedVoucher(null);
                  }}
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
            </div>

            <div className="order-total">
              <span>Total</span>
              <span className="total-amount">{formatUsd(total)}</span>
            </div>

            <button
              className="checkout"
              type="button"
              onClick={handleCheckout}
              disabled={isCreatingPayment || items.length === 0}
            >
              {isCreatingPayment
                ? total <= 0
                  ? "Enrolling..."
                  : "Creating payment..."
                : total <= 0
                  ? "Enroll for free"
                  : "Proceed to checkout"}
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
          <div className="cart-confirm-popup" role="dialog" aria-modal="true">
            <button
              className="cart-popup-close"
              type="button"
              aria-label="Close popup"
              onClick={() => setItemToRemove(null)}
            >
              <X size={18} />
            </button>

            <div className="cart-popup-icon">
              <AlertTriangle size={26} />
            </div>

            <h3>Remove course?</h3>
            <p>
              Are you sure you want to remove{" "}
              <strong>{itemToRemove.title}</strong> from your cart?
            </p>

            <div className="cart-popup-actions">
              <button
                className="cart-popup-cancel"
                type="button"
                onClick={() => setItemToRemove(null)}
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

      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        draggable
        limit={3}
      />
    </div>
  );
};

export default Cart;
