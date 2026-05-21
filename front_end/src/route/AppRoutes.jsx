import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../page/login/LoginPage.jsx";
import Testimonials from "../page/home/testimonials/Testimonials.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/learnova/auth/login" element={<LoginPage />} />
        <Route path="/learnova/auth/testimonials" element={<Testimonials />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
