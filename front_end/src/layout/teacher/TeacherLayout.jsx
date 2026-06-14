import { Outlet } from "react-router-dom";
import TeacherHeader from "../../component/header/teacher_header/TeacherHeader.jsx";
import TeacherSidebar from "../../component/sidebar/sidebar_teacher/TeacherSidebar.jsx";
import "./TeacherLayout.css";

const TeacherLayout = () => {
  return (
    <div className="teacher-shell">
      <TeacherSidebar />

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
