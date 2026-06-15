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
  const isCartHeader = pathname.startsWith("/learnova/cart");
  const isHeroHeader =
    pathname.startsWith("/learnova/home") ||
    pathname.startsWith("/learnova/about");
  const useSolidHeader =
    pathname.startsWith("/learnova/courses") ||
    pathname.startsWith("/learnova/intructors") ||
    pathname.startsWith("/learnova/instructors") ||
    pathname.startsWith("/learnova/intructorDetail") ||
    pathname.startsWith("/learnova/user") ||
    isCartHeader;

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
      isHeroHeader && !shouldUseScrolledHeader
    );
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateHeaderState);
  };

  updateHeaderState();

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}, [isHeroHeader, useSolidHeader, pathname]);

  return (
    <header
      ref={headerRef}
      className={`main-header${isHeroHeader ? " hero-header" : ""}${isCartHeader ? " cart-header" : ""}`}
    >
      <div className="header-container">
        <a href="/learnova/home" className="logo">
          <img src={logo} alt="logo" />
        </a>

        <NavMenu />



        <HeaderAction />
      </div>
    </header>
  );
};

export default Header;
