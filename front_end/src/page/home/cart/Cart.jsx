import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Tag, Trash2, X } from "lucide-react";
import "./Cart.css";

const initialItems = [
  {
    id: 1,
    title: "React - From Zero to Hero",
    teacher: "John Smith",
    price: 49.99,
    qty: 1,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    id: 2,
    title: "Node.js - Complete Guide",
    teacher: "Sarah Johnson",
    price: 54.99,
    qty: 1,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
  {
    id: 3,
    title: "MongoDB Masterclass",
    teacher: "Michael Chen",
    price: 39.99,
    qty: 1,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
];

const Cart = () => {
  const [items, setItems] = useState(initialItems);
  const [promo, setPromo] = useState("");
  const [itemToRemove, setItemToRemove] = useState(null);

  const increment = (id) => {
    setItems((s) => s.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const decrement = (id) => {
    setItems((s) =>
      s.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)),
    );
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

                <div className="cart-item-price">${item.price.toFixed(2)}</div>

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
                  ${(item.price * item.qty).toFixed(2)}
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
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="order-row">
              <span>Discount</span>
              <span className="discount">-${discount.toFixed(2)}</span>
            </div>

            <div className="voucher-box">
              <label htmlFor="voucher-code">Voucher code</label>
              <div className="voucher-input-wrap">
                <Tag size={18} />
                <input
                  id="voucher-code"
                  type="text"
                  value={promo}
                  onChange={(event) => setPromo(event.target.value)}
                  placeholder="Enter voucher"
                />
              </div>
            </div>

            <div className="order-total">
              <span>Total</span>
              <span className="total-amount">${total.toFixed(2)}</span>
            </div>

            <button className="checkout">Proceed to checkout</button>
            <button className="continue">Continue shopping</button>
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
    </div>
  );
};

export default Cart;
