import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const initialItems = [
  { id: 1, title: 'React - From Zero to Hero', teacher: 'John Smith', price: 49.99, qty: 1, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f' },
  { id: 2, title: 'Node.js - Complete Guide', teacher: 'Sarah Johnson', price: 54.99, qty: 1, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3' },
  { id: 3, title: 'MongoDB Masterclass', teacher: 'Michael Chen', price: 39.99, qty: 1, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c' }
];

const Cart = () => {
  const [items, setItems] = useState(initialItems);
  const [promo, setPromo] = useState('');

  const increment = (id) => {
    setItems((s) => s.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  };

  const decrement = (id) => {
    setItems((s) => s.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i));
  };

  const removeItem = (id) => setItems((s) => s.filter(i => i.id !== id));

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const discount = promo === 'SAVE20' ? 20 : 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="cart-page">
      <div className="cart-panel">
        <div className="cart-left">
          <h1>Your cart</h1>
          <p className="cart-sub">Review the courses you've added to your cart.</p>

          <div className="cart-list">
            <div className="cart-list-header">
              <div>Course</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>

            {items.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-course">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <Link to={`/learnova/home/course/${item.id}`} className="cart-item-title">{item.title}</Link>
                    <div className="cart-item-teacher">By {item.teacher}</div>
                  </div>
                </div>

                <div className="cart-item-price">${item.price.toFixed(2)}</div>

                <div className="cart-item-qty">
                  <button onClick={() => decrement(item.id)} className="qty-btn">−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button onClick={() => increment(item.id)} className="qty-btn">+</button>
                </div>

                <div className="cart-item-total">${(item.price * item.qty).toFixed(2)}</div>

                <button className="cart-item-remove" onClick={() => removeItem(item.id)}>🗑️</button>
              </div>
            ))}

            <div className="cart-actions">
              <button className="btn-clear" onClick={clearCart}>Clear cart</button>
              <button className="btn-wishlist">Move all to wishlist</button>
            </div>
          </div>

          <div className="promo-row">
            <div className="promo-left">
              <h3>Have a promo code?</h3>
              <p>Apply a coupon code to get discount.</p>
            </div>
            <div className="promo-right">
              <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Enter code" />
              <button className="btn-apply">Apply code</button>
            </div>
          </div>
        </div>

        <aside className="cart-right">
          <div className="order-card">
            <h3>Order summary</h3>
            <div className="order-row"><span>Subtotal ({items.length} courses)</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="order-row"><span>Discount</span><span className="discount">-${discount.toFixed(2)}</span></div>
            <div className="order-total"><span>Total</span><span className="total-amount">${total.toFixed(2)}</span></div>

            <button className="checkout">Proceed to checkout</button>
            <button className="continue">Continue shopping</button>
          </div>

          <div className="benefits">
            <div className="benefit"><strong>30-day money-back guarantee</strong><p>Full refund if you're not satisfied</p></div>
            <div className="benefit"><strong>Lifetime access</strong><p>Access your courses forever</p></div>
            <div className="benefit"><strong>Secure payment</strong><p>Your payment information is safe</p></div>
            <div className="benefit"><strong>Certificate of completion</strong><p>Earn a certificate for each course</p></div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
