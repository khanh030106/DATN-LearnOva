import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";

const leftNav = [
    { name: "Home", path: "/learnova/home" },
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
                    <form className="header-search">
                        <Search size={18} className="header-search-icon" />
                        <input
                            type="text"
                            placeholder="Search courses..."
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
                            {item.name}
                        </NavLink>
                    </li>
                ))}

            </ul>
        </nav>
    );
};

export default NavMenu;