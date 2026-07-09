import { Bell } from "lucide-react";
import HeaderDropdown from "./HeaderDropdown.jsx";

const NotificationDropdown = ({ notifications }) => {

  return (
    <div className="user-logged-icon-menu">
      <button type="button" className="user-logged-icon-button" aria-label="Open notifications">
        <Bell size={21} />
      </button>

      <HeaderDropdown align="right" className="user-logged-notification-dropdown">
        <div className="user-logged-dropdown-heading">
          <strong>Notifications</strong>
          <span> new</span>
        </div>

        <ul className="user-logged-notification-list">

        </ul>
      </HeaderDropdown>
    </div>
  );
};

export default NotificationDropdown;
