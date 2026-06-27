import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/LogoText.png";
import NavMenu from "./components/NavMenu.jsx";
import HeaderAction from "./components/HeaderAction.jsx";
import "./UnLoggedInHeader.css";

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
            className={`main-header scrolled${isCartHeader ? " cart-header" : ""}`}
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
