import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../../assets/LogoText.png";
import {
  courseCategories,
  durationFilters,
  instructorItems,
  levelFilters,
  myLearningItems,
  notificationItems,
  priceFilters,
  ratingFilters,
  searchSuggestions,
  subscriptionPlans,
  userMenuItems,
} from "./components/headerData.js";
import AvatarDropdown from "./components/AvatarDropdown.jsx";
import CartDropdown from "./components/CartDropdown.jsx";
import HeaderSearch from "./components/HeaderSearch.jsx";
import NotificationDropdown from "./components/NotificationDropdown.jsx";
import UserLoggedNav from "./components/UserLoggedNav.jsx";
import CoursesMegaMenu from "./components/CoursesMegaMenu";
import "./LoggedInHeader.css";

const LoggedInHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  const navigationData = useMemo(
    () => ({
      categories: courseCategories,
      levels: levelFilters,
      prices: priceFilters,
      durations: durationFilters,
      ratings: ratingFilters,
      learningItems: myLearningItems,
      instructorItems,
      subscriptionPlans,
    }),
    [],
  );

  return (
    <header className="user-logged-header">
      <div className="user-logged-header-container">
        <div className="user-logged-brand-group">
          <button
            type="button"
            className="user-logged-mobile-toggle"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <Link to="/learnova/home" className="user-logged-logo">
            <img src={logo} alt="Learnova" />
          </Link>
        </div>

        <div className="user-logged-home-shell">
          <Link to="/learnova/home" className="user-logged-home-link">
            Home
          </Link>

          <div
              className={`user-logged-nav-item user-logged-nav-item--mega ${
                  showCourses ? "is-open" : ""
              }`}
              onMouseEnter={() => setShowCourses(true)}
              onMouseLeave={() => setShowCourses(false)}
          >
            <Link
                to="/learnova/courses"
                className="user-logged-nav-button"
            >
              Courses
            </Link>

            <CoursesMegaMenu
                categories={courseCategories}
                levels={levelFilters}
                prices={priceFilters}
                durations={durationFilters}
                ratings={ratingFilters}
            />
          </div>
        </div>

        <div className="user-logged-search-area">
          <HeaderSearch suggestions={searchSuggestions} />
        </div>

        <div className={`user-logged-navigation-shell ${isMobileMenuOpen ? "is-open" : ""}`}>
          <UserLoggedNav {...navigationData} />
        </div>

        <div className="user-logged-actions">
          <CartDropdown />
          <NotificationDropdown notifications={notificationItems} />
          <AvatarDropdown menuItems={userMenuItems} />
        </div>
      </div>
    </header>
  );
};

export default LoggedInHeader;
