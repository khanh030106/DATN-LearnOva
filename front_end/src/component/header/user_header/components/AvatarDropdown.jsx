import { Link, useNavigate } from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown.jsx";
import {useUserData} from "./headerData.js";
import {useAuth} from "../../../../hook/UseAuth.jsx";

const AvatarDropdown = ({ menuItems }) => {
  const user = useUserData();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuClick = async (item) => {
    if (item.id === "logout") {
      await logout();
      navigate("/learnova/auth/login");
    }
  };

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
            <span>
              {user.roles && user.roles.length > 0
                ? user.roles[0].replace("ROLE_", "")
                : "Active learner"}
            </span>
          </div>
        </div>

        <ul className="user-logged-menu-list">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={item.danger ? "user-logged-menu-separator" : ""}
            >
              {item.id === "logout" ? (
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`user-logged-menu-link ${item.danger ? "is-danger" : ""}`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`user-logged-menu-link ${item.danger ? "is-danger" : ""}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </HeaderDropdown>
    </div>
  );
};

export default AvatarDropdown;
