import { Link } from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown.jsx";

const SimpleMenuDropdown = ({ items, className = "" }) => {
  return (
    <HeaderDropdown className={className}>
      <ul className="user-logged-menu-list">
        {items.map((item) => (
          <li key={item.id}>
            <Link to={item.path} className="user-logged-menu-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </HeaderDropdown>
  );
};

export default SimpleMenuDropdown;
