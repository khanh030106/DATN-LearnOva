<<<<<<< HEAD
import React from "react";

const Home = () => {
  return (
    <div className="home">
      {/* Add your home page sections here */}
      {/* Examples: Banner, Courses, Engagements, Features, Testimonials, etc. */}
      <h1>Welcome to LearnOva</h1>
    </div>
  );
};

export default Home;
=======
import Banner from "./banner/Banner.jsx";
import Role from "./role/Role.jsx";
import Course from "./courses/Course.jsx";
import Path from "./path/Path.jsx";
import Instructors from "./instructors/Instructors.jsx";
import Testimonials from "./testimonials/Testimonials.jsx";
import Engagements from "./engagements/Engagements.jsx";
import Features from "./features/Features.jsx";
import Newsletter from "./newsletter/Newsletter.jsx";
import LearnovaAI from "./AI/AI.jsx";

import './Home.css'



const Home = () => {

    return (
        <div>
            <Banner/>
            <div className="home-content">

                    <Role/>

                    <Course/>

                    <Path/>

                    <Instructors/>

                    <Testimonials/>

                    <Engagements/>

                    <Features/>

                    <Newsletter/>
                <div className="chatbot-fixed">
                    <LearnovaAI />
                </div>

            </div>
        </div>
    );
}

export default Home;
>>>>>>> 87f4c08966f5d96bff9b43836981678978c0a595
