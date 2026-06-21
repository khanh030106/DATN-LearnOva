import {Plus, Trash2} from "lucide-react";
import LessonRow from "./LessonRow.jsx";
import SectionCard from "./SectionCard.jsx";

const SectionsStep = ({
                          courseId,
                          sections,
                          activeSectionId,
                          onSelectSection,
                          onAddSection,
                          onDeleteSection,
                          onAddLesson,
                          onLessonTitleChange,
                          onLessonSourceChange,
                          onLessonResourceChange,
                          onDeleteLesson,
                          onSectionTitleChange,
                          onPrevious,
                          onNext,
                          onLessonVideoChange
                      }) => {
    const activeSection = sections.find((section) => section.id === activeSectionId) || sections[0] || null;

    return (
        <section className="teacher-create-step">
            <div className="teacher-curriculum-layout">
                <aside className="teacher-create-card teacher-section-list">
                    {sections.map((section) => (
                        <SectionCard
                            key={section.id}
                            section={section}
                            isActive={section.id === activeSection?.id}
                            onSelect={() => onSelectSection(section.id)}
                        />
                    ))}
                    <button type="button" className="teacher-add-section teacher-add-section--bottom"
                            onClick={onAddSection}>
                        <Plus size={15}/>
                        Add Section
                    </button>
                </aside>

                <section className="teacher-create-card teacher-section-editor">
                    {activeSection ? (
                        <>
                            <div className="teacher-section-editor__top">
                                <label className="teacher-create-field">
                                    <span>Section Title</span>
                                    <input
                                        value={activeSection.title}
                                        onChange={(event) => onSectionTitleChange(activeSection.id, event.target.value)}
                                        placeholder="Enter section title"
                                    />
                                </label>
                                <button type="button" onClick={() => onDeleteSection(activeSection.id)}
                                        aria-label="Delete section">
                                    <Trash2 size={15}/>
                                </button>
                            </div>

                            <h2>Lessons</h2>
                            <div className="teacher-lesson-builder-list">
                                {activeSection.lessons.map((lesson) => (
                                    <LessonRow
                                        key={lesson.id}
                                        courseId={courseId}
                                        lesson={lesson}
                                        onTitleChange={(title) => onLessonTitleChange(activeSection.id, lesson.id, title)}
                                        onSourceChange={(file) => onLessonSourceChange(activeSection.id, lesson.id, file)}
                                        onVideoChange={(file) => onLessonVideoChange(activeSection.id, lesson.id, file)}
                                        onResourceChange={(files, meta) => onLessonResourceChange?.(activeSection.id, lesson.id, files, meta)}
                                        onDelete={() => onDeleteLesson(activeSection.id, lesson.id)}
                                    />
                                ))}
                            </div>

                            <button type="button" className="teacher-add-lesson"
                                    onClick={() => onAddLesson(activeSection.id)}>
                                <Plus size={15}/>
                                Add Lesson
                            </button>
                        </>
                    ) : (
                        <div className="teacher-section-empty">
                            <h2>No sections yet</h2>
                            <button type="button" className="teacher-add-section" onClick={onAddSection}>
                                <Plus size={15}/>
                                Add Section
                            </button>
                        </div>
                    )}
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
