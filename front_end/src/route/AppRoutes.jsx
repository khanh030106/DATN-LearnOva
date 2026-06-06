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
import TeacherLayout from "../layout/teacher/TeacherLayout.jsx";
import OverviewPage from "../page/teacher/overview/OverviewPage.jsx";
import CoursesPage from "../page/teacher/courses/CoursesPage.jsx";
import CourseCreationPage from "../page/teacher/courses/create/CourseCreationPage.jsx";
import PromotionsPage from "../page/teacher/promotions/PromotionsPage.jsx";
import StudentsPage from "../page/teacher/students/StudentsPage.jsx";
import RevenuePage from "../page/teacher/revenue/RevenuePage.jsx";
import AnalyticsPage from "../page/teacher/analytics/AnalyticsPage.jsx";
import QaPage from "../page/teacher/qa/QaPage.jsx";
import IntructorsPage from "../page/users/intructor.jsx";
import UserLayout from "../layout/user/UserLayout.jsx";
import AboutView from "../page/users/About/About.jsx";
import ProfileViewProps from "../page/users/profile/profileView/profile.jsx";
import CoursePage from "../page/users/course/CourseNew.jsx";

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
          <Route path="/learnova/teacher" element={<TeacherLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="courses/create" element={<CourseCreationPage />} />
              <Route path="promotions" element={<PromotionsPage />} />
              <Route path="students" element={<StudentsPage />} />
              <Route path="revenue" element={<RevenuePage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="qa" element={<QaPage />} />
          </Route>

                <Route element={<UserLayout/>}>
                       <Route path="/learnova/courses" element={<CoursePage/>}/>
                        <Route path="/learnova/intructors" element={<IntructorsPage/>}/>
                        <Route path="/learnova/about" element={<AboutView/>}/>
                    <Route path="/learnova/user/profile" element={<ProfileViewProps/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default App;
