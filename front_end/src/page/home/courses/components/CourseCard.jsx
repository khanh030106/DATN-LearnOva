import "../../courses/components/CourseCard.css";
import { BiCart } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  if (!course) return null;

  return (
    <article className="course-card">
      <Link to={`/learnova/user/CoursesDetail/${course.id}`}>
        <img
          src={course.image}
          alt={course.title}
          className="course-card__image"
        />
      </Link>

      <div className="course-card__body">
        <Link
          to={`/learnova/user/CoursesDetail/${course.id}`}
          className="course-title"
        >
          <h3>{course.title}</h3>
        </Link>

        <p className="course-card__teacher">{course.teacher}</p>

        <div className="course-card__rating">
          <strong>{course.rating}</strong>
          <span>★</span>
          <small>({course.reviews})</small>
        </div>

        <div className="course-card__footer">
          <div>
            <p className="course-card__price">
              
              {course.price}
            </p>
          </div>

          <button className="course-card__cart" type="button">
            <BiCart />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
