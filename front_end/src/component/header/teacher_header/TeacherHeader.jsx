import { Bell, MessageSquare, Search } from "lucide-react";
import { teacherProfile } from "../../../page/teacher/data/teacherDashboardData.js";
import "./TeacherHeader.css";

const TeacherHeader = () => {
  return (
    <header className="teacher-topbar">
      <label className="teacher-search">
        <Search size={20} />
        <input type="search" placeholder="Search materials, students, courses..." />
      </label>

      <div className="teacher-topbar__actions">
        <button aria-label="Notifications">
          <Bell size={20} />
          <span>3</span>
        </button>
        <button aria-label="Messages">
          <MessageSquare size={20} />
          <span>5</span>
        </button>
        <div className="teacher-profile">
          <div>
            <strong>{teacherProfile.name}</strong>
            <small>{teacherProfile.role}</small>
          </div>
          <img src={teacherProfile.avatar} alt={teacherProfile.name} />
        </div>
      </div>
    </header>
  );
};

export default TeacherHeader;
