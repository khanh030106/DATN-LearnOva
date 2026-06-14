import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  CircleDollarSign,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Ticket,
  Users,
} from "lucide-react";
import logoText from "../../../assets/LogoText.png";
import "./SidebarAdmin.css";

const menuItems = [
  {
    id: "dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    path: "/learnova/admin",
    end: true,
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    path: "/learnova/admin/users",
  },
  {
    id: "teachers",
    label: "Instructors",
    icon: GraduationCap,
    path: "/learnova/admin/teachers",
  },
  {
    id: "courses",
    label: "Courses",
    icon: BookOpen,
    path: "/learnova/admin/courses",
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: CircleDollarSign,
    path: "/learnova/admin/revenue",
  },
  // {
  //   id: "reports",
  //   label: "Reports",
  //   icon: BarChart3,
  //   path: "/learnova/admin/reports",
  // },
  // {
  //   id: "reports",
  //   label: "Reports",
  //   icon: BarChart3,
  //   path: "/learnova/admin/reports",
  // },
  {
    id: "vouchers",
    label: "Vouchers",
    icon: Ticket,
    path: "/learnova/admin/vouchers",
  },
];

const footerActions = [
  {
    id: "help",
    label: "Help",
    icon: HelpCircle,
    path: "/learnova/admin/help",
  },
  {
    id: "logout",
    label: "Logout",
    icon: LogOut,
    path: "/learnova/auth/login",
    variant: "danger",
  },
];

const SidebarAdmin = ({
  menuItems: menuItemsProp = menuItems,
  footerActions: footerActionsProp = footerActions,
}) => {
  const getNavLinkClassName = ({ isActive }) =>
    `sidebarAdminNavItem ${isActive ? "sidebarAdminNavItemActive" : ""}`;

  return (
    <aside className="sidebarAdmin">
      <div className="sidebarAdminBrand">
        <div className="sidebarAdminBrandText">
          <img
            src={logoText}
            alt="LearnOva"
            className="sidebarAdminBrandWordmark"
          />
          <p className="sidebarAdminBrandSubtitle">Admin System</p>
        </div>
      </div>

      <nav className="sidebarAdminNav" aria-label="Sidebar navigation">
        {menuItemsProp.map((item) => {
          if (!item?.icon || !item?.path) return null;

          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.end === true}
              className={getNavLinkClassName}
            >
              <span className="sidebarAdminNavIcon" aria-hidden="true">
                <Icon size={18} />
              </span>
              <span className="sidebarAdminNavLabel">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebarAdminFooterActions">
        {footerActionsProp.map((item) => {
          if (!item?.icon || !item?.path) return null;

          const Icon = item.icon;
          const isDanger = item.variant === "danger";

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={`sidebarAdminFooterAction ${
                isDanger ? "sidebarAdminFooterActionDanger" : ""
              }`}
            >
              <span className="sidebarAdminFooterActionIcon" aria-hidden="true">
                <Icon size={18} />
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default SidebarAdmin;
