import React from "react";
import "./CourseCard.css";
import { toast } from "react-toastify";
import { useAuth } from "../../../hook/UseAuth.jsx";
import { addStoredCartItem } from "../../../utils/cartStorage.js";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";


function CourseCard({ course }) {
    const { isAuthenticated, loading: authLoading } = useAuth();

    const handleAddToCart = () => {
        if (authLoading) return;

        if (!isAuthenticated) {
            toast.error("Bạn cần đăng nhập để thêm khóa học vào giỏ hàng.");
            return;
        }

        const { alreadyInCart } = addStoredCartItem({
            id: course.id,
            title: course.title,
            teacher: course.author,
            price: course.price,
            image: course.image,
        });

        if (alreadyInCart) {
            toast.info("Khóa học này đã có trong giỏ hàng.");
            return;
        }

        toast.success("Đã thêm khóa học vào giỏ hàng.");
    };
    const handleFavorite = () => {
        const favorites =
            JSON.parse(localStorage.getItem("favoriteCourses")) || [];

        if (favorites.includes(course.id)) {
            const newFavorites = favorites.filter(id => id !== course.id);

            localStorage.setItem(
                "favoriteCourses",
                JSON.stringify(newFavorites)
            );

            setIsFavorite(false);
        } else {
            favorites.push(course.id);

            localStorage.setItem(
                "favoriteCourses",
                JSON.stringify(favorites)
            );

            setIsFavorite(true);
        }
    };
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        const favorites =
            JSON.parse(localStorage.getItem("favoriteCourses")) || [];

        setIsFavorite(favorites.includes(course.id));
    }, [course.id]);

    return (
        <div className="course-card-course">
            <div className="course-card-img">
                <img src={course.image} alt={course.title} />
                {course.tag && <span className="course-tag">{course.tag}</span>}
            </div>
            <div className="course-card-body">
                <div className="course-category">{course.category}</div>
                <h3 className="course-title">{course.title}</h3>
                <div className="course-author">{course.author}</div>
                <div className="course-rating">
                    <span>⭐ {course.rating}</span>
                    <span>({course.reviews})</span>
                </div>
                <div className="course-card-bottom">
                    <span className="course-price">{course.price.toLocaleString()}đ</span>

                    <button
                        className="add-to-cart"
                        title="Thêm vào giỏ hàng"
                        type="button"
                        onClick={handleAddToCart}
                    >
                        🛒
                    </button>
                </div>
            </div>
        </div>
    );
} export default CourseCard;
