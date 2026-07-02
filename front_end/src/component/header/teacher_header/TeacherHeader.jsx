import { useEffect, useState } from "react";
import { Bell, MessageSquare, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getCurrentUserApi } from "../../../api/UserApi.js";
import "./TeacherHeader.css";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=1d4ed8&color=fff&name=Instructor";

const TeacherHeader = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUserApi()
      .then(setUser)
      .catch(() => {});
  }, []);

  const pathname = location.pathname.replace(/\/$/, "");

  let title = "Dashboard";
  if (pathname === "/learnova/teacher") {
    const firstName = user?.fullName?.split(" ")[0] || "Instructor";
    title = `Good morning, ${firstName} 👋`;
  } else if (pathname === "/learnova/teacher/courses") {
    title = "Courses management";
  } else if (pathname === "/learnova/teacher/courses/create") {
    title = "Create Course";
  } else if (pathname === "/learnova/teacher/promotions") {
    title = "Promotions management";
  } else if (pathname === "/learnova/teacher/students") {
    title = "Students management";
  } else if (pathname === "/learnova/teacher/revenue") {
    title = "Revenue management";
  } else if (pathname === "/learnova/teacher/analytics") {
    title = "Analytics";
  } else if (pathname === "/learnova/teacher/qa") {
    title = "Messaging";
  }

  const avatarSrc = user?.avatar || DEFAULT_AVATAR;
  const displayName = user?.fullName || "Instructor";

  return (
    <header className="teacher-topbar">
      <div className="teacher-topbar__intro">
        <h1>{title}</h1>
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
          <img src={avatarSrc} alt={displayName} />
          <span>{displayName}</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
};

export default TeacherHeader;
