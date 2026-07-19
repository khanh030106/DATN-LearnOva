import { Link } from "react-router-dom";
import logo from "../../../assets/LogoText.png";
import AvatarDropdown from "./components/AvatarDropdown.jsx";
import CartDropdown from "./components/CartDropdown.jsx";
import HeaderSearch from "./components/HeaderSearch.jsx";
import NotificationDropdown from "./components/NotificationDropdown.jsx";
import "./LoggedInHeader.css";

const LoggedInHeader = () => {
  return (
    <header className="user-logged-header">
      <div className="user-logged-header-container">
        <div className="user-logged-brand-group">
          <Link to="/" className="user-logged-logo">
            <img src={logo} alt="Learnova" />
          </Link>
        </div>

        <div className="user-logged-home-shell">
          <Link to="/" className="user-logged-home-link">
            Home
          </Link>

          <Link to="/learnova/courses" className="user-logged-nav-button">
            Courses
          </Link>
        </div>

        <div className="user-logged-search-area">
          <HeaderSearch  />
        </div>

        <nav className="user-logged-secondary-nav" aria-label="Secondary navigation">
          <Link to="/learnova/user/profile/courses" className="user-logged-nav-button">
            My Learning
          </Link>
          <Link to="/learnova/intructors" className="user-logged-nav-button">
            Instructors
          </Link>
          <Link to="/" className="user-logged-nav-button">
            Subscribe
          </Link>
        </nav>

        <div className="user-logged-actions">
          <CartDropdown />
          <NotificationDropdown  />
          <AvatarDropdown />
        </div>
      </div>
    </header>
  );
};

export default LoggedInHeader;
