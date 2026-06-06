import { Bell, Settings, Search } from "lucide-react";
import "./Header.css";

const headerData = {
  searchPlaceholder: "Search data, users...",
  organizationName: "ADMIN LEARNOVA",
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
  },
  {
    id: "settings",
    label: "Settings",
    iconName: "settings",
    badge: null,
  },
];

const iconMap = {
  bell: Bell,
  settings: Settings,
};

const Header = () => {
  return (
    <header className="admin-topbar">
      <label className="admin-search">
        <Search size={20} />
        <input
          type="search"
          placeholder={headerData.searchPlaceholder}
          aria-label={headerData.searchPlaceholder}
        />
      </label>

      <div className="admin-topbar__actions">
        {actionItems.map((item) => {
          const ActionIcon = iconMap[item.iconName];
          return (
            <button key={item.id} aria-label={item.label}>
              <ActionIcon size={20} />
              {item.badge ? <span>{item.badge}</span> : null}
            </button>
          );
        })}

        <div className="admin-profile">
          <div>
            <strong>{headerData.organizationName}</strong>
            <small>{headerData.roleName}</small>
          </div>
          <img src={headerData.avatarUrl} alt={headerData.avatarAlt} />
        </div>
      </div>
    </header>
  );
};

export default Header;
