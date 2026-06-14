import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import courseImage from "../../../../assets/course/course-1.jpg";
import CourseCreationStepper from "./components/CourseCreationStepper.jsx";
import CourseInfoStep from "./components/CourseInfoStep.jsx";
import PreviewStep from "./components/PreviewStep.jsx";
import PublishStep from "./components/PublishStep.jsx";
import SectionsStep from "./components/SectionsStep.jsx";
import "./CourseCreationPage.css";

const initialCourse = {
  thumbnailUrl: courseImage,
  title: "Eastern Philosophy: From Taoism to Buddhism",
  slug: "eastern-philosophy-taoism-buddhism",
  subtitle: "A comprehensive journey through ancient wisdom and modern practice.",
  description: "",
  language: "English",
  level: "Beginner",
  category: "Philosophy",
  basePrice: 1199000,
  status: "DRAFT",
  visibility: "PUBLIC",
  requirements: ["Basic reading habit", "Interest in humanities"],
  whatYouLearn: ["Compare Eastern philosophy traditions", "Apply ancient wisdom to modern practice"],
};

const initialSections = [
  {
    id: 1,
    title: "Introduction",
    sectionOrder: 1,
    lessons: [
      { id: 101, lessonOrder: 1, title: "Welcome to the Course", type: "Video", duration: "05:32" },
      { id: 102, lessonOrder: 2, title: "Course Overview", type: "Article", duration: "03:15" },
      { id: 103, lessonOrder: 3, title: "Introduction Quiz", type: "Quiz", duration: "5 Questions" },
    ],
  },
  { id: 2, title: "Core Concepts", sectionOrder: 2, lessons: Array.from({ length: 5 }, (_, index) => ({ id: 200 + index, lessonOrder: index + 1, title: `Core Concept ${index + 1}`, type: "Video", duration: "08:20" })) },
  { id: 3, title: "Practical Applications", sectionOrder: 3, lessons: Array.from({ length: 4 }, (_, index) => ({ id: 300 + index, lessonOrder: index + 1, title: `Practice Lesson ${index + 1}`, type: "Article", duration: "06:10" })) },
  { id: 4, title: "Advanced Topics", sectionOrder: 4, lessons: Array.from({ length: 3 }, (_, index) => ({ id: 400 + index, lessonOrder: index + 1, title: `Advanced Topic ${index + 1}`, type: "Video", duration: "09:45" })) },
  { id: 5, title: "Conclusion", sectionOrder: 5, lessons: Array.from({ length: 2 }, (_, index) => ({ id: 500 + index, lessonOrder: index + 1, title: `Conclusion ${index + 1}`, type: "Article", duration: "04:30" })) },
];

const CourseCreationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [course, setCourse] = useState(initialCourse);
  const [sections, setSections] = useState(initialSections);
  const [activeSectionId, setActiveSectionId] = useState(1);
  const [previewDevice, setPreviewDevice] = useState("Desktop");

  const updateCourse = (changes) => {
    setCourse((currentCourse) => ({ ...currentCourse, ...changes }));
  };

  const updateListItem = (field, index, value) => {
    setCourse((currentCourse) => ({
      ...currentCourse,
      [field]: currentCourse[field].map((item, itemIndex) => (itemIndex === index ? value : item)),
    }));
  };

  const addListItem = (field) => {
    setCourse((currentCourse) => ({
      ...currentCourse,
      [field]: [...currentCourse[field], ""],
    }));
  };

  const addSection = () => {
    const nextSectionOrder = sections.length + 1;
    const nextSection = {
      id: Date.now(),
      title: `Section ${nextSectionOrder}`,
      sectionOrder: nextSectionOrder,
      lessons: [],
    };

    setSections((currentSections) => [...currentSections, nextSection]);
    setActiveSectionId(nextSection.id);
  };

  const updateSectionTitle = (sectionId, title) => {
    setSections((currentSections) =>
      currentSections.map((section) => (section.id === sectionId ? { ...section, title } : section))
    );
  };

  const publishCourse = () => {
    setCourse((currentCourse) => ({ ...currentCourse, status: "PUBLISHED" }));
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
          onCancel={() => navigate("/learnova/teacher/courses")}
          onNext={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 2 && (
        <SectionsStep
          sections={sections}
          activeSectionId={activeSectionId}
          onSelectSection={setActiveSectionId}
          onAddSection={addSection}
          onSectionTitleChange={updateSectionTitle}
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
          status={course.status}
          visibility={course.visibility}
          onStatusChange={(status) => updateCourse({ status })}
          onVisibilityChange={(visibility) => updateCourse({ visibility })}
          onPublish={publishCourse}
          onPrevious={() => setCurrentStep(3)}
        />
      )}
    </section>
  );
};

export default CourseCreationPage;
