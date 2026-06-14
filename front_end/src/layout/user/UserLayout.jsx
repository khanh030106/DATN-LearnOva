import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../component/footer/footer.jsx";
import Header from "../../component/header/user_header/Header.jsx";
import UserLoggedHeader from "../../component/header/user_header/UserLoggedHeader.jsx";


const UserLayout = () => {
    const { pathname } = useLocation();
    const isProfileRoute = pathname.startsWith("/learnova/user/profile");

    return (
        <div>

            {isProfileRoute ? <UserLoggedHeader /> : <Header />}

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default UserLayout;
