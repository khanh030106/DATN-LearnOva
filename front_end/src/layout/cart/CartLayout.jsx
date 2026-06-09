import { Outlet } from "react-router-dom";
import Footer from "../../component/footer/footer.jsx";
import Header from "../../component/header/user_header/Header.jsx";

const CartLayout = () => {
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

export default CartLayout;
