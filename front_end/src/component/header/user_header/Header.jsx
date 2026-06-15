import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/LogoText.png";
import NavMenu, { NavItems } from "./NavMenu.jsx";
import HeaderAction from "./HeaderAction.jsx";
import { Search } from "lucide-react";
import "./Header.css";

const Header = () => {
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const isCartHeader = pathname.startsWith("/learnova/user/cart");
  const isHeroHeader =
    pathname.startsWith("/learnova/user/home") ||
    pathname.startsWith("/learnova/user/about");
  const useSolidHeader =
    !isHeroHeader &&
    (pathname.startsWith("/learnova/user/courses") ||
      pathname.startsWith("/learnova/user/intructors") ||
      pathname.startsWith("/learnova/user/instructors") ||
      pathname.startsWith("/learnova/user/intructorDetail") ||
      isCartHeader);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let ticking = false;

    const updateHeaderState = () => {
      const shouldUseScrolledHeader =
        useSolidHeader || window.scrollY > (isHeroHeader ? 120 : 20);

      header.classList.toggle("scrolled", shouldUseScrolledHeader);
      header.classList.toggle(
        "hero-header-top",
        isHeroHeader && !shouldUseScrolledHeader,
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
  }, [isHeroHeader, useSolidHeader]);

  return (
    <header
      ref={headerRef}
      className={`main-header${isHeroHeader ? " hero-header" : ""}${isCartHeader ? " cart-header" : ""}`}
    >
      <div className="header-container">
        <a href="/learnova/user/home" className="logo">
          <img src={logo} alt="logo" />
        </a>

        <NavMenu items={NavItems.slice(0, 1)} className="nav-menu-home" />

        <form className="header-search">
          <Search size={18} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search courses..."
            className="header-search-input"
          />
        </form>

        <NavMenu items={NavItems.slice(1)} className="nav-menu-secondary" />

        <HeaderAction />
      </div>
    </header>
  );
};

export default Header;
