import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/LogoText.png";
import NavMenu from "./NavMenu.jsx";
import HeaderAction from "./HeaderAction.jsx";
import { Search } from "lucide-react";
import "./Header.css";

const Header = () => {
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const useSolidHeader =
    pathname.startsWith("/learnova/courses") ||
    pathname.startsWith("/learnova/intructors") ||
    pathname.startsWith("/learnova/instructors") ||
    pathname.startsWith("/learnova/user");

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let ticking = false;

    const updateHeaderState = () => {
      header.classList.toggle(
        "scrolled",
        useSolidHeader || window.scrollY > 20,
      );
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [useSolidHeader]);

  return (
    <header ref={headerRef} className="main-header">
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
