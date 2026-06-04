import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../page/login/LoginPage.jsx";
import Home from "../page/home/Home.jsx";
import HomeLayout from "../layout/home/HomeLayout.jsx";
import DashboardLayout from "../layout/admin/DashboardLayout.jsx";
import Dashboard from "../page/admin/dashboard/Dashboard.jsx";
import UserManagement from "../page/admin/userManagement/UserManagement.jsx";
import InstructorManagement from "../page/admin/instructorManagement/InstructorManagement.jsx";
import Course from "../page/admin/course/Course.jsx";
import Revenue from "../page/admin/revenue/Revenue.jsx";
import Reports from "../page/admin/reports/Reports.jsx";
import Vouchers from "../page/admin/vouchers/Vouchers.jsx";
import VoucherCreate from "../page/admin/vouchers/voucherCreate/VoucherCreate.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/learnova/auth/login" element={<LoginPage />} />

        <Route element={<HomeLayout />}>
          <Route path="/learnova/home" element={<Home />} />
        </Route>

        <Route path="/learnova/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="teachers" element={<InstructorManagement />} />
          <Route path="courses" element={<Course />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="reports" element={<Reports />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="vouchers/create" element={<VoucherCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
