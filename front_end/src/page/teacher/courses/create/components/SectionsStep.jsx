import { Lightbulb, Plus, Trash2 } from "lucide-react";
import LessonRow from "./LessonRow.jsx";
import SectionCard from "./SectionCard.jsx";

const SectionsStep = ({ sections, activeSectionId, onSelectSection, onAddSection, onSectionTitleChange, onPrevious, onNext }) => {
  const activeSection = sections.find((section) => section.id === activeSectionId) || sections[0];

  return (
    <section className="teacher-create-step">

      <div className="teacher-curriculum-layout">
        <aside className="teacher-create-card teacher-section-list">
          <button type="button" className="teacher-add-section" onClick={onAddSection}>
            <Plus size={15} />
            Add Section
          </button>
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              isActive={section.id === activeSection.id}
              onSelect={() => onSelectSection(section.id)}
            />
          ))}
          <button type="button" className="teacher-add-section teacher-add-section--bottom" onClick={onAddSection}>
            <Plus size={15} />
            Add Section
          </button>
        </aside>

        <section className="teacher-create-card teacher-section-editor">
          <div className="teacher-section-editor__top">
            <label className="teacher-create-field">
              <span>Section Title</span>
              <input
                value={activeSection.title}
                onChange={(event) => onSectionTitleChange(activeSection.id, event.target.value)}
              />
            </label>
            <button type="button">
              <Trash2 size={15} />
              Delete Section
            </button>
          </div>

          <h2>Lessons</h2>
          <div className="teacher-lesson-builder-list">
            {activeSection.lessons.map((lesson) => (
              <LessonRow key={lesson.id} lesson={lesson} />
            ))}
          </div>

          <button type="button" className="teacher-add-lesson">
            <Plus size={15} />
            Add Lesson
          </button>

          <div className="teacher-curriculum-tip">
            <Lightbulb size={17} />
            Tip: Drag and drop to reorder lessons or sections.
          </div>
        </section>
      </div>

      <footer className="teacher-create-actions">
        <button type="button" onClick={onPrevious}>
          Previous: Course
        </button>
        <button type="button" onClick={onNext}>
          Next: Preview
        </button>
      </footer>
    </section>
  );
};

export default SectionsStep;
