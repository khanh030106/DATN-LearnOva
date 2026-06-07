import { CheckCircle } from "lucide-react";

const CourseAbout = ({ course }) => (
  <section className="learning-content-panel learning-about-panel">
    <h2>Course Overview</h2>
    {course.about.map((paragraph) => (
      <p key={paragraph}>{paragraph}</p>
    ))}

    <h3>What You'll Learn</h3>
    <div className="learning-outcome-grid">
      {course.outcomes.map((item) => (
        <div key={item}>
          <CheckCircle size={18} fill="currentColor" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  </section>
);

export default CourseAbout;
