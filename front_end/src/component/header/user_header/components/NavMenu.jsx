import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const NavMenu = () => {
    const { t } = useTranslation();

    const leftNav = [
        { key: "header.home", path: "/learnova/home" },
        { key: "header.courses", path: "/learnova/courses" },
    ];

    const rightNav = [
        { key: "header.instructors", path: "/learnova/intructors" },
        { key: "header.aboutUs", path: "/learnova/about" },
    ];

    return (
        <nav className="nav-menu">
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
                            {t(item.key)}
                        </NavLink>
                    </li>
                ))}

                <li className="nav-search-item">
                    <form className="header-search">
                        <Search size={18} className="header-search-icon" />
                        <input
                            type="text"
                            placeholder={t("header.searchPlaceholder")}
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
                            {t(item.key)}
                        </NavLink>
                    </li>
                ))}

            </ul>
        </nav>
    );
};

export default NavMenu;
