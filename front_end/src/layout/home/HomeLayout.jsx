import { Outlet } from "react-router-dom";
import Header from "../../component/header/user_header/Header.jsx";
import Footer from "../../component/footer/footer.jsx";

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default HomeLayout;
