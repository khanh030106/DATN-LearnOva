import { NavLink } from "react-router-dom";

const NavItems = [
  { name: "Home", path: "/learnova/home" },
  { name: "Courses", path: "/courses" },
  { name: "Instructors", path: "/instructors" },
  { name: "About us", path: "/aboutus" },
];

const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <ul className="nav-list">
        {NavItems.map((item, index) => (
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
