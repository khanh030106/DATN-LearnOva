import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../page/login/LoginPage.jsx";
import Header from "../component/header/main_header/Index.jsx";
import Home from "../page/home/Home.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/learnova/auth/login" element={<LoginPage />} />
                <Route path="/learnova/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;