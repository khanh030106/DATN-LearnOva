import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Gift,
  Grid2X2, Home,
  MessageSquare,
  Plus,
  Users,
  WalletCards,
} from "lucide-react";
import { teacherProfile } from "../../../page/teacher/data/teacherDashboardData.js";
import LogoText from "../../../assets/LogoText.png";
import "./TeacherSidebar.css";
import { t } from "../../../util/i18n.js";
import { useEffect, useState } from "react";
import { getLanguage, LANG_EVENT } from "../../../util/language.js";

const teacherNavSections = [
  {
    titleKey: "sidebar_main",
    items: [
      { label: "Dashboard", labelKey: "dashboard", path: "/learnova/teacher", icon: Home, end: true },
      { label: "Courses", labelKey: "courses", path: "/learnova/teacher/courses", icon: BookOpen },
      { label: "Students", labelKey: "students", path: "/learnova/teacher/students", icon: Users },
      { label: "Messages", labelKey: "messages", path: "/learnova/teacher/qa", icon: MessageSquare },
    ],
  },
  {
    titleKey: "sidebar_business",
    items: [
      { label: "Promotions", labelKey: "promotions", path: "/learnova/teacher/promotions", icon: Gift },
      { label: "Revenue", labelKey: "revenue", path: "/learnova/teacher/revenue", icon: WalletCards },
      { label: "Analytics", labelKey: "analytics", path: "/learnova/teacher/analytics", icon: BarChart3 },
    ],
  },
];

const TeacherSidebar = () => {
  const [lang, setLang] = useState(getLanguage());

  useEffect(() => {
    const onLangChange = (e) => setLang(e?.detail?.lang || getLanguage());
    window.addEventListener(LANG_EVENT, onLangChange);
    return () => window.removeEventListener(LANG_EVENT, onLangChange);
  }, []);

  return (
    <aside className="teacher-sidebar" aria-label={t('teacher_nav_aria') || 'Teacher dashboard navigation'} data-lang={lang}>
      <div className="teacher-brand">
        <div>
          <img src={LogoText} alt="LearnOva" />
        </div>
      </div>

      <nav className="teacher-nav">
        {teacherNavSections.map((section) => (
          <div className="teacher-nav__section" key={section.titleKey}>
            <p className="teacher-nav__subtitle">{section.titleKey ? t(section.titleKey) : section.title}</p>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `teacher-nav__link ${isActive ? "teacher-nav__link--active" : ""}`
                  }
                >
                  <Icon size={20} />
                  <span>{item.labelKey ? t(item.labelKey) : item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>
      <NavLink className="teacher-create" to="/learnova/teacher/courses/create">
        <Plus size={20} />
        <span style={{marginBottom: '3px'}}>{t('create_new_course')}</span>
      </NavLink>

      <div className="teacher-sidebar__profile">
        <img src={teacherProfile.avatar} alt={teacherProfile.name} />
        <div>
          <strong>{teacherProfile.name}</strong>
          <small>{t('view_profile')}</small>
        </div>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
