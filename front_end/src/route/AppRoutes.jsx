import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../page/login/LoginPage.jsx";
import Home from "../page/home/Home.jsx";
import HomeLayout from "../layout/home/HomeLayout.jsx";
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

                <Route  element={<HomeLayout />} >
                    <Route path="/learnova/home" element={<Home />} />
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
