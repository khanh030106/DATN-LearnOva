import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getLanguage, LANG_EVENT } from "../../../../util/language.js";
import { t } from "../../../../util/i18n.js";

const leftNav = [
    { labelKey: "home", path: "/learnova/home" },
    { labelKey: "courses", path: "/learnova/courses" },
];

const rightNav = [
    { labelKey: "instructors", path: "/learnova/intructors" },
    { labelKey: "about_us", path: "/learnova/about" },
];

const NavMenu = () => {
    const [lang, setLang] = useState(getLanguage());

    useEffect(() => {
        const onLangChange = (e) => setLang(e?.detail?.lang || getLanguage());
        window.addEventListener(LANG_EVENT, onLangChange);
        return () => window.removeEventListener(LANG_EVENT, onLangChange);
    }, []);

    return (
        <nav className="nav-menu" data-lang={lang}>
            <ul className="nav-list">

                {leftNav.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            end
                            className={({ isActive }) =>
                                `nav-menu-link ${isActive ? "nav-menu-link-active" : ""}`
                            }
                        >
                            {t(item.labelKey)}
                        </NavLink>
                    </li>
                ))}

                <li className="nav-search-item">
                    <form className="header-search">
                        <Search size={18} className="header-search-icon" />
                        <input
                            type="text"
                            placeholder={t("search_placeholder")}
                            className="header-search-input"
                        />
                    </form>
                </li>

                {rightNav.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            end
                            className={({ isActive }) =>
                                `nav-menu-link ${isActive ? "nav-menu-link-active" : ""}`
                            }
                        >
                            {t(item.labelKey)}
                        </NavLink>
                    </li>
                ))}

            </ul>
        </nav>
    );
};

export default NavMenu;