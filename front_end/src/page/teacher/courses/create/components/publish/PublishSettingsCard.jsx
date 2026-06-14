import {Rocket} from "lucide-react";

const PublishSettingsCard = ({status, visibility, onStatusChange, onVisibilityChange, onPublish}) => {
    return (
        <section className="teacher-create-card teacher-publish-settings">
            <h2>Publish Settings</h2>

            <div className="teacher-radio-group">
                <h3>Course Status</h3>
                {[
                    ["DRAFT", "Draft", "Only you can see this course"],
                    ["PUBLISHED", "Published", "Course is live and available to all students"],
                    ["SCHEDULED", "Scheduled", "Choose a future date to publish"],
                ].map(([value, label, help]) => (
                    <label key={value}
                           className={status === value ? "teacher-radio-card teacher-radio-card--active" : "teacher-radio-card"}>
                        <input type="radio" checked={status === value} onChange={() => onStatusChange(value)}/>
                        <span>
              <strong>{label}</strong>
              <small>{help}</small>
            </span>
                    </label>
                ))}
            </div>

            <div className="teacher-radio-group">
                <h3>Visibility</h3>
                {[
                    ["PUBLIC", "Public", "Anyone can find and enroll in your course"],
                    ["PRIVATE", "Private", "Only people with the link can view"],
                ].map(([value, label, help]) => (
                    <label key={value}
                           className={visibility === value ? "teacher-radio-card teacher-radio-card--active" : "teacher-radio-card"}>
                        <input type="radio" checked={visibility === value} onChange={() => onVisibilityChange(value)}/>
                        <span>
              <strong>{label}</strong>
              <small>{help}</small>
            </span>
                    </label>
                ))}
            </div>

            <button type="button" className="teacher-publish-button" onClick={onPublish}>
                <Rocket size={17}/>
                Publish Course
            </button>
        </section>
    );
};

export default PublishSettingsCard;
