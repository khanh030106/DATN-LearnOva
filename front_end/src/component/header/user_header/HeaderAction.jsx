import { Link } from "react-router-dom";
import { Globe2, ShoppingCart } from "lucide-react";

const HeaderAction = () => {
  return (
    <div className="header-section">
      <Link to="/learnova/user/cart" className="header-action-cart">
        <ShoppingCart size={25} />
      </Link>

      <Link to={"/learnova/auth/login"} className="header-action-login">
        Login
      </Link>

      <button type="button" className="header-action-language" aria-label="Change language">
        <Globe2 size={23} />
      </button>
    </div>
  );
};

export default HeaderAction;
