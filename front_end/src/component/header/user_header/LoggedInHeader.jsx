import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../../assets/LogoText.png";
import {
  cartItems,
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
import { useAuth } from "../../../hook/UseAuth.jsx";
import { createNotificationApi, getNotificationsApi } from "../../../api/NotificationApi.js";

const LoggedInHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [notifications, setNotifications] = useState(notificationItems);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationTimerRef = useRef(null);
  const { isAuthenticated, currentUser } = useAuth();

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

  useEffect(() => {
    // fetch persisted notifications if authenticated
    if (isAuthenticated) {
      (async () => {
        try {
          const data = await getNotificationsApi();
          const mapped = data.map((n) => ({
            id: n.id,
            title: n.title,
            description: n.content,
            unread: !n.isRead,
            createdAt: n.createdAt,
          }));
          setNotifications(mapped.slice(0, 6));
        } catch (e) {
          // ignore
        }
      })();
    }
    const showNotification = (newNotification) => {
      if (notificationTimerRef.current) {
        window.clearTimeout(notificationTimerRef.current);
      }

      setNotifications((prev) => [newNotification, ...prev].slice(0, 6));
      setIsNotificationOpen(true);
      notificationTimerRef.current = window.setTimeout(() => {
        setIsNotificationOpen(false);
        notificationTimerRef.current = null;
      }, 4500);
    };

    const handleWishlistAdded = (event) => {
      const { title, courseId } = event.detail || {};
      showNotification({
        id: `wishlist-${courseId}-${Date.now()}`,
        title: "Added to wishlist",
        description: title ? `${title} has been added to your wishlist.` : "A course has been added to your wishlist.",
        unread: true,
      });
      if (isAuthenticated && currentUser) {
        createNotificationApi({
          userId: currentUser.id,
          title: "Added to wishlist",
          content: title ? `${title} has been added to your wishlist.` : "A course has been added to your wishlist.",
        }).catch(() => {});
      }
    };

    const handleWishlistRemoved = (event) => {
      const { title, courseId } = event.detail || {};
      showNotification({
        id: `wishlist-removed-${courseId}-${Date.now()}`,
        title: "Removed from wishlist",
        description: title ? `${title} has been removed from your wishlist.` : "A course has been removed from your wishlist.",
        unread: true,
      });
      if (isAuthenticated && currentUser) {
        createNotificationApi({
          userId: currentUser.id,
          title: "Removed from wishlist",
          content: title ? `${title} has been removed from your wishlist.` : "A course has been removed from your wishlist.",
        }).catch(() => {});
      }
    };

    window.addEventListener("wishlist:added", handleWishlistAdded);
    window.addEventListener("wishlist:removed", handleWishlistRemoved);

    return () => {
      window.removeEventListener("wishlist:added", handleWishlistAdded);
      window.removeEventListener("wishlist:removed", handleWishlistRemoved);
      if (notificationTimerRef.current) {
        window.clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

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
            <button
                type="button"
                className="user-logged-nav-button"
            >
              Courses
            </button>

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
          <NotificationDropdown
            notifications={notifications}
            isOpen={isNotificationOpen}
          />
          <AvatarDropdown menuItems={userMenuItems} />
        </div>
      </div>
    </header>
  );
};

export default LoggedInHeader;
