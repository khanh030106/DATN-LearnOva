import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../page/login/LoginPage.jsx";
import Home from "../page/home/Home.jsx";
import HomeLayout from "../layout/home/HomeLayout.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/learnova/auth/login" element={<LoginPage />} />

                <Route  element={<HomeLayout />} >
                    <Route path="/learnova/home" element={<Home />} />
                </Route>


            </Routes>
        </BrowserRouter>
    );
};

export default App;