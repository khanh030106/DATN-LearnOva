import { useCallback, useEffect, useMemo, useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import HeaderDropdown from "./HeaderDropdown.jsx";
import { getCartItems, removeFromCart, CART_EVENT } from "../../../../util/cartStorage.js";
import { formatVnd } from "../../../../util/currency.js";
import { getLanguage, LANG_EVENT } from "../../../../util/language.js";
import { t } from "../../../../util/i18n.js";

const CartDropdown = () => {
  const [items, setItems] = useState(getCartItems());
  const [lang, setLang] = useState(getLanguage());

  useEffect(() => {
    const handleCartUpdate = () => setItems(getCartItems());
    const onLangChange = (e) => setLang(e?.detail?.lang || getLanguage());
    window.addEventListener(CART_EVENT, handleCartUpdate);
    window.addEventListener(LANG_EVENT, onLangChange);
    return () => {
      window.removeEventListener(CART_EVENT, handleCartUpdate);
      window.removeEventListener(LANG_EVENT, onLangChange);
    };
  }, []);

  const totalItems = items.length;
  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price * (item.qty ?? 1), 0),
    [items]
  );

  const handleRemove = useCallback((itemId) => {
    setItems(removeFromCart(itemId));
  }, []);

  return (
    <div className="user-logged-icon-menu" data-lang={lang}>
      <button type="button" className="user-logged-icon-button" aria-label={t('open_cart')}>
        <ShoppingCart size={21} />
        {totalItems > 0 && <span className="user-logged-badge">{totalItems}</span>}
      </button>

      <HeaderDropdown align="right" className="user-logged-cart-dropdown">
        <div className="user-logged-dropdown-heading">
          <strong>{t('cart_title')}</strong>
          <span>{totalItems} {t('cart_items')}</span>
        </div>

        <div className="user-logged-cart-list">
          {items.map((item) => (
            <article key={item.id} className="user-logged-cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <span>{formatVnd(item.price)}</span>
              </div>
              <button
                type="button"
                className="user-logged-remove-button"
                onClick={() => handleRemove(item.id)}
                aria-label={`${t('remove_item_label')} ${item.name}`}
              >
                <X size={15} />
              </button>
            </article>
          ))}

          {items.length === 0 && (
            <p className="user-logged-empty-state">{t('cart_empty')}</p>
          )}
        </div>

        <div className="user-logged-cart-total">
          <span>{t('total_price')}</span>
          <strong>{formatVnd(totalPrice)}</strong>
        </div>
      </HeaderDropdown>
    </div>
  );
};

export default CartDropdown;
