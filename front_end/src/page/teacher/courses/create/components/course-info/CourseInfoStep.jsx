import {Plus} from "lucide-react";
import {COURSE_DESCRIPTION_MAX_LENGTH} from "../../utils/courseCreationValidation.js";
import CourseThumbnailUploader from "./CourseThumbnailUploader.jsx";

const CourseInfoStep = ({
                            course,
                            onCourseChange,
                            onThumbnailSelected,
                            onListChange,
                            onAddListItem,
                            onCancel,
                            onNext,
                        }) => {
    const updateField = (event) => {
        const {name, value} = event.target;
        onCourseChange({[name]: value});
    };

    return (
        <section className="teacher-create-step">
            <div className="teacher-create-card teacher-course-info-card">
                <CourseThumbnailUploader
                    courseId={course.id}
                    currentFileUrl={course.thumbnailPreviewUrl}
                    onUploadComplete={onThumbnailSelected}
                />

                <div className="teacher-course-info-card__main">
                    <label className="teacher-create-field">
                        <span>Course Title</span>
                        <input name="title" value={course.title} onChange={updateField}
                               placeholder="Enter an engaging course title"/>
                    </label>
                    <label className="teacher-create-field teacher-create-field--wide">
                        <span>Description</span>
                        <textarea
                            name="description"
                            value={course.description}
                            onChange={updateField}
                            maxLength={COURSE_DESCRIPTION_MAX_LENGTH}
                            placeholder="Write a detailed description about your course..."
                        />
                        <small>{course.description.length}/{COURSE_DESCRIPTION_MAX_LENGTH}</small>
                    </label>
                </div>

                <div className="teacher-create-form-grid">
                    <label className="teacher-create-field">
                        <span>Language</span>
                        <select name="language" value={course.language} onChange={updateField}>
                            <option value="">Select language</option>
                            <option>English</option>
                            <option>Vietnamese</option>
                        </select>
                    </label>

                    <label className="teacher-create-field">
                        <span>Level</span>
                        <select name="level" value={course.level} onChange={updateField}>
                            <option value="">Select level</option>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </label>

                    <label className="teacher-create-field">
                        <span>Category</span>
                        <select name="category" value={course.category} onChange={updateField}>
                            <option value="">Select category</option>
                            <option>Philosophy</option>
                            <option>Research</option>
                            <option>History</option>
                            <option>Data Science</option>
                        </select>
                    </label>

                    <label className="teacher-create-field">
                        <span>Price (VND) *</span>
                        <input name="basePrice" type="number" value={course.basePrice} onChange={updateField}/>
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
                            <Plus size={15}/>
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
                            <Plus size={15}/>
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
