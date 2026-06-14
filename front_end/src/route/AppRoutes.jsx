import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthPage from "../page/login/AuthPage.jsx";
import Home from "../page/home/Home.jsx";
import HomeLayout from "../layout/home/HomeLayout.jsx";
import DashboardLayout from "../layout/admin/DashboardLayout.jsx";
import Dashboard from "../page/admin/dashboard/Dashboard.jsx";
import UserManagement from "../page/admin/userManagement/UserManagement.jsx";
import InstructorManagement from "../page/admin/instructorManagement/InstructorManagement.jsx";
import Course from "../page/admin/course/Course.jsx";
import Revenue from "../page/admin/revenue/Revenue.jsx";
import RevenueTopRankings from "../page/admin/revenue/RevenueTopRankings.jsx";
import RevenueTransactions from "../page/admin/revenue/RevenueTransactions.jsx";
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
import UserLayout from "../layout/user/UserLayout.jsx";
import InstructorsPage from "../page/users/intructor.jsx";
import InstructorDetail from "../page/users/intructor/intructorDetail/intructorDetail.jsx";
import AboutView from "../page/users/About/About.jsx";
import ProfileViewProps from "../page/users/profile/profileView/profile.jsx";
import CoursePage from "../page/users/course/CourseNew.jsx";
import CourseDetail from "../page/users/course/CourseDetail/CourseDetail.jsx";
import CourseDetaill from "../page/home/courses/CourseDetail.jsx";
import Cart from "../page/home/cart/Cart.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/learnova/auth/login" element={<AuthPage/>}/>

                <Route element={<HomeLayout/>}>
                    <Route path="/learnova/home" element={<Home/>}/>
                </Route>

                {/* Admin */}
                <Route path="/learnova/admin" element={<DashboardLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="users" element={<UserManagement/>}/>
                    <Route path="teachers" element={<InstructorManagement/>}/>
                    <Route path="courses" element={<Course/>}/>
                    <Route path="revenue" element={<Revenue/>}/>
                    <Route path="revenue/top-rankings" element={<RevenueTopRankings/>}/>
                    <Route path="revenue/transactions" element={<RevenueTransactions/>}/>
                    <Route path="reports" element={<Reports/>}/>
                    <Route path="vouchers" element={<Vouchers/>}/>
                    <Route path="vouchers/create" element={<VoucherCreate/>}/>
                </Route>

                {/* Teacher */}
                <Route path="/learnova/teacher" element={<TeacherLayout/>}>
                    <Route index element={<OverviewPage/>}/>
                    <Route path="courses" element={<CoursesPage/>}/>
                    <Route path="courses/create" element={<CourseCreationPage/>}/>
                    <Route path="promotions" element={<PromotionsPage/>}/>
                    <Route path="students" element={<StudentsPage/>}/>
                    <Route path="revenue" element={<RevenuePage/>}/>
                    <Route path="analytics" element={<AnalyticsPage/>}/>
                    <Route path="qa" element={<QaPage/>}/>
                </Route>

                {/* User */}
                <Route element={<UserLayout/>}>
                    <Route path="/learnova/courses" element={<CoursePage/>}/>
                    <Route path="/learnova/cart" element={<Cart/>}/>
                    <Route path="/learnova/user/CoursesDetail" element={<CourseDetail/>}/>
                    <Route path="/learnova/CoursesDetail/:id" element={<CourseDetaill/>}/>
                    <Route path="/learnova/intructors" element={<InstructorsPage/>}/>
                    <Route path="/learnova/intructorDetail" element={<InstructorDetail/>}/>
                    <Route path="/learnova/about" element={<AboutView/>}/>
                    <Route path="/learnova/user/profile" element={<ProfileViewProps key="profile" initialTab="profile"/>}/>
                    <Route path="/learnova/user/profile/courses" element={<ProfileViewProps key="courses" initialTab="courses"/>}/>
                    <Route path="/learnova/user/profile/favorites" element={<ProfileViewProps key="favorites" initialTab="favorites"/>}/>
                    <Route path="/learnova/user/profile/security" element={<ProfileViewProps key="security" initialTab="security"/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default App;
