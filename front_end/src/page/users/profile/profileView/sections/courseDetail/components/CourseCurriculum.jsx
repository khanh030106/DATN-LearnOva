import { CheckCircle, ChevronDown, ChevronUp, Play, Unlock } from "lucide-react";

const CourseCurriculum = ({ course }) => (
  <section className="learning-content-panel">
    <div className="learning-panel-heading">
      <span>
        {course.chaptersTotal} chương - {course.lessonsTotal} bài học
      </span>
      <button type="button">Mở tất cả</button>
    </div>

    <div className="learning-chapter-list">
      {course.curriculum.map((chapter) => (
        <article
          className={`learning-chapter ${chapter.expanded ? "open" : ""}`}
          key={chapter.id}
        >
          <div className="learning-chapter-header">
            <div>
              <span className="learning-chapter-toggle">
                {chapter.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
              <strong>
                {String(chapter.id).padStart(2, "0")}. {chapter.title}
              </strong>
            </div>
            <div className="learning-chapter-progress">
              <span>
                {chapter.completedLessons}/{chapter.totalLessons}
              </span>
              {chapter.percent > 0 && <mark>{chapter.percent}%</mark>}
            </div>
          </div>

          {chapter.expanded && (
            <div className="learning-lesson-list">
              {chapter.lessons.map((lesson, index) => (
                <div className="learning-lesson-row" key={lesson.title}>
                  <div>
                    <span className="learning-lesson-play">
                      <Play size={13} fill="currentColor" />
                    </span>
                    <p>
                      {chapter.id}.{index + 1} {lesson.title}
                    </p>
                  </div>
                  <span>{lesson.duration}</span>
                  {lesson.completed ? (
                    <CheckCircle className="done" size={18} fill="currentColor" />
                  ) : (
                    <Unlock className="pending" size={17} />
                  )}
                </div>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  </section>
);

export default CourseCurriculum;
