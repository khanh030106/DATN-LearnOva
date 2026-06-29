import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Course.css';
import { getAdminCoursesApi } from '../../../api/admin/CourseApi.js';

const FILTERS = [
    { label: 'All Courses', value: 'all' },
    { label: 'Tech',        value: 'tech' },
    { label: 'Design',      value: 'design' },
    { label: 'Business',    value: 'business' },
];

const formatCoursePrice = (value) => {
    if (value == null || value === '') return 'Free';
    if (typeof value === 'number') {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0,
        }).format(value);
    }
    return String(value);
};

const inferCategory = (course) => {
    if (course.category) return course.category.toLowerCase();
    const title = String(course.title || '').toLowerCase();
    if (title.includes('design') || title.includes('ux')) return 'design';
    if (title.includes('business') || title.includes('marketing') || title.includes('management')) return 'business';
    return 'tech';
};

const buildCourseCard = (course) => ({
    id: course.id,
    title: course.title || 'Untitled course',
    instructor: course.instructorName || 'Unknown',
    rating: course.rating || 4.8,
    reviews: course.reviewCount || course.reviews || 0,
    students: course.studentCount || course.students || '—',
    hours: course.duration || '0',
    level: course.level || 'Beginner',
    price: formatCoursePrice(course.basePrice),
    originalPrice: null,
    badge: course.status === 'PUBLISHED' ? 'Bestseller' : course.status === 'DRAFT' ? 'New' : 'Hot',
    category: inferCategory(course),
    bg: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
});

export default function Course() {
    const [filter, setFilter] = useState('all');
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            setError(null);
            try {
                const coursesResponse = await getAdminCoursesApi();
                setCourses(coursesResponse.map(buildCourseCard));
            } catch (err) {
                console.error('Unable to load homepage courses', err);
                setError('Unable to load courses.');
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    useEffect(() => {
        setPage(0);
    }, [filter]);

    const filteredCourses = filter === 'all'
        ? courses
        : courses.filter((c) => c.category === filter);

    const pageSize = 4;
    const pageCount = Math.max(1, Math.ceil(filteredCourses.length / pageSize));
    const currentIndex = Math.min(page, pageCount - 1);
    const visibleCourses = filteredCourses.slice(currentIndex * pageSize, currentIndex * pageSize + pageSize);

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setPage((prev) => Math.min(prev + 1, pageCount - 1));

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

                {loading ? (
                    <div className="cs__status-message">Loading courses…</div>
                ) : error ? (
                    <div className="cs__status-message cs__status-error">{error}</div>
                ) : visibleCourses.length === 0 ? (
                    <div className="cs__status-message">No courses found.</div>
                ) : (
                    <div className="cs__carousel">
                        <button
                            type="button"
                            className="cs__arrow-button"
                            onClick={handlePrev}
                            aria-label="Previous courses"
                            disabled={currentIndex === 0}
                        >
                            ‹
                        </button>

                        <div className="cs__viewport">
                            <div className="cs__grid">
                                {visibleCourses.map((course) => (
                                    <Link
                                        key={course.id}
                                        to={`/learnova/user/CoursesDetail/${course.id}`}
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

                        <button
                            type="button"
                            className="cs__arrow-button"
                            onClick={handleNext}
                            aria-label="Next courses"
                            disabled={currentIndex >= pageCount - 1}
                        >
                            ›
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
