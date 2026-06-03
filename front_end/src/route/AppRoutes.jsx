import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../page/login/LoginPage.jsx";
import Home from "../page/home/Home.jsx";
import HomeLayout from "../layout/home/HomeLayout.jsx";
import CoursePage from "../page/users/CourseList.jsx";
import Intructor from "../page/users/intructor.jsx";
import UserLayout from "../layout/user/UserLayout.jsx";
import AboutView from "../page/users/About/About.jsx";
import ProfileViewProps from "../page/users/profile/profileView/profile.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/learnova/auth/login" element={<LoginPage />} />

                <Route  element={<HomeLayout />} >
                    <Route path="/learnova/home" element={<Home />} />
                </Route>

                <Route element={<UserLayout/>}>
                        <Route path="/learnova/course"  element={<CoursePage/>}/>
                        <Route path="/learnova/courses" element={<CoursePage/>}/>
                        <Route path="/learnova/intructors" element={<Intructor/>}/>
                        <Route path="/learnova/about" element={<AboutView/>}/>
                    <Route path="/learnova/user/profile" element={<ProfileViewProps/>}/>


                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default App;