import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

const HeaderAction = () => {
  const { t } = useTranslation();

  return (
    <div className="header-section">
      <Link to="/learnova/cart" className="header-action-cart">
        <ShoppingCart size={22} />
      </Link>

      <Link to="/learnova/auth/login" className="header-action-login">
        {t("header.login")}
      </Link>

      <Link to="/learnova/auth/register" className="header-action-signup">
        {t("header.signup")}
      </Link>

      <LanguageSwitcher />
    </div>
  );
};

export default HeaderAction;
