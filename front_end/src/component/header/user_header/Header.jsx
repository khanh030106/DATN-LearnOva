import logo from "../../../assets/LogoText.png";
import NavMenu from "./NavMenu.jsx";
import HeaderAction from "./HeaderAction.jsx";
import { Search } from "lucide-react";
import "./Header.css";

const Header = ({ className = "" }) => {
    return (
        <header className={`main-header ${className}`.trim()}>
            <div className="header-container">
                <a href="/" className="logo">
                    <img src={logo} alt="logo" />
                </a>

                <NavMenu />

                <form className="header-search">
                    <Search size={18} className="header-search-icon" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="header-search-input"
                    />
                </form>

                <HeaderAction />
            </div>
        </header>
    );
};

export default Header;