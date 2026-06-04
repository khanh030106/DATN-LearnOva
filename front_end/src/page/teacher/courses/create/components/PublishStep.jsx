import { CheckCircle, Clock, GraduationCap, ListChecks } from "lucide-react";
import PublishSettingsCard from "./PublishSettingsCard.jsx";

const PublishStep = ({
  course,
  status,
  visibility,
  onStatusChange,
  onVisibilityChange,
  onPublish,
  onPrevious,
}) => {
  return (
    <section className="teacher-create-step">
      <div className="teacher-create-step__heading">
        <h1>Publish Your Course</h1>
        <p>Make your course live and available for students.</p>
      </div>

      <div className="teacher-publish-layout">
        <div className="teacher-publish-left">
          <section className="teacher-create-card teacher-course-summary">
            <h2>Course Summary</h2>
            <div>
              <img src={course.thumbnailUrl} alt={course.title} />
              <span>
                <strong>{course.title}</strong>
                <small><ListChecks size={14} />15 lessons</small>
                <small><Clock size={14} />2h 45m</small>
                <small><GraduationCap size={14} />{course.level}</small>
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
                <CheckCircle size={17} />
                {item}
              </p>
            ))}
          </section>
        </div>

        <PublishSettingsCard
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
