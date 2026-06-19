import { Link } from "react-router-dom";
import { ShoppingCart, Globe } from "lucide-react";

const HeaderAction = () => {
  return (
    <div className="header-section">
      <Link to="/learnova/cart" className="header-action-cart">
        <ShoppingCart size={22} />
      </Link>

      <Link to="/learnova/auth/login" className="header-action-login">
        Log in
      </Link>

      <Link to="/learnova/auth/register" className="header-action-signup">
        Sign up
      </Link>

      <button className="header-action-language">
        <Globe size={22} />
      </button>
    </div>
  );
};

export default HeaderAction;