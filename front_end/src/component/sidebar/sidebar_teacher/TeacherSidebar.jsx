import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Gift,
   Home,
  Plus,
  Users,
  WalletCards,
} from "lucide-react";
import { teacherProfile } from "../../../page/teacher/data/teacherDashboardData.js";
import LogoText from "../../../assets/LogoText.png";
import "./TeacherSidebar.css";

const teacherNavSections = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", path: "/learnova/teacher", icon: Home, end: true },
      { label: "Courses", path: "/learnova/teacher/courses", icon: BookOpen },
      { label: "Students", path: "/learnova/teacher/students", icon: Users },
      { label: "Reviews & ratings", path: "/learnova/teacher/students", icon: Users },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Promotions", path: "/learnova/teacher/promotions", icon: Gift },
      { label: "Revenue", path: "/learnova/teacher/revenue", icon: WalletCards },
      { label: "Analytics", path: "/learnova/teacher/analytics", icon: BarChart3 },
    ],
  },
];

const TeacherSidebar = () => {
  return (
    <aside className="teacher-sidebar" aria-label="Teacher dashboard navigation">
      <div className="teacher-brand">
        <div>
          <img src={LogoText} alt="LearnOva" />
        </div>
      </div>

      <nav className="teacher-nav">
        {teacherNavSections.map((section) => (
          <div className="teacher-nav__section" key={section.title}>
            <p className="teacher-nav__subtitle">{section.title}</p>
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
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <NavLink className="teacher-create" to="/learnova/teacher/courses/create">
        <Plus size={20} />
        <span style={{marginBottom: '3px'}}>Create new course</span>
      </NavLink>

    </aside>
  );
};

export default TeacherSidebar;
