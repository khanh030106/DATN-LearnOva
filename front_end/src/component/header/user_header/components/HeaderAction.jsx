import { Link } from "react-router-dom";
import { ShoppingCart, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { getLanguage, toggleLanguage, LANG_EVENT } from "../../../../util/language.js";
import { t } from "../../../../util/i18n.js";

const HeaderAction = () => {
  const [lang, setLang] = useState(getLanguage());

  useEffect(() => {
    const onChange = (e) => setLang(e?.detail?.lang || getLanguage());
    window.addEventListener(LANG_EVENT, onChange);
    return () => window.removeEventListener(LANG_EVENT, onChange);
  }, []);

  const handleToggle = () => {
    console.log("Toggle clicked! Current lang:", getLanguage());
    const newLang = toggleLanguage();
    console.log("New lang:", newLang);
    console.log("localStorage learnova_lang:", localStorage.getItem("learnova_lang"));
  };

  return (
    <div className="header-section" data-lang={lang}>
      <Link to="/learnova/cart" className="header-action-cart" aria-label={t('open_cart')}>
        <ShoppingCart size={22} />
      </Link>

      <Link to="/learnova/auth/login" className="header-action-login">
        {t('login')}
      </Link>

      <Link to="/learnova/auth/register" className="header-action-signup">
        {t('signup')}
      </Link>

      <button className="header-action-language" onClick={handleToggle} aria-label={t('toggle_language')}>
        <Globe size={22} />
      </button>
    </div>
  );
};

export default HeaderAction;