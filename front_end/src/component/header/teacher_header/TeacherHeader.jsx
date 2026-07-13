import { useEffect, useState } from "react";
import { ChevronDown, LogOut, Repeat } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUserApi } from "../../../api/UserApi.js";
import { useAuth } from "../../../hook/UseAuth.jsx";
import NotificationBell from "./NotificationBell.jsx";
import "./TeacherHeader.css";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=1d4ed8&color=fff&name=Instructor";

const TeacherHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { switchActiveRole, logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUserApi()
      .then(setUser)
      .catch(() => {});
  }, []);

  const isAdmin = user?.roles?.includes("ROLE_ADMIN");
  const canSwitchToUser = !isAdmin && user?.roles?.includes("ROLE_USER");

  const handleSwitchToUser = async () => {
    await switchActiveRole("ROLE_USER");
    navigate("/learnova/home");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/learnova/auth/login");
  };

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
  } else if (pathname === "/learnova/teacher/reviews") {
    title = "Reviews management";
  }

  const avatarSrc = user?.avatar || DEFAULT_AVATAR;
  const displayName = user?.fullName || "Instructor";

  return (
    <header className="teacher-topbar">
      <div className="teacher-topbar__intro">
        <h1>{title}</h1>
      </div>

      <div className="teacher-topbar__actions">
        <NotificationBell />

        <div className="teacher-profile-menu">
          <div className="teacher-profile" tabIndex={0}>
            <img src={avatarSrc} alt={displayName} />
            <span>{displayName}</span>
            <ChevronDown size={16} />
          </div>

          <div className="teacher-profile-dropdown">
            <div className="teacher-profile-dropdown__card">
              <img src={avatarSrc} alt={displayName} />
              <div>
                <strong>{displayName}</strong>
                <span>Instructor</span>
              </div>
            </div>

            <ul className="teacher-profile-dropdown__list">
              {canSwitchToUser && (
                <li>
                  <button type="button" onClick={handleSwitchToUser}>
                    <Repeat size={16} />
                    Chuyển sang Học viên
                  </button>
                </li>
              )}
              <li>
                <button type="button" className="is-danger" onClick={handleLogout}>
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TeacherHeader;
