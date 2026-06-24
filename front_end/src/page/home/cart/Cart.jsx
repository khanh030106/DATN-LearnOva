import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Tag, Trash2, X } from "lucide-react";
import { getCartItems, removeFromCart, updateCartQty, CART_EVENT } from "../../../util/cartStorage.js";
import { formatVnd } from "../../../util/currency.js";
import { getLanguage, LANG_EVENT } from "../../../util/language.js";
import { t } from "../../../util/i18n.js";
import "./Cart.css";

const Cart = () => {
  const [lang, setLang] = useState(getLanguage());
  const [items, setItems] = useState(getCartItems());
  const [promo, setPromo] = useState("");
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    const handleCartUpdate = () => setItems(getCartItems());
    const onLang = (e) => setLang(e?.detail?.lang || getLanguage());

    window.addEventListener(CART_EVENT, handleCartUpdate);
    window.addEventListener(LANG_EVENT, onLang);
    return () => {
      window.removeEventListener(CART_EVENT, handleCartUpdate);
      window.removeEventListener(LANG_EVENT, onLang);
    };
  }, []);

  const increment = (id) => {
    const current = getCartItems().find((item) => item.id === id);
    if (!current) return;
    setItems(updateCartQty(id, current.qty + 1));
  };

  const decrement = (id) => {
    const current = getCartItems().find((item) => item.id === id);
    if (!current) return;
    setItems(updateCartQty(id, Math.max(1, current.qty - 1)));
  };

  const askRemoveItem = (item) => setItemToRemove(item);

  const closeRemovePopup = () => setItemToRemove(null);

  const confirmRemoveItem = () => {
    if (!itemToRemove) return;
    setItems((s) => s.filter((i) => i.id !== itemToRemove.id));
    closeRemovePopup();
  };

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const discount = promo.trim().toUpperCase() === "SAVE20" ? 20 : 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="cart-page" data-lang={lang}>
      <div className="cart-panel">
        <div className="cart-left">
          <div className="cart-list">
            <div className="cart-list-header">
              <div>{t('course')}</div>
              <div>{t('price')}</div>
              <div>{t('quantity')}</div>
              <div>{t('total')}</div>
              <div>{t('actions')}</div>
            </div>

            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-course">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <Link
                      to={`/learnova/user/CoursesDetail/${item.id}`}
                      className="cart-item-title"
                    >
                      {item.title}
                    </Link>
                    <div className="cart-item-teacher">By {item.teacher}</div>
                  </div>
                </div>

                <div className="cart-item-price">{formatVnd(item.price)}</div>

                <div className="cart-item-qty">
                  <button
                    onClick={() => decrement(item.id)}
                    className="qty-btn"
                    type="button"
                  >
                    −
                  </button>
                  <span className="qty-num">{item.qty}</span>
                  <button
                    onClick={() => increment(item.id)}
                    className="qty-btn"
                    type="button"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  {formatVnd(item.price * item.qty)}
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
            <h3>{t('order_summary')}</h3>
            <div className="order-row">
              <span>{t('subtotal')} ({items.length} {t('cart_items') || 'courses'})</span>
              <span>{formatVnd(subtotal)}</span>
            </div>
            <div className="order-row">
              <span>{t('discount')}</span>
              <span className="discount">-{formatVnd(discount)}</span>
            </div>

            <div className="voucher-box">
              <label htmlFor="voucher-code">{t('voucher_code')}</label>
              <div className="voucher-input-wrap">
                <Tag size={18} />
                <input
                  id="voucher-code"
                  type="text"
                  value={promo}
                  onChange={(event) => setPromo(event.target.value)}
                  placeholder={t('enter_voucher')}
                />
              </div>
            </div>

            <div className="order-total">
              <span>{t('total')}</span>
              <span className="total-amount">{formatVnd(total)}</span>
            </div>

            <button className="checkout">{t('proceed_checkout')}</button>
            <button className="continue">{t('continue_shopping')}</button>
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

            <h3 id="remove-cart-title">{t('remove_course_title')}</h3>
            <p>
              {t('remove_course_text')} <strong>{itemToRemove.title}</strong>?
            </p>

            <div className="cart-popup-actions">
              <button
                className="cart-popup-cancel"
                type="button"
                onClick={closeRemovePopup}
              >
                {t('cancel')}
              </button>
              <button
                className="cart-popup-confirm"
                type="button"
                onClick={confirmRemoveItem}
              >
                {t('remove')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
