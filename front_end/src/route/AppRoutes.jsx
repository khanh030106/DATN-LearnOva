import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "../page/login/LoginPage.jsx";



const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/learnova/auth/login" element={<LoginPage />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;