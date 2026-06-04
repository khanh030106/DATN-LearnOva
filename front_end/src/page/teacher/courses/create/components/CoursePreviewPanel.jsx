import { CheckCircle, Clock, GraduationCap, Play, Volume2 } from "lucide-react";

const CoursePreviewPanel = ({ course, sections }) => {
  return (
    <div className="teacher-preview-layout">
      <section className="teacher-create-card teacher-student-preview">
        <div className="teacher-student-preview__media">
          <img src={course.thumbnailUrl} alt={course.title} />
          <button type="button" aria-label="Play course preview">
            <Play size={30} fill="currentColor" />
          </button>
          <div>
            <span>00:00 / 05:32</span>
            <Volume2 size={17} />
          </div>
        </div>

        <div className="teacher-student-preview__body">
          <h2>{course.title}</h2>
          <p>{course.subtitle}</p>
          <div className="teacher-student-preview__meta">
            <span><GraduationCap size={15} />{course.level}</span>
            <span><CheckCircle size={15} />15 lessons</span>
            <span><Clock size={15} />2h 45m</span>
          </div>
          <nav>
            <button type="button">About</button>
            <button type="button">What you'll learn</button>
            <button type="button">Curriculum</button>
            <button type="button">Instructor</button>
            <button type="button">Reviews</button>
          </nav>
        </div>
      </section>

      <aside className="teacher-create-card teacher-preview-curriculum">
        <header>
          <h2>Curriculum</h2>
          <button type="button">Expand All</button>
        </header>
        {sections.map((section, index) => (
          <details key={section.id} open={index === 0}>
            <summary>
              <strong>Section {section.sectionOrder}: {section.title}</strong>
              <span>{section.lessons.length} lessons</span>
            </summary>
            {section.lessons.map((lesson) => (
              <div key={lesson.id} className="teacher-preview-lesson">
                <span>{lesson.lessonOrder}. {lesson.title}</span>
                <small>{lesson.duration}</small>
                <CheckCircle size={15} />
              </div>
            ))}
          </details>
        ))}
      </aside>
    </div>
  );
};

export default CoursePreviewPanel;
