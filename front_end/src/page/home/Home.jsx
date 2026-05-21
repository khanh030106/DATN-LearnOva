import Banner from "./banner/Banner.jsx";
import Role from "./role/Role.jsx";
import Course from "./courses/Course.jsx";
import Path from "./path/Path.jsx";
import Instructors from "./instructors/Instructors.jsx";
import Testimonials from "./testimonials/Testimonials.jsx";
import FAQ from "./engagements/FAQ.jsx";
import Features from "./features/Features.jsx";
import Newsletter from "./follow/Newsletter.jsx";


const Home = () => {
    return (
        <div>
            <Banner/>
            <Role/>
            <Course/>
            <Path/>
            <Instructors/>
            <Testimonials/>
            <FAQ/>
            <Features/>
            <Newsletter/>
        </div>
    );
}

export default Home;