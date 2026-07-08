import { Check } from "lucide-react";

const CourseAbout = ({ course }) => {
    if (!course) return <p>Loading...</p>;

    return (
        <section className="learning-content-panel learning-about-panel">
            <h2>Course Overview</h2>

            <p>{course.description}</p>

            <h3>What You'll Learn</h3>

            <div className="learning-outcome-grid">
                {course.whatYouLearn?.map((item) => (
                    <div key={item}>
                        <Check size={18} />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CourseAbout;