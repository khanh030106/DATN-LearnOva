import { Outlet } from "react-router-dom";
import Header from "../../component/header/admin_header/Header.jsx";
import SidebarAdmin from "../../component/sidebar/sidebar_admin/SidebarAdmin.jsx";
import "./DashboardLayout.css";

const Dashboard = () => {
  return (
    <div className="adminLayout">
      <SidebarAdmin />

      <div className="adminLayoutContent">
        <Header />

        <main className="adminLayoutMain">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
