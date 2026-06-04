import { FileText, Plus, PlayCircle, Settings, Trash2, UploadCloud, X } from "lucide-react";
import { useState } from "react";

const buildFallbackSections = (course) =>
  course.sections?.length
    ? course.sections
    : [
        {
          id: `${course.id}-section-1`,
          title: "Introduction and Foundations",
          sectionOrder: 1,
          isDeleted: false,
          lessons: [
            {
              id: `${course.id}-lesson-1`,
              title: "Course overview",
              lessonOrder: 1,
              type: "Video",
              sourceFile: null,
              durationSeconds: 900,
              isPreview: true,
              isDeleted: false,
            },
          ],
        },
      ];

const CourseUpdateModal = ({ course, onClose, onSave }) => {
  const [sections, setSections] = useState(buildFallbackSections(course));

  const handleAddSection = () => {
    setSections((currentSections) => {
      const nextOrder = currentSections.length + 1;

      return [
        ...currentSections,
        {
          id: `${course.id}-section-${Date.now()}`,
          title: `New module ${nextOrder}`,
          sectionOrder: nextOrder,
          isDeleted: false,
          lessons: [
            {
              id: `${course.id}-lesson-${Date.now()}`,
              title: "New lesson",
              lessonOrder: 1,
              type: "Video",
              sourceFile: null,
              durationSeconds: 0,
              isPreview: false,
              isDeleted: false,
            },
          ],
        },
      ];
    });
  };

  const handleSectionTitleChange = (sectionId, title) => {
    setSections((currentSections) =>
      currentSections.map((section) => (section.id === sectionId ? { ...section, title } : section))
    );
  };

  const handleLessonTitleChange = (sectionId, lessonId, title) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, title } : lesson
              ),
            }
          : section
      )
    );
  };

  const handleAddLesson = (sectionId) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: [
                ...section.lessons,
                {
                  id: `${section.id}-lesson-${section.lessons.length + 1}`,
                  title: "New lesson",
                  lessonOrder: section.lessons.length + 1,
                  type: "Video",
                  sourceFile: null,
                  durationSeconds: 0,
                  isPreview: false,
                  isDeleted: false,
                },
              ],
            }
          : section
      )
    );
  };

  const handleLessonTypeChange = (sectionId, lessonId, type) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, type } : lesson
              ),
            }
          : section
      )
    );
  };

  const handleLessonFileChange = (sectionId, lessonId, file) => {
    if (!file) {
      return;
    }

    const inferredType = file.type.startsWith("video/") ? "Video" : "Document";

    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      type: inferredType,
                      sourceFile: {
                        name: file.name,
                        size: file.size,
                        type: file.type || inferredType,
                      },
                    }
                  : lesson
              ),
            }
          : section
      )
    );
  };

  const handleRemoveLessonFile = (sectionId, lessonId) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, sourceFile: null } : lesson
              ),
            }
          : section
      )
    );
  };

  const handleSubmit = () => {
    onSave({
      ...course,
      sections,
      modules: sections.reduce((total, section) => total + section.lessons.length, 0),
    });
  };

  return (
    <div className="teacher-course-modal" role="dialog" aria-modal="true" aria-labelledby="course-module-title">
      <div className="teacher-course-modal__panel">
        <header className="teacher-course-modal__header">
          <span className="teacher-course-modal__icon">
            <FileText size={34} />
          </span>
          <div>
            <h2 id="course-module-title">{course.title}</h2>
            <p>Manage sections, lessons, and lesson files for this course.</p>
          </div>
          <button type="button" aria-label="Close module manager" onClick={onClose}>
            <X size={24} />
          </button>
        </header>

        <div className="teacher-module-list">
          <button className="teacher-module-list__add-section" type="button" onClick={handleAddSection}>
            <Plus size={18} />
            Add new section
          </button>

          {sections.map((section, sectionIndex) => (
            <section key={section.id} className="teacher-module-card">
              <header>
                <div>
                  <PlayCircle size={20} />
                  <label className="teacher-module-card__title">
                    <span>Chapter {sectionIndex + 1}</span>
                    <input
                      value={section.title}
                      onChange={(event) => handleSectionTitleChange(section.id, event.target.value)}
                    />
                  </label>
                </div>
                <button type="button" aria-label="Module settings">
                  <Settings size={20} />
                </button>
              </header>

              <div className="teacher-lesson-list">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson.id} className="teacher-lesson-row">
                    <div className="teacher-lesson-row__main">
                      <input
                        value={`${sectionIndex + 1}.${lessonIndex + 1}. ${lesson.title}`}
                        onChange={(event) =>
                          handleLessonTitleChange(
                            section.id,
                            lesson.id,
                            event.target.value.replace(/^\d+\.\d+\.\s*/, "")
                          )
                        }
                      />
                      {lesson.sourceFile && (
                        <small title={lesson.sourceFile.name}>{lesson.sourceFile.name}</small>
                      )}
                    </div>

                    <select
                      value={lesson.type || "Video"}
                      onChange={(event) => handleLessonTypeChange(section.id, lesson.id, event.target.value)}
                    >
                      <option value="Video">Video</option>
                      <option value="Document">Docs</option>
                    </select>

                    <label className="teacher-lesson-row__upload">
                      <UploadCloud size={16} />
                      Upload
                      <input
                        type="file"
                        accept="video/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                        onChange={(event) =>
                          handleLessonFileChange(section.id, lesson.id, event.target.files?.[0])
                        }
                      />
                    </label>

                    <button
                      type="button"
                      className="teacher-lesson-row__delete"
                      aria-label={`Remove file from ${lesson.title}`}
                      disabled={!lesson.sourceFile}
                      onClick={() => handleRemoveLessonFile(section.id, lesson.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                <button
                  className="teacher-module-card__add"
                  type="button"
                  onClick={() => handleAddLesson(section.id)}
                >
                  + Add lesson
                </button>
              </div>
            </section>
          ))}
        </div>

        <footer className="teacher-course-modal__footer">
          <button type="button" onClick={handleSubmit}>
            Save Lesson Changes
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CourseUpdateModal;
