import { Bell, Search, Settings } from "lucide-react";
import "./Header.css";

const headerData = {
  searchPlaceholder: "Tìm kiếm dữ liệu, người dùng...",
  organizationName: "ADMIN LEARNOVA",
  roleName: "Quản trị viên",
  avatarUrl:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
  avatarAlt: "Ảnh đại diện quản trị viên",
};

const actionItems = [
  {
    id: "notifications",
    label: "Thông báo",
    iconName: "bell",
    hasBadge: true,
  },
  {
    id: "settings",
    label: "Cài đặt",
    iconName: "settings",
    hasBadge: false,
  },
];

const iconMap = {
  bell: Bell,
  settings: Settings,
};

export const Header = () => {
  return (
    <header className="adminHeader">
      <div className="adminHeaderSearchBox">
        <Search
          className="adminHeaderSearchIcon"
          size={20}
          aria-hidden="true"
        />
        <input
          type="text"
          className="adminHeaderSearchInput"
          placeholder={headerData.searchPlaceholder}
          aria-label={headerData.searchPlaceholder}
        />
      </div>

      <div className="adminHeaderActions">
        <div className="adminHeaderIconGroup">
          {actionItems.map((item) => {
            const ActionIcon = iconMap[item.iconName];

            return (
              <button
                key={item.id}
                type="button"
                className="adminHeaderIconButton"
                aria-label={item.label}
              >
                <ActionIcon size={20} aria-hidden="true" />
                {item.hasBadge ? <span className="adminHeaderBadge" /> : null}
              </button>
            );
          })}
        </div>

        <button type="button" className="adminHeaderProfileButton">
          <div className="adminHeaderProfileText">
            <span className="adminHeaderOrganizationName">
              {headerData.organizationName}
            </span>
            <span className="adminHeaderRoleName">{headerData.roleName}</span>
          </div>

          <div className="adminHeaderAvatarWrap">
            <img
              src={headerData.avatarUrl}
              alt={headerData.avatarAlt}
              className="adminHeaderAvatar"
            />
            <span className="adminHeaderOnlineStatus" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
