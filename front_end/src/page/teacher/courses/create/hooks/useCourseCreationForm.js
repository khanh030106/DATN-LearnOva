import {useState} from "react";
import {
    createDraftCourse,
    createSection,
    createLesson,
    updateSectionTitle as updateSectionTitleApi,
    updateLessonTitle as updateLessonTitleApi,
} from "../../../../../api/teacher/courseCreation/courseCreationApi.js";

const createEmptyCourse = () => ({
    id: null,
    thumbnailUrl: "",
    thumbnailKey: "",
    title: "",
    description: "",
    language: "",
    level: "",
    category: "",
    basePrice: "",
    status: "DRAFT",
    visibility: "PUBLIC",
    requirements: [""],
    whatYouLearn: [""],
});

const createClientId = () => crypto.randomUUID();

export const useCourseCreationForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [course, setCourse] = useState(createEmptyCourse);
    const [sections, setSections] = useState([]);
    const [activeSectionId, setActiveSectionId] = useState(null);

    const updateCourse = (changes) => {
        setCourse((currentCourse) => ({...currentCourse, ...changes}));
    };

    const updateListItem = (field, index, value) => {
        setCourse((currentCourse) => ({
            ...currentCourse,
            [field]: currentCourse[field].map((item, itemIndex) => (itemIndex === index ? value : item)),
        }));
    };

    const addListItem = (field) => {
        setCourse((currentCourse) => ({
            ...currentCourse, [field]: [...currentCourse[field], ""],
        }));
    };

    const addSection = async () => {
        if (!course.id) {
            alert("Please create course draft first.");
            return;
        }
        const payload = {
            title: "Untitled Section",
            sectionOrder: sections.length + 1,
        };
        const data = await createSection(course.id, payload);
        const nextSection = {
            id: data.sectionId,
            title: payload.title,
            sectionOrder: payload.sectionOrder,
            lessons: [],
        };
        setSections((currentSections) => [...currentSections, nextSection]);
        setActiveSectionId(nextSection.id);
    };

    const deleteSection = (sectionId) => {
        const nextActiveSectionId = sections.find((section) => section.id !== sectionId)?.id ?? null;

        setSections((currentSections) => currentSections
            .filter((section) => section.id !== sectionId)
            .map((section, index) => ({...section, sectionOrder: index + 1})));
        if (activeSectionId === sectionId) {
            setActiveSectionId(nextActiveSectionId);
        }
    };

    const addLesson = async (sectionId) => {
        const targetSection = sections.find(
            (section) => section.id === sectionId
        );
        if (!targetSection) {
            return;
        }
        const payload = {
            title: "Untitled Lesson",
            lessonOrder: targetSection.lessons.length + 1,
            isPreview: false,
        };
        const data = await createLesson(sectionId, payload);
        setSections((currentSections) =>
            currentSections.map((section) => {
                if (section.id !== sectionId) {
                    return section;
                }
                const nextLesson = {
                    id: data.lessonId,
                    title: payload.title,
                    lessonOrder: payload.lessonOrder,
                    isPreview: payload.isPreview,
                    resources: [],
                };
                return {
                    ...section,
                    lessons: [...section.lessons, nextLesson],
                };
            })
        );
    };

    const updateLessonTitle = async (sectionId, lessonId, title) => {
        setSections((currentSections) =>
            currentSections.map((section) => {
                if (section.id !== sectionId) return section;

                return {
                    ...section,
                    lessons: section.lessons.map((lesson) =>
                        lesson.id === lessonId ? { ...lesson, title } : lesson
                    ),
                };
            })
        );
        await updateLessonTitleApi(lessonId, title);
    };

    const updateLessonSource = (sectionId, lessonId, file) => {
        if (!file) {
            return;
        }

        setSections((currentSections) => currentSections.map((section) => {
            if (section.id !== sectionId) {
                return section;
            }
            return {
                ...section,
                lessons: section.lessons.map((lesson) => lesson.id === lessonId ? {
                    ...lesson,
                    sourceName: file.name
                } : lesson),
            };
        }));
    };

    const deleteLesson = (sectionId, lessonId) => {
        setSections((currentSections) => currentSections.map((section) => {
            if (section.id !== sectionId) {
                return section;
            }
            return {
                ...section, lessons: section.lessons
                    .filter((lesson) => lesson.id !== lessonId)
                    .map((lesson, index) => ({...lesson, lessonOrder: index + 1})),
            };
        }));
    };

    const updateSectionTitle = async (sectionId, title) => {
        setSections((currentSections) =>
            currentSections.map((section) =>
                section.id === sectionId ? { ...section, title } : section
            )
        );

        await updateSectionTitleApi(sectionId, title);
    };

    const publishCourse = () => {
        setCourse((currentCourse) => ({...currentCourse, status: "PUBLISHED"}));
    };

    const saveCourseDraft = async () => {
        if (course.id) {
            return course.id;
        }
        const payload = {
            title: course.title,
            description: course.description,
            language: course.language || "vi",
            level: course.level || "Beginner",
            basePrice: course.basePrice || 0,
            requirements: course.requirements.filter(Boolean),
            whatYouLearn: course.whatYouLearn.filter(Boolean),
        };
        const data = await createDraftCourse(payload);
        setCourse((currentCourse) => ({
            ...currentCourse, id: data.courseId,
        }));
        return data.courseId;
    };

    const updateLessonVideo = (sectionId, lessonId, videoData) => {
        setSections((currentSections) =>
            currentSections.map((section) => {
                if (section.id !== sectionId) return section;

                return {
                    ...section,
                    lessons: section.lessons.map((lesson) =>
                        lesson.id === lessonId
                            ? { ...lesson, ...videoData }
                            : lesson
                    ),
                };
            })
        );
    };

    return {
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
        publishCourse,
        saveCourseDraft,
        updateLessonVideo,
    };
};
