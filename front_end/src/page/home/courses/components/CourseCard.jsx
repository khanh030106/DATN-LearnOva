import "../../courses/components/CourseCard.css";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../../hook/UseAuth.jsx";
import { addStoredCartItem } from "../../../../utils/cartStorage.js";

const CourseCard = ({ course }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();

  if (!course) return null;

  const handleAddToCart = () => {
    if (authLoading) return;

    if (!isAuthenticated) {
      toast.error("Bạn cần đăng nhập để thêm khóa học vào giỏ hàng.");
      return;
    }

    const { alreadyInCart } = addStoredCartItem({
      id: course.id,
      title: course.title,
      teacher: course.teacher,
      price: course.price,
      image: course.image,
    });

    if (alreadyInCart) {
      toast.info("Khóa học này đã có trong giỏ hàng.");
      return;
    }

    toast.success("Đã thêm khóa học vào giỏ hàng.");
  };

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

          <button className="course-card__cart" type="button" onClick={handleAddToCart}>
            <BiCart />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
