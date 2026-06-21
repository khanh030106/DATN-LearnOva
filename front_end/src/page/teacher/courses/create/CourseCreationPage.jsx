import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCourseCreationForm } from "./hooks/useCourseCreationForm.js";
import { useCourseMediaUpload } from "./hooks/useCourseMediaUpload.js";
import CourseCreationStepper from "./components/stepper/CourseCreationStepper.jsx";
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
        saveCourseDraft,
        updateLessonVideo,
        updateLessonResources,
    } = useCourseCreationForm();

    const { handleThumbnailSelected, handleLessonVideoSelected, handleLessonSourceSelected, handleLessonResourceSelected } =
        useCourseMediaUpload({
            courseId: course.id,
            onCourseChange: updateCourse,
            onLessonSourceChange: updateLessonSource,
            onLessonVideoChange: updateLessonVideo,
            onLessonResourcesChange: updateLessonResources,
        });

    /**
     * Step 1 → Step 2:
     * 1. Tạo course draft (lấy courseId)
     * 2. Upload thumbnail lên S3 nếu user đã chọn file
     * 3. Cập nhật thumbnailUrl trong DB
     */
    const handleSaveAndContinue = async () => {
        try {
            const courseId = await saveCourseDraft();

            if (course.thumbnailFile) {
                const { uploadUrl, fileKey } = await createThumbnailUploadUrl(courseId, course.thumbnailFile);
                await uploadFileToS3(uploadUrl, course.thumbnailFile);
                await updateDraftCourse(courseId, { thumbnailUrl: fileKey });
                updateCourse({ thumbnailUrl: fileKey, thumbnailFile: null });
            }

            setCurrentStep(2);
        } catch (error) {
            console.error("Failed to save course draft:", error);
            alert("Không thể lưu khóa học. Vui lòng thử lại.");
        }
    };

    /**
     * Publish course — gọi API thực sự.
     */
    const handlePublish = async () => {
        if (!course.id) {
            alert("Vui lòng lưu khóa học trước khi publish.");
            return;
        }
        try {
            const data = await publishCourseApi(course.id);
            updateCourse({ status: data.status ?? "PUBLISHED" });
        } catch (error) {
            console.error("Failed to publish course:", error);
            alert("Không thể publish khóa học. Vui lòng thử lại.");
        }
    };

    return (
        <section className="teacher-create-page">
            <header className="teacher-create-page__top">
                <Link to="/learnova/teacher/courses">
                    <ArrowLeft size={15} />
                    Back to My Courses
                </Link>
                <CourseCreationStepper currentStep={currentStep} />
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
                    onNext={handleSaveAndContinue}
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
                    onDeleteLesson={deleteLesson}
                    onSectionTitleChange={updateSectionTitle}
                    onLessonVideoChange={handleLessonVideoSelected}
                    onPrevious={() => setCurrentStep(1)}
                    onNext={() => setCurrentStep(3)}
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
                    onPublish={handlePublish}
                    onPrevious={() => setCurrentStep(3)}
                />
            )}
        </section>
    );
};

export default CourseCreationPage;
