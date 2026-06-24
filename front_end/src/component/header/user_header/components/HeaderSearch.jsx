import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getLanguage, LANG_EVENT } from "../../../../util/language.js";
import { t } from "../../../../util/i18n.js";

const HeaderSearch = ({ suggestions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [lang, setLang] = useState(getLanguage());

  useEffect(() => {
    const onLangChange = (e) => setLang(e?.detail?.lang || getLanguage());
    window.addEventListener(LANG_EVENT, onLangChange);
    return () => window.removeEventListener(LANG_EVENT, onLangChange);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedTerm(searchTerm.trim().toLowerCase());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchTerm]);

  const filteredSuggestions = useMemo(() => {
    if (!debouncedTerm) return suggestions.slice(0, 4);

    return suggestions.filter((item) => {
      const label = item.label.toLowerCase();
      const type = item.type.toLowerCase();

      return label.includes(debouncedTerm) || type.includes(debouncedTerm);
    });
  }, [debouncedTerm, suggestions]);

  return (
    <form className="user-logged-search" role="search" data-lang={lang}>
      <Search size={18} className="user-logged-search-icon" />
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => window.setTimeout(() => setIsFocused(false), 120)}
        placeholder={t("search_full")}
        className="user-logged-search-input"
        aria-label={t("search_full")}
      />

      {isFocused && filteredSuggestions.length > 0 && (
        <div className="user-logged-search-suggestions">
          {filteredSuggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              className="user-logged-search-suggestion"
              onMouseDown={() => setSearchTerm(item.label)}
            >
              <Search size={15} />
              <span>{item.labelKey ? t(item.labelKey) : item.label}</span>
              <small>{item.type}</small>
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default HeaderSearch;
