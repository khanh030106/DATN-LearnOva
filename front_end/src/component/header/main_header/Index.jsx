import {logo} from '../../../assets/LogoText.png'
import NavMenu from "./NavMenu.jsx";
import HeaderAction from "./HeaderAction.jsx";


const Header = () => {
    return (
        <header className="main-header">
            <div className="header-container">
                <a href="/" className="logo">
                    <img src={logo} alt="logo" />
                </a>

                <NavMenu/>

                <HeaderAction/>
            </div>
        </header>
    );
}

export default Header;