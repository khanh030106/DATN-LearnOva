import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Gift,
  Grid2X2,
  MessageSquare,
  Plus,
  Users,
  WalletCards,
} from "lucide-react";
import TeacherHeader from "../../component/header/teacher_header/TeacherHeader.jsx";
import { teacherProfile } from "../../page/teacher/data/teacherDashboardData.js";
import LogoText from "../../assets/LogoText.png"
import "./TeacherLayout.css";

const teacherNavItems = [
  { label: "Overview", path: "/learnova/teacher", icon: Grid2X2, end: true },
  { label: "My Courses", path: "/learnova/teacher/courses", icon: BookOpen },
  { label: "Students", path: "/learnova/teacher/students", icon: Users },
  { label: "Chat", path: "/learnova/teacher/qa", icon: MessageSquare },
  { label: "Promotions", path: "/learnova/teacher/promotions", icon: Gift },
  { label: "Revenue", path: "/learnova/teacher/revenue", icon: WalletCards },
  { label: "Analytics", path: "/learnova/teacher/analytics", icon: BarChart3 },
];

const TeacherLayout = () => {
  return (
    <div className="teacher-shell">
      <aside className="teacher-sidebar" aria-label="Teacher dashboard navigation">
        <div className="teacher-brand">
          <div>
            <img src={LogoText}/>
            <small>Instructor Portal</small>
          </div>
        </div>

        <nav className="teacher-nav">
          {teacherNavItems.map((item) => {
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
        </nav>

        <NavLink className="teacher-create" to="/learnova/teacher/courses/create">
          <Plus size={20} />
          <span>Create New Course</span>
        </NavLink>

        <div className="teacher-sidebar__profile">
          <img src={teacherProfile.avatar} alt={teacherProfile.name} />
          <div>
            <strong>{teacherProfile.name}</strong>
            <small>View profile</small>
          </div>
        </div>
      </aside>

      <div className="teacher-workspace">
        <TeacherHeader />

        <main className="teacher-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
