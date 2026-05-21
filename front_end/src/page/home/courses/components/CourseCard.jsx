import '../../courses/components/CourseCard.css'
import {BiCart} from "react-icons/bi";

const CourseCard = ({ course }) => {
    return (
        <article className="course-card">
            <img src={course.image} alt={course.title} className="course-card__image" />

            <div className="course-card__body">
                <h3>{course.title}</h3>

                <p className="course-card__teacher">{course.teacher}</p>

                <div className="course-card__rating">
                    <strong>{course.rating}</strong>
                    <span>★★★★★</span>
                    <small>({course.reviews})</small>
                </div>

                <div className="course-card__footer">
                    <div>
                        <p className="course-card__old-price">{course.oldPrice}</p>
                        <p className="course-card__price">{course.price}</p>
                    </div>

                    <button className="course-card__cart" type="button">
                        <BiCart/>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default CourseCard;