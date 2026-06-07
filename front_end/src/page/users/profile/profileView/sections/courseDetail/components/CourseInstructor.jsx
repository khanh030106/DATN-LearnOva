import { Award, BookOpen, Star, Users } from "lucide-react";

const statIcons = [Award, BookOpen, Users, Star];

const CourseInstructor = ({ instructor }) => (
  <section className="learning-content-panel learning-instructor-panel">
    <div className="learning-instructor-profile">
      <img src={instructor.avatar} alt={instructor.name} />
      <div>
        <h2>{instructor.name}</h2>
        <strong>{instructor.role}</strong>
        <p>{instructor.bio}</p>
      </div>
    </div>

    <div className="learning-instructor-stats">
      {instructor.stats.map((stat, index) => {
        const Icon = statIcons[index] || Award;

        return (
          <div key={stat}>
            <Icon size={20} />
            <span>{stat}</span>
          </div>
        );
      })}
    </div>
  </section>
);

export default CourseInstructor;
