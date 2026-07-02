import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import {
  CART_UPDATED_EVENT,
  getStoredCartItems,
} from "../../../../utils/cartStorage.js";

const CartDropdown = () => {
  const getCartQuantity = () =>
    getStoredCartItems().reduce((sum, item) => sum + (item.qty || 1), 0);

  const [totalItems, setTotalItems] = useState(() => getCartQuantity());

  useEffect(() => {
    const syncCartCount = () => {
      setTotalItems(getCartQuantity());
    };

    window.addEventListener(CART_UPDATED_EVENT, syncCartCount);
    window.addEventListener("storage", syncCartCount);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncCartCount);
      window.removeEventListener("storage", syncCartCount);
    };
  }, []);

  return (
    <Link
      to="/learnova/cart"
      className="user-logged-icon-button user-logged-cart-link"
      aria-label="Open cart"
    >
      <ShoppingCart size={21} />
      {totalItems > 0 && <span className="user-logged-badge">{totalItems}</span>}
    </Link>
  );
};

export default CartDropdown;
