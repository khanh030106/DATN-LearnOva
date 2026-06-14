import { Outlet } from "react-router-dom";
import Footer from "../../component/footer/footer.jsx";

const HomeLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default HomeLayout;
