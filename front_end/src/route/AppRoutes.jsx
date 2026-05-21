import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../page/login/LoginPage.jsx";
import Roles from "../page/home/Role/Role.jsx";
import Path from "../page/home/path/Path.jsx";
import Footer from "../component/footer/footer.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Footer />}
                />

                <Route
                    path="/roles"
                    element={<Roles />}
                />

                <Route
                    path="/learnova/auth/login"
                    element={<LoginPage />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;