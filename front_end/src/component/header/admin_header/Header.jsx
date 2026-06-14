import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import "./Header.css";

const headerData = {
  adminName: "Hiếu",
  roleName: "Administrator",
  avatarUrl:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
  avatarAlt: "Administrator avatar",
};

const actionItems = [
  {
    id: "notifications",
    label: "Notifications",
    iconName: "bell",
    badge: "3",
    to: "/learnova/admin/notifications",
  },
  {
    id: "settings",
    label: "Settings",
    iconName: "settings",
    badge: null,
    to: "/learnova/admin/settings",
  },
];

const iconMap = {
  bell: Bell,
  settings: Settings,
};

const Header = () => {
  return (
    <header className="admin-topbar">
      <div className="admin-topbar__actions">
        {actionItems.map((item) => {
          const ActionIcon = iconMap[item.iconName];
          return item.to ? (
            <Link key={item.id} to={item.to} aria-label={item.label}>
              <ActionIcon size={20} />
              {item.badge ? <span>{item.badge}</span> : null}
            </Link>
          ) : (
            <button key={item.id} aria-label={item.label}>
              <ActionIcon size={20} />
              {item.badge ? <span>{item.badge}</span> : null}
            </button>
          );
        })}

        <div className="admin-profile">
          <div>
            <strong>{headerData.adminName}</strong>
            <small>{headerData.roleName}</small>
          </div>
          <img src={headerData.avatarUrl} alt={headerData.avatarAlt} />
        </div>
      </div>
    </header>
  );
};

export default Header;
