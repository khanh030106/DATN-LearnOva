const TopRevenueCoursesPanel = ({ courses }) => (
  <section className="teacher-revenue-panel-wrap">
    <header className="teacher-revenue-panel-title">
      <h2>Top revenue courses</h2>
      <button type="button">View all</button>
    </header>

    <article className="teacher-revenue-panel teacher-revenue-top-courses">
    <div className="teacher-revenue-course-list">
      {courses.map((course) => (
        <div key={course.title} className="teacher-revenue-course-row">
          <img src={course.image} alt="" />
          <div>
            <strong>{course.title}</strong>
            <span>{course.subtitle}</span>
          </div>
          <div>
            <strong>{course.revenue}</strong>
            <span>Revenue</span>
          </div>
          <div>
            <strong>{course.students}</strong>
            <span>Students</span>
          </div>
          <b className={`teacher-revenue-trend teacher-revenue-trend--${course.trendTone}`}>{course.trend}</b>
        </div>
      ))}
    </div>
    </article>
  </section>
);

export default TopRevenueCoursesPanel;
