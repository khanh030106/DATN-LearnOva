import {Outlet} from "react-router-dom";
import Footer from "../../component/footer/footer.jsx";
import Header from "../../component/header/main_header/Header.jsx";


const UserLayout = () =>{
    return (
        <div>

            <Header/>

            <main>
                <Outlet/>
            </main>

            <Footer/>
        </div>
    )
}

export default UserLayout;