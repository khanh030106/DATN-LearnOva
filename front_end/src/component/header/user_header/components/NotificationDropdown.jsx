import { Bell } from "lucide-react";
import HeaderDropdown from "./HeaderDropdown.jsx";

const NotificationDropdown = ({ notifications, isOpen = false }) => {
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <div className={`user-logged-icon-menu ${isOpen ? "is-open" : ""}`}>
      <button type="button" className="user-logged-icon-button" aria-label="Open notifications">
        <Bell size={21} />
        {unreadCount > 0 && <span className="user-logged-badge">{unreadCount}</span>}
      </button>

      <HeaderDropdown align="right" className="user-logged-notification-dropdown">
        <div className="user-logged-dropdown-heading">
          <strong>Notifications</strong>
          <span>{unreadCount} new</span>
        </div>

        <ul className="user-logged-notification-list">
          {notifications.map((item) => (
            <li key={item.id} className={item.unread ? "is-unread" : ""}>
              <span />
              <div>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </HeaderDropdown>
    </div>
  );
};

export default NotificationDropdown;
