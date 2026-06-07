import { CheckCircle } from "lucide-react";

const CourseAbout = ({ course }) => (
  <section className="learning-content-panel learning-about-panel">
    <h2>Giới thiệu khóa học</h2>
    {course.about.map((paragraph) => (
      <p key={paragraph}>{paragraph}</p>
    ))}

    <h3>Bạn sẽ làm được</h3>
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
