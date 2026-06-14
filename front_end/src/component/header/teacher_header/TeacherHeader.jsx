import { Bell, MessageSquare, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { teacherProfile } from "../../../page/teacher/data/teacherDashboardData.js";
import "./TeacherHeader.css";

const TeacherHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;

  let title = "";
  let subtitle = "";

  const normPath = pathname.replace(/\/$/, "");

  if (normPath === "/learnova/teacher") {
    const firstName = teacherProfile.name.split(" ")[0] || "Instructor";
    title = `Good morning, ${firstName} 👋`;
  } else if (normPath === "/learnova/teacher/courses") {
    title = "Courses management";
  } else if (normPath === "/learnova/teacher/courses/create") {
    title = "Create Course";
  } else if (normPath === "/learnova/teacher/promotions") {
    title = "Promotions management";
  } else if (normPath === "/learnova/teacher/students") {
    title = "Students management";
  } else if (normPath === "/learnova/teacher/revenue") {
    title = "Revenue management";
  } else if (normPath === "/learnova/teacher/analytics") {
    title = "Analytics";
  } else if (normPath === "/learnova/teacher/qa") {
    title = "Messaging";
  } else {
    title = "Dashboard";
  }

  return (
    <header className="teacher-topbar">
      <div className="teacher-topbar__intro">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="teacher-topbar__actions">
        <button aria-label="Notifications" className="teacher-topbar__btn">
          <Bell size={20} />
          <span className="teacher-topbar__badge teacher-topbar__badge--red">3</span>
        </button>
        <button aria-label="Messages" className="teacher-topbar__btn">
          <MessageSquare size={20} />
          <span className="teacher-topbar__badge teacher-topbar__badge--blue">5</span>
        </button>
        <div className="teacher-profile">
          <img src={teacherProfile.avatar} alt={teacherProfile.name} />
          <span>{teacherProfile.name}</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
};

export default TeacherHeader;
