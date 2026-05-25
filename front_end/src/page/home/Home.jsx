import Banner from "./banner/Banner.jsx";
import Role from "./role/Role.jsx";
import Course from "./courses/Course.jsx";
import Path from "./path/Path.jsx";
import Instructors from "./instructors/Instructors.jsx";
import Testimonials from "./testimonials/Testimonials.jsx";
import Engagements from "./engagements/Engagements.jsx";
import Features from "./features/Features.jsx";
import Newsletter from "./newsletter/Newsletter.jsx";
import { useLenisScroll } from "../../hook/useLenisScroll.js";
import RevealWrapper from "../../component/RevealWrapper.jsx";


import './Home.css'


const Home = () => {

    useLenisScroll();

    return (
        <div>
            <Banner/>
            <div className="home-content">

                <RevealWrapper delay={0.3}>
                    <Role/>
                </RevealWrapper>

                <RevealWrapper delay={0.4}>
                    <Course/>
                </RevealWrapper>

                <RevealWrapper delay={0.4}>
                    <Path/>
                </RevealWrapper>

                <RevealWrapper delay={0.3}>
                    <Instructors/>
                </RevealWrapper>

                <RevealWrapper delay={0.4}>
                    <Testimonials/>
                </RevealWrapper>

                <RevealWrapper delay={0.3}>
                    <Engagements/>
                </RevealWrapper>

                <RevealWrapper delay={0.4}>
                    <Features/>
                </RevealWrapper>

                <RevealWrapper delay={0.5}>
                    <Newsletter/>
                </RevealWrapper>


            </div>
        </div>
    );
}

export default Home;