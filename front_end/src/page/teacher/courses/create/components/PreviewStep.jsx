import { ExternalLink } from "lucide-react";
import CoursePreviewPanel from "./CoursePreviewPanel.jsx";

const PreviewStep = ({ course, sections, previewDevice, onPreviewDeviceChange, onPrevious, onNext }) => {
  return (
    <section className="teacher-create-step">
      <div className="teacher-create-step__bar">
        <div className="teacher-create-step__heading">
          <h1>Course Preview</h1>
          <p>See how your course looks to students.</p>
        </div>
        <button type="button" className="teacher-preview-student-button">
          Preview as Student
          <ExternalLink size={15} />
        </button>
      </div>

      <div className="teacher-device-toggle" role="tablist" aria-label="Preview device">
        {["Desktop", "Tablet", "Mobile"].map((device) => (
          <button
            key={device}
            type="button"
            className={previewDevice === device ? "teacher-device-toggle__active" : ""}
            onClick={() => onPreviewDeviceChange(device)}
          >
            {device}
          </button>
        ))}
      </div>

      <CoursePreviewPanel course={course} sections={sections} />

      <footer className="teacher-create-actions">
        <button type="button" onClick={onPrevious}>
          Previous: Sections
        </button>
        <button type="button" onClick={onNext}>
          Next: Publish
        </button>
      </footer>
    </section>
  );
};

export default PreviewStep;
