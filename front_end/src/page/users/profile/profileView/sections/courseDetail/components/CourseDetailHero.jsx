import {
  ArrowLeft,
  CheckCircle,
  Play,
  Star,
  Users,
} from "lucide-react";
import defaultAvatar from "../../../../../../../assets/default_user_avatar.jpg";
import { useNavigate } from "react-router-dom";

const CourseDetailHero = ({ course, onBack }) => {
  const navigate = useNavigate();

  const handleContinueLearning = () => {
    navigate(`/learnova/user/CoursesDetail/${course.courseId}`);
  };

  console.log("Course:", course);

  return (
      <header className="learning-detail-hero">
        <div className="learning-detail-actions">
          <button
              className="learning-back-button"
              type="button"
              onClick={onBack}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div
            className="learning-hero-grid"
            onClick={handleContinueLearning}
        >
          <div className="learning-video-cover">
            <img src={course.image} alt={course.title} />

            {course.categories?.map((category) => (
                <span key={category}>{category}</span>
            ))}

            <button type="button" aria-label="Watch Lesson">
              <Play size={32} fill="currentColor" />
            </button>
          </div>

          <div className="learning-hero-copy">
            <h1>{course.title}</h1>

            <div className="learning-meta-line">
            <span>
              <Star size={18} fill="currentColor" />
              <strong>{course.rating}</strong>
            </span>

              <span>({course.reviews} reviews)</span>

              <span className="learning-dot" />

              <span>
              <Users size={17} />
                {course.students} students
            </span>
            </div>

            <div className="learning-instructor-line">
              <img
                  src={course.instructor?.avatar || defaultAvatar}
                  alt={course.instructor?.name || "Instructor"}
              />
              <span>Instructor: </span>
              <strong>{course.instructor.name}</strong>
              <CheckCircle size={17} fill="currentColor" />
            </div>

            <p>{course.description}</p>
            <div className="learning-tag-list">
              {course.categories?.map((category) => (
                  <span key={category}>{category}</span>
              ))}
            </div>
          </div>
        </div>
      </header>
  );
};

export default CourseDetailHero;