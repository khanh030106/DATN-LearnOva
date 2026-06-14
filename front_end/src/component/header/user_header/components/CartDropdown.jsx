import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CartDropdown = ({ initialItems }) => {
  const totalItems = initialItems.length;

  return (
    <div className="user-logged-icon-menu">
      <Link to="/learnova/user/cart" className="user-logged-icon-button" aria-label="Open cart">
        <ShoppingCart size={21} />
        {totalItems > 0 && <span className="user-logged-badge">{totalItems}</span>}
      </Link>
    </div>
  );
};

export default CartDropdown;
