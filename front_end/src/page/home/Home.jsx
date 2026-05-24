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
import AnimatedSection from "../../component/AnimatedSection.jsx";


import './Home.css'


const Home = () => {

    useLenisScroll();

    return (
        <div>
            <Banner/>
            <div className="home-content">

                <AnimatedSection delay={0.3}>
                    <Role/>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                    <Course/>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                    <Path/>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                    <Instructors/>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                    <Testimonials/>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                    <Engagements/>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                    <Features/>
                </AnimatedSection>

                <AnimatedSection delay={0.5}>
                    <Newsletter/>
                </AnimatedSection>

            </div>
        </div>
    );
}

export default Home;