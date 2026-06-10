import { Link } from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown.jsx";

const AvatarDropdown = ({ user, menuItems }) => {
  return (
    <div className="user-logged-avatar-menu">
      <button type="button" className="user-logged-avatar-button" aria-label="Open user menu">
        <img src={user.avatar} alt={user.name} />
      </button>

      <HeaderDropdown align="right" className="user-logged-profile-dropdown">
        <div className="user-logged-profile-card">
          <img src={user.avatar} alt={user.name} />
          <div>
            <strong>{user.name}</strong>
            <span>Active learner</span>
          </div>
        </div>

        <ul className="user-logged-menu-list">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={item.danger ? "user-logged-menu-separator" : ""}
            >
              <Link
                to={item.path}
                className={`user-logged-menu-link ${item.danger ? "is-danger" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </HeaderDropdown>
    </div>
  );
};

export default AvatarDropdown;
