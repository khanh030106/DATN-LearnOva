import { NavLink } from "react-router-dom";
import {
  BookOpen,
  CircleDollarSign,
  Flag,
  GraduationCap,
  LayoutDashboard,
  MessageSquareText,
  Tags,
  Ticket,
  Users,
} from "lucide-react";
import logoText from "../../../assets/LogoText.png";
import "../sidebar_teacher/TeacherSidebar.css";
import "./SidebarAdmin.css";
import { t } from "../../../util/i18n.js";
import { useEffect, useState } from "react";
import { getLanguage, LANG_EVENT } from "../../../util/language.js";

const adminNavSections = [
  {
    titleKey: "sidebar_main",
    items: [
      {
        id: "dashboard",
        label: "Overview",
        labelKey: "overview",
        icon: LayoutDashboard,
        path: "/learnova/admin",
        end: true,
      },
      {
        id: "users",
        label: "Users",
        labelKey: "users",
        icon: Users,
        path: "/learnova/admin/users",
      },
      {
        id: "teachers",
        label: "Instructors",
        labelKey: "instructors",
        icon: GraduationCap,
        path: "/learnova/admin/teachers",
      },
      {
        id: "courses",
        label: "Courses",
        labelKey: "courses",
        icon: BookOpen,
        path: "/learnova/admin/courses",
      },
      {
        id: "categories",
        label: "Categories",
        labelKey: "categories",
        icon: Tags,
        path: "/learnova/admin/categories",
      },
    ],
  },
  {
    titleKey: "sidebar_business",
    items: [
      {
        id: "revenue",
        label: "Revenue",
        labelKey: "revenue",
        icon: CircleDollarSign,
        path: "/learnova/admin/revenue",
      },
      {
        id: "vouchers",
        label: "Vouchers",
        labelKey: "vouchers",
        icon: Ticket,
        path: "/learnova/admin/vouchers",
      },
    ],
  },
  {
    titleKey: "sidebar_moderation",
    items: [
      {
        id: "reviews-comments",
        label: "Reviews & Comments",
        labelKey: "reviews_comments",
        icon: MessageSquareText,
        path: "/learnova/admin/reviews-comments",
      },
      {
        id: "violation-reports",
        label: "Violation Reports",
        labelKey: "violation_reports",
        icon: Flag,
        path: "/learnova/admin/violation-reports",
      },
    ],
  },
];

const SidebarAdmin = ({
  navSections = adminNavSections,
}) => {
  const [lang, setLang] = useState(getLanguage());

  useEffect(() => {
    const onLangChange = (e) => setLang(e?.detail?.lang || getLanguage());
    window.addEventListener(LANG_EVENT, onLangChange);
    return () => window.removeEventListener(LANG_EVENT, onLangChange);
  }, []);
  const getNavLinkClassName = ({ isActive }) =>
    `teacher-nav__link ${isActive ? "teacher-nav__link--active" : ""}`;

  return (
    <aside className="teacher-sidebar adminSidebar" aria-label="Admin dashboard navigation">
      <div className="teacher-brand">
        <div>
          <img src={logoText} alt="LearnOva" />
        </div>
      </div>

      <nav className="teacher-nav" aria-label="Sidebar navigation">
        {navSections.map((section) => (
          <div className="teacher-nav__section" key={section.titleKey}>
            <p className="teacher-nav__subtitle">{section.titleKey ? t(section.titleKey) : section.title}</p>
            {section.items.map((item) => {
              if (!item?.icon || !item?.path) return null;

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.end === true}
                  className={getNavLinkClassName}
                >
                  <Icon size={20} />
                  <span>{item.labelKey ? t(item.labelKey) : item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
