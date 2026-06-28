import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Course.css';

const ALL_COURSES = [
    { id: 1, title: 'Complete Web Development Bootcamp', instructor: 'Sarah Chen',     rating: 4.8, reviews: '12,400', students: '142K', hours: 62, level: 'Beginner',     price: '$14.99', originalPrice: '$89.99',  badge: 'Bestseller', category: 'tech',     bg: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)' },
    { id: 2, title: 'Python for Data Science & ML',      instructor: 'Dr. Alex Kumar', rating: 4.9, reviews: '9,800',  students: '98K',  hours: 45, level: 'Intermediate', price: '$12.99', originalPrice: '$74.99',  badge: 'Hot',        category: 'tech',     bg: 'linear-gradient(135deg, #4361ee 0%, #7209b7 100%)' },
    { id: 3, title: 'UI/UX Design: Zero to Hero',        instructor: 'Maria Gonzalez', rating: 4.7, reviews: '7,200',  students: '67K',  hours: 38, level: 'Beginner',     price: '$14.99', originalPrice: '$69.99',  badge: 'New',        category: 'design',   bg: 'linear-gradient(135deg, #f72585 0%, #b5179e 100%)' },
    { id: 4, title: 'Business Strategy & Execution',     instructor: 'James Wright',   rating: 4.8, reviews: '6,100',  students: '54K',  hours: 28, level: 'All levels',   price: '$11.99', originalPrice: '$64.99',  badge: '',           category: 'business', bg: 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)' },
    { id: 5, title: 'Financial Modeling & Valuation',    instructor: 'Emma Thompson',  rating: 4.9, reviews: '5,400',  students: '43K',  hours: 34, level: 'Intermediate', price: '$15.99', originalPrice: '$79.99',  badge: 'Top Rated',  category: 'business', bg: 'linear-gradient(135deg, #8338ec 0%, #3a0ca3 100%)' },
    { id: 6, title: 'Adobe Illustrator Masterclass',     instructor: 'Carlos Rivera',  rating: 4.6, reviews: '4,800',  students: '31K',  hours: 41, level: 'Beginner',     price: '$11.99', originalPrice: '$59.99',  badge: '',           category: 'design',   bg: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' },
];

const FILTERS = [
    { label: 'All Courses', value: 'all' },
    { label: 'Tech',        value: 'tech' },
    { label: 'Design',      value: 'design' },
    { label: 'Business',    value: 'business' },
];

export default function Course() {
    const [filter, setFilter] = useState('all');

    const courses = filter === 'all'
        ? ALL_COURSES
        : ALL_COURSES.filter(c => c.category === filter);

    return (
        <section className="cs" aria-labelledby="cs-heading">
            <div className="cs__container">
                <div className="cs__header">
                    <div>
                        <span className="section-eyebrow">Top Picks</span>
                        <h2 id="cs-heading" className="cs__title">Featured courses</h2>
                    </div>
                    <a href="/courses" className="cs__link">Browse all courses →</a>
                </div>

                <div className="cs__filters" role="group" aria-label="Filter by category">
                    {FILTERS.map((f) => (
                        <button
                            key={f.value}
                            className={`cs__filter-btn ${filter === f.value ? 'cs__filter-btn--active' : ''}`}
                            onClick={() => setFilter(f.value)}
                            aria-pressed={filter === f.value}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="cs__grid">
                    {courses.map((course) => (
                        <Link
                            key={course.id}
                            to={`/learnova/CoursesDetail/${course.id}`}
                            className="cs__card"
                        >
                            <div className="cs__thumb" style={{ background: course.bg }}>
                                <div className="cs__play">
                                    <div className="cs__play-tri" />
                                </div>
                                {course.badge && (
                                    <span className="cs__badge">{course.badge}</span>
                                )}
                            </div>
                            <div className="cs__body">
                                <h3 className="cs__course-title">{course.title}</h3>
                                <p className="cs__instructor">{course.instructor}</p>
                                <div className="cs__rating-row">
                                    <span className="cs__rating">★ {course.rating}</span>
                                    <span className="cs__reviews">({course.reviews})</span>
                                    <span className="cs__meta">{course.hours}h · {course.level}</span>
                                </div>
                                <div className="cs__footer">
                                    <div className="cs__price-row">
                                        <span className="cs__price">{course.price}</span>
                                        <span className="cs__original">{course.originalPrice}</span>
                                    </div>
                                    <span className="cs__students">{course.students} students</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
