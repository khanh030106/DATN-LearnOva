import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCourseForm } from "./hooks/useCourseForm.js";
import { useCourseUpload } from "./hooks/useCourseUpload.js";
import CreateStepper from "./components/stepper/CreateStepper.jsx";
import CourseInfoStep from "./components/course-info/CourseInfoStep.jsx";
import SectionsStep from "./components/curriculum/SectionsStep.jsx";
import PreviewStep from "./components/preview/PreviewStep.jsx";
import PublishStep from "./components/publish/PublishStep.jsx";
import "./CourseCreationPage.css";
import { useState } from "react";

const CourseCreationPage = () => {
    const navigate = useNavigate();
    const [previewDevice, setPreviewDevice] = useState("Desktop");

    const {
        currentStep,
        setCurrentStep,
        course,
        sections,
        activeSectionId,
        setActiveSectionId,
        updateCourse,
        updateListItem,
        addListItem,
        addSection,
        deleteSection,
        addLesson,
        updateLessonTitle,
        updateLessonSource,
        deleteLesson,
        updateSectionTitle,
        setLessonVideo,
        updateLessonResources,
        removeLessonResource,
        handleCourseInfoNext,
        handleSectionsNext,
    } = useCourseForm();

    const { handleThumbnailSelected, handleLessonVideoSelected, handleLessonSourceSelected, handleLessonResourceSelected } =
        useCourseUpload({
            courseId: course.id,
            onCourseChange: updateCourse,
            onLessonSourceChange: updateLessonSource,
            onLessonVideoChange: setLessonVideo,
            onLessonResourcesChange: updateLessonResources,
        });


    return (
        <section className="teacher-create-page">
            <header className="teacher-create-page__top">
                <Link to="/learnova/teacher/courses">
                    <ArrowLeft size={15} />
                    Back to My Courses
                </Link>
                <CreateStepper currentStep={currentStep} />
                <button type="button" onClick={() => updateCourse({ status: "DRAFT" })}>
                    Save Draft
                </button>
            </header>

            {currentStep === 1 && (
                <CourseInfoStep
                    course={course}
                    onCourseChange={updateCourse}
                    onListChange={updateListItem}
                    onAddListItem={addListItem}
                    onThumbnailSelected={handleThumbnailSelected}
                    onCancel={() => navigate("/learnova/teacher/courses")}
                    onNext={() => handleCourseInfoNext()}
                />
            )}

            {currentStep === 2 && (
                <SectionsStep
                    courseId={course.id}
                    sections={sections}
                    activeSectionId={activeSectionId}
                    onSelectSection={setActiveSectionId}
                    onAddSection={addSection}
                    onDeleteSection={deleteSection}
                    onAddLesson={addLesson}
                    onLessonTitleChange={updateLessonTitle}
                    onLessonSourceChange={handleLessonSourceSelected}
                    onLessonResourceChange={handleLessonResourceSelected}
                    onLessonResourceRemove={removeLessonResource}
                    onDeleteLesson={deleteLesson}
                    onSectionTitleChange={updateSectionTitle}
                    onLessonVideoChange={handleLessonVideoSelected}
                    onPrevious={() => setCurrentStep(1)}
                    onNext={handleSectionsNext}
                />
            )}

            {currentStep === 3 && (
                <PreviewStep
                    course={course}
                    sections={sections}
                    previewDevice={previewDevice}
                    onPreviewDeviceChange={setPreviewDevice}
                    onPrevious={() => setCurrentStep(2)}
                    onNext={() => setCurrentStep(4)}
                />
            )}

            {currentStep === 4 && (
                <PublishStep
                    course={course}
                    sections={sections}
                    status={course.status}
                    visibility={course.visibility}
                    onStatusChange={(status) => updateCourse({ status })}
                    onVisibilityChange={(visibility) => updateCourse({ visibility })}
                    onPublish={() => updateCourse({ status: "PUBLISHED" })}
                    onPrevious={() => setCurrentStep(3)}
                />
            )}
        </section>
    );
};

export default CourseCreationPage;
