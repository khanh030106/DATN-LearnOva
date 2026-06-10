import {Outlet} from "react-router-dom";
import Footer from "../../component/footer/footer.jsx";
import UserLoggedHeader from "../../component/header/user_header/UserLoggedHeader.jsx"


const UserLayout = () =>{
    return (
        <div>

            <UserLoggedHeader/>

            <main>
                <Outlet/>
            </main>

            <Footer/>
        </div>
    )
}

export default UserLayout;
