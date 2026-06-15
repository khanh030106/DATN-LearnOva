import { useCallback, useRef, useState } from "react";
import SimpleMenuDropdown from "./SimpleMenuDropdown.jsx";
import SubscribeDropdown from "./SubscribeDropdown.jsx";

const UserLoggedNav = ({

  learningItems,
  instructorItems,
  subscriptionPlans,
}) => {
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimerRef = useRef(null);

  const clearCloseTimer = useCallback(() => {
    if (!closeTimerRef.current) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const handleOpen = useCallback(
    (menuName) => {
      clearCloseTimer();
      setOpenMenu(menuName);
    },
    [clearCloseTimer],
  );

  const handleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
    }, 260);
  }, [clearCloseTimer]);

  const toggleMenu = useCallback((menuName) => {
    setOpenMenu((currentMenu) => (currentMenu === menuName ? null : menuName));
  }, []);

  return (
    <nav className="user-logged-nav" aria-label="Logged user navigation">
      <ul className="user-logged-nav-list">
        {/*<li*/}
        {/*  className={`user-logged-nav-item user-logged-nav-item--mega ${openMenu === "courses" ? "is-open" : ""}`}*/}
        {/*  onMouseEnter={() => handleOpen("courses")}*/}
        {/*  onMouseLeave={handleClose}*/}
        {/*>*/}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    className="user-logged-nav-button"*/}
        {/*    onClick={() => toggleMenu("courses")}*/}
        {/*  >*/}
        {/*    Courses <ChevronDown size={15} />*/}
        {/*  </button>*/}
        {/*  <CoursesMegaMenu*/}
        {/*    categories={categories}*/}
        {/*    levels={levels}*/}
        {/*    prices={prices}*/}
        {/*    durations={durations}*/}
        {/*    ratings={ratings}*/}
        {/*  />*/}
        {/*</li>*/}

        <li
          className={`user-logged-nav-item ${openMenu === "learning" ? "is-open" : ""}`}
          onMouseEnter={() => handleOpen("learning")}
          onMouseLeave={handleClose}
        >
          <button
            type="button"
            className="user-logged-nav-button"
            onClick={() => toggleMenu("learning")}
          >
            My Learning
          </button>
          <SimpleMenuDropdown items={learningItems} />
        </li>

        <li
          className={`user-logged-nav-item ${openMenu === "instructors" ? "is-open" : ""}`}
          onMouseEnter={() => handleOpen("instructors")}
          onMouseLeave={handleClose}
        >
          <button
            type="button"
            className="user-logged-nav-button"
            onClick={() => toggleMenu("instructors")}
          >
            Instructors
          </button>
          <SimpleMenuDropdown items={instructorItems} />
        </li>

        <li
          className={`user-logged-nav-item ${openMenu === "subscribe" ? "is-open" : ""}`}
          onMouseEnter={() => handleOpen("subscribe")}
          onMouseLeave={handleClose}
        >
          <button
            type="button"
            className="user-logged-nav-button"
            onClick={() => toggleMenu("subscribe")}
          >
            Subscribe
          </button>
          <SubscribeDropdown plans={subscriptionPlans} />
        </li>
      </ul>
    </nav>
  );
};

export default UserLoggedNav;
