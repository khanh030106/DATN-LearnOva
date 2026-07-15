import { Settings, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import NotificationBell from "./NotificationBell.jsx";
import "./Header.css";

const headerData = {
  adminName: "Admin",
  roleName: "Administrator",
  avatarUrl:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
  avatarAlt: "Administrator avatar",
};

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  let title = "";

  const normPath = pathname.replace(/\/$/, "");

  if (normPath === "/learnova/admin") {
    title = "Overview";
  } else if (normPath === "/learnova/admin/users") {
    title = "User Management";
  } else if (normPath === "/learnova/admin/teachers") {
    title = "Instructors";
  } else if (normPath === "/learnova/admin/courses") {
    title = "Courses";
  } else if (normPath === "/learnova/admin/categories") {
    title = "Categories";
  } else if (normPath === "/learnova/admin/revenue") {
    title = "Revenue";
  } else if (normPath === "/learnova/admin/vouchers") {
    title = "Vouchers";
  } else if (normPath === "/learnova/admin/violation-reports") {
    title = "Violation Reports";
  } else if (normPath === "/learnova/admin/settings") {
    title = "Settings";
  } else if (normPath === "/learnova/admin/notifications") {
    title = "Notifications";
  } else {
    title = "Dashboard";
  }

  return (
    <header className="admin-topbar">
      <div className="admin-topbar__intro">
        <h1>{title}</h1>
      </div>

      <div className="admin-topbar__actions">
        <NotificationBell />
        <button aria-label="Settings" className="admin-topbar__btn">
          <Settings size={20} />
        </button>
        <div className="admin-profile">
          <img src={headerData.avatarUrl} alt={headerData.avatarAlt} />
          <span>{headerData.adminName}</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;
