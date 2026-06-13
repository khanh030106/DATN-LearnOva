import { NavLink } from "react-router-dom";

const NavItems = [
  { name: "Home", path: "/learnova/home" },
  { name: "Courses", path: "/learnova/courses" },
  { name: "Instructors", path: "/learnova/intructors" },
  { name: "About us", path: "/learnova/about" },
];

const NavMenu = ({ items = NavItems, className = "" }) => {
  return (
    <nav className={`nav-menu ${className}`.trim()}>
      <ul className="nav-list">
        {items.map((item, index) => (
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
export { NavItems };
