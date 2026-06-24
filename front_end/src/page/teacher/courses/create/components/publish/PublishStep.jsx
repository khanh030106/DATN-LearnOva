import {CheckCircle, GraduationCap, Image, ListChecks} from "lucide-react";
import PublishCard from "./PublishCard.jsx";

const PublishStep = ({
                         course,
                         sections,
                         status,
                         visibility,
                         onStatusChange,
                         onVisibilityChange,
                         onPublish,
                         onPrevious,
                     }) => {
    const lessonCount = sections.reduce((total, section) => total + section.lessons.length, 0);
    const courseTitle = course.title || "Untitled course";

    return (
        <section className="teacher-create-step">
            <div className="teacher-publish-layout">
                <div className="teacher-publish-left">
                    <section className="teacher-create-card teacher-course-summary">
                        <h2>Course Summary</h2>
                        <div>
                            {course.thumbnailPreviewUrl ? (
                                <img src={course.thumbnailPreviewUrl} alt={courseTitle}/>
                            ) : (
                                <span className="teacher-course-summary__placeholder">
                  <Image size={24}/>
                </span>
                            )}
                            <span>
                <strong>{courseTitle}</strong>
                <small><ListChecks size={14}/>{lessonCount} lessons</small>
                                {course.level && <small><GraduationCap size={14}/>{course.level}</small>}
              </span>
                        </div>
                    </section>

                    <section className="teacher-create-card teacher-next-card">
                        <h2>What's Next?</h2>
                        {[
                            "Set your course status to Published",
                            "Choose who can see your course",
                            "Review and confirm course details",
                            "Once published, students can enroll and start learning",
                        ].map((item) => (
                            <p key={item}>
                                <CheckCircle size={17}/>
                                {item}
                            </p>
                        ))}
                    </section>
                </div>

                <PublishCard
                    status={status}
                    visibility={visibility}
                    onStatusChange={onStatusChange}
                    onVisibilityChange={onVisibilityChange}
                    onPublish={onPublish}
                />
            </div>

            <footer className="teacher-create-actions">
                <button type="button" onClick={onPrevious}>
                    Previous: Preview
                </button>
            </footer>
        </section>
    );
};

export default PublishStep;
