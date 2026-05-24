import CourseCard from "./components/CourseCard.jsx";
import course1 from '../../../assets/course/course-1.jpg';
import course2 from '../../../assets/course/course-2.jpg';
import course3 from '../../../assets/course/course-3.jpg';
import course4 from '../../../assets/course/course-4.jpg';
import './Course.css'

const courses = [
    {
        id: 1,
        title: 'Fullstack Web Developer',
        teacher: 'Tran Hoang Nam',
        rating: 4.9,
        reviews: '12,450',
        price: '1.299.000Đ',
        image: course1,
    },
    {
        id: 2,
        title: 'Professional Graphic Design',
        teacher: 'Nguyen Minh Anh',
        rating: 4.8,
        reviews: '8,920',
        price: '899.000Đ',
        image: course2,
    },
    {
        id: 3,
        title: 'Digital Marketing từ A-Z',
        teacher: 'Le Quang Huy',
        rating: 4.7,
        reviews: '5,600',
        price: '750.000Đ',
        image: course3,
    },
    {
        id: 4,
        title: 'English for workplace communication',
        teacher: 'Jennifer Nguyen',
        rating: 5.0,
        reviews: '2,100',
        price: '599.000Đ',
        image: course4,
    },
];

const Course = () => {
    return (
        <section className="course-section">
            <div className="course-section__header">
                <div>
                    <h2>Featured Course</h2>
                    <p>The latest and hottest knowledge is constantly updated..</p>
                </div>

                <a href="/courses" className="course-section__link">
                    All courses ›
                </a>
            </div>

            <div className="course-section__grid">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </section>
    );
};

export default Course;