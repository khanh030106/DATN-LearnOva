import {CheckCircle, GraduationCap, Image, Play} from "lucide-react";

const CoursePreviewPanel = ({course, sections}) => {
    const lessonCount = sections.reduce((total, section) => total + section.lessons.length, 0);
    const courseTitle = course.title || "Untitled course";

    return (
        <div className="teacher-preview-layout">
            <section className="teacher-create-card teacher-student-preview">
                <div className="teacher-student-preview__media">
                    {course.thumbnailPreviewUrl ? (
                        <img src={course.thumbnailPreviewUrl} alt={courseTitle}/>
                    ) : (
                        <span className="teacher-student-preview__placeholder">
              <Image size={34}/>
            </span>
                    )}
                    <button type="button" aria-label="Play course preview">
                        <Play size={30} fill="currentColor"/>
                    </button>
                </div>

                <div className="teacher-student-preview__body">
                    <h2>{courseTitle}</h2>
                    <div className="teacher-student-preview__meta">
                        {course.level && <span><GraduationCap size={15}/>{course.level}</span>}
                        <span><CheckCircle size={15}/>{lessonCount} lessons</span>
                    </div>
                </div>
            </section>

            <aside className="teacher-create-card teacher-preview-curriculum">
                {sections.length > 0 ? (
                    sections.map((section, index) => (
                        <details key={section.id} open={index === 0}>
                            <summary>
                                <strong>Section {section.sectionOrder}: {section.title || "Untitled section"}</strong>
                            </summary>
                            {section.lessons.map((lesson) => (
                                <div key={lesson.id} className="teacher-preview-lesson">
                                    <span>{lesson.lessonOrder}. {lesson.title || "Untitled lesson"}</span>
                                </div>
                            ))}
                        </details>
                    ))
                ) : (
                    <p className="teacher-preview-empty">No sections added yet.</p>
                )}
            </aside>
        </div>
    );
};

export default CoursePreviewPanel;
