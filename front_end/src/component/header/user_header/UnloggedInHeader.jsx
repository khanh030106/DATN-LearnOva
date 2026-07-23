import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/LogoText.png";
import NavMenu from "./components/NavMenu.jsx";
import HeaderAction from "./components/HeaderAction.jsx";
import "./UnLoggedInHeader.css";

const Header = () => {
    const headerRef = useRef(null);
    const { pathname } = useLocation();
    const normalizedPath = pathname.toLowerCase();
    const isCartHeader = normalizedPath.startsWith("/learnova/cart");
    const isHeroHeader =
        normalizedPath === "/" ||
        normalizedPath.startsWith("/learnova/about");
    const useSolidHeader =
        normalizedPath.startsWith("/learnova/courses") ||
        normalizedPath.startsWith("/learnova/intructors") ||
        normalizedPath.startsWith("/learnova/instructors") ||
        normalizedPath.startsWith("/learnova/instructordetail") ||
        normalizedPath.startsWith("/learnova/user") ||
        isCartHeader;

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        let ticking = false;

        const updateHeaderState = () => {
            const shouldUseScrolledHeader = useSolidHeader || isHeroHeader || window.scrollY > 20;
            header.classList.toggle("scrolled", shouldUseScrolledHeader);
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
            className={`main-header${useSolidHeader || isCartHeader ? " scrolled" : ""}${isCartHeader ? " cart-header" : ""}`}
        >
            <div className="header-container">
                <a href="/" className="logo">
                    <img src={logo} alt="logo" />
                </a>

                <NavMenu />

                <HeaderAction />
            </div>
        </header>
    );
};

export default Header;
