import {Link} from "react-router-dom";
import {ShoppingCart} from "lucide-react";

const HeaderAction = () => {
    return (
        <div className="header-section">
            <Link to="/cart" className="header-action-cart">
                <ShoppingCart size={22}/>
            </Link>

            <Link to={"/login"} className="header-action-login">
                Login
            </Link>
        </div>
    );
}

export default HeaderAction;