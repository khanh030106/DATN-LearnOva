import { NavLink } from "react-router-dom";
import HeaderSearch from "./HeaderSearch.jsx";

const leftNav = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/learnova/courses" },
];

const rightNav = [
    { name: "Instructors", path: "/learnova/intructors" },
    { name: "About us", path: "/learnova/about" },
];

const NavMenu = () => {
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
                            {item.name}
                        </NavLink>
                    </li>
                ))}

                <li className="nav-search-item">
                    <HeaderSearch variant="guest" />
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
                            {item.name}
                        </NavLink>
                    </li>
                ))}

            </ul>
        </nav>
    );
};

export default NavMenu;