import {
  AlignLeft,
  Bold,
  Image,
  Italic,
  Link,
  List,
  Plus,
  Quote,
} from "lucide-react";

const CourseInfoStep = ({ course, onCourseChange, onListChange, onAddListItem, onCancel, onNext }) => {
  const updateField = (event) => {
    const { name, value } = event.target;
    onCourseChange({ [name]: value });
  };

  return (
    <section className="teacher-create-step">

      <div className="teacher-create-card teacher-course-info-card">
        <label className="teacher-upload-box">
          <Image size={34} />
          <strong>Upload Image</strong>
          <span>Recommended size: 1280x720px</span>
          <small>JPG, PNG up to 5MB</small>
          <input type="file" accept="image/png,image/jpeg" />
        </label>

        <div className="teacher-course-info-card__main">
          <label className="teacher-create-field">
            <span>Course Title *</span>
            <input name="title" value={course.title} onChange={updateField} placeholder="Enter an engaging course title" />
          </label>

          <label className="teacher-create-field">
            <span>Course Subtitle</span>
            <input
              name="subtitle"
              value={course.subtitle}
              onChange={updateField}
              placeholder="A short subtitle that describes your course"
            />
          </label>
        </div>

        <label className="teacher-create-field teacher-create-field--wide">
          <span>Description *</span>
          <textarea
            name="description"
            value={course.description}
            onChange={updateField}
            maxLength={2000}
            placeholder="Write a detailed description about your course..."
          />
          <small>{course.description.length}/2000</small>
        </label>

        <div className="teacher-create-form-grid">
          <label className="teacher-create-field">
            <span>Language</span>
            <select name="language" value={course.language} onChange={updateField}>
              <option>English</option>
              <option>Vietnamese</option>
            </select>
          </label>

          <label className="teacher-create-field">
            <span>Level</span>
            <select name="level" value={course.level} onChange={updateField}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </label>

          <label className="teacher-create-field">
            <span>Category</span>
            <select name="category" value={course.category} onChange={updateField}>
              <option>Philosophy</option>
              <option>Research</option>
              <option>History</option>
              <option>Data Science</option>
            </select>
          </label>

          <label className="teacher-create-field">
            <span>Price (VND) *</span>
            <input name="basePrice" type="number" value={course.basePrice} onChange={updateField} />
          </label>
        </div>

        <div className="teacher-create-list-grid">
          <div className="teacher-create-list-card">
            <h2>What Students Will Learn</h2>
            {course.whatYouLearn.map((item, index) => (
              <input
                key={`learn-${index}`}
                value={item}
                onChange={(event) => onListChange("whatYouLearn", index, event.target.value)}
                placeholder="e.g. Build real-world projects"
              />
            ))}
            <button type="button" onClick={() => onAddListItem("whatYouLearn")}>
              <Plus size={15} />
              Add another learning outcome
            </button>
          </div>

          <div className="teacher-create-list-card">
            <h2>Requirements</h2>
            {course.requirements.map((item, index) => (
              <input
                key={`requirement-${index}`}
                value={item}
                onChange={(event) => onListChange("requirements", index, event.target.value)}
                placeholder="e.g. Basic computer skills"
              />
            ))}
            <button type="button" onClick={() => onAddListItem("requirements")}>
              <Plus size={15} />
              Add more
            </button>
          </div>
        </div>
      </div>

      <footer className="teacher-create-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" onClick={onNext}>
          Save & Continue
        </button>
      </footer>
    </section>
  );
};

export default CourseInfoStep;
