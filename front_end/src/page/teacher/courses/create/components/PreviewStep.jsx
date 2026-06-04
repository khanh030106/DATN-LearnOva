import { ExternalLink } from "lucide-react";
import CoursePreviewPanel from "./CoursePreviewPanel.jsx";

const PreviewStep = ({ course, sections, onPrevious, onNext }) => {
  return (
    <section className="teacher-create-step">

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
