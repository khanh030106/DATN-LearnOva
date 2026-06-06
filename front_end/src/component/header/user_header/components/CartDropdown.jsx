import { useCallback, useMemo, useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import HeaderDropdown from "./HeaderDropdown.jsx";

const CartDropdown = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);

  const totalItems = items.length;
  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price, 0),
    [items]
  );

  const handleRemove = useCallback((itemId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  }, []);

  return (
    <div className="user-logged-icon-menu">
      <button type="button" className="user-logged-icon-button" aria-label="Open cart">
        <ShoppingCart size={21} />
        {totalItems > 0 && <span className="user-logged-badge">{totalItems}</span>}
      </button>

      <HeaderDropdown align="right" className="user-logged-cart-dropdown">
        <div className="user-logged-dropdown-heading">
          <strong>Your Cart</strong>
          <span>{totalItems} items</span>
        </div>

        <div className="user-logged-cart-list">
          {items.map((item) => (
            <article key={item.id} className="user-logged-cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <span>${item.price}</span>
              </div>
              <button
                type="button"
                className="user-logged-remove-button"
                onClick={() => handleRemove(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                <X size={15} />
              </button>
            </article>
          ))}

          {items.length === 0 && (
            <p className="user-logged-empty-state">Your cart is empty.</p>
          )}
        </div>

        <div className="user-logged-cart-total">
          <span>Total Price</span>
          <strong>${totalPrice}</strong>
        </div>
      </HeaderDropdown>
    </div>
  );
};

export default CartDropdown;
