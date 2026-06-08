import {Link} from "react-router-dom";
import {ShoppingCart} from "lucide-react";

const HeaderAction = () => {
    return (
        <div className="header-section">
            <Link to="/learnova/cart" className="header-action-cart">
                <ShoppingCart size={25}/>
            </Link>

            <Link to={"/learnova/auth/login"} className="header-action-login">
                Login
            </Link>
        </div>
    );
}

export default HeaderAction;