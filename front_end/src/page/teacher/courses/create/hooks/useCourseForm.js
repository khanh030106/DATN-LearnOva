import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    createDraftCourse,
    createLesson,
    createLessonSource,
    createSection,
    updateCourseStatus as updateCourseStatusApi,
    updateLesson,
    updateLessonVideo,
    updateSection
} from "../../../../../api/teacher/CourseApi.js";
import {clearDraft, loadDraft, useDraftPersistence} from "./useDraftPersistence.js";

let tempIdCounter = 0;
const generateTempId = () => `temp_${Date.now()}_${tempIdCounter++}`;

const createEmptyCourse = () => ({
    id: null,
    thumbnailKey: "",
    thumbnailPreviewUrl: "",
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

const restoreFromDraft = () => {
    const draft = loadDraft();
    if (!draft) return null;
    return draft;
};

export const useCourseForm = () => {
    const navigate = useNavigate();
    const savedDraft = restoreFromDraft();

    const [currentStep, setCurrentStep] = useState(savedDraft?.currentStep ?? 1);
    const [course, setCourse] = useState(savedDraft?.course ?? createEmptyCourse);
    const [sections, setSections] = useState(savedDraft?.sections ?? []);
    const [activeSectionId, setActiveSectionId] = useState(
        savedDraft?.sections?.[0]?.id ?? null
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    // Show restore banner once on mount if a draft was found
    useEffect(() => {
        if (savedDraft) {
            toast.info("Draft restored from your last session.", {toastId: "draft-restored"});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Auto-save to sessionStorage on every change
    useDraftPersistence(course, sections, currentStep);

    const markDirty = () => setIsDirty(true);

    const updateCourse = (changes) => {
        setCourse((c) => ({...c, ...changes}));
        markDirty();
    };

    const updateListItem = (field, index, value) => {
        setCourse((c) => ({
            ...c,
            [field]: c[field].map((item, i) => (i === index ? value : item)),
        }));
        markDirty();
    };

    const addListItem = (field) => {
        setCourse((c) => ({...c, [field]: [...c[field], ""]}));
        markDirty();
    };

    const addSection = () => {
        if (!course.id) {
            toast.error("Please save the course draft first.");
            return;
        }
        const tempId = generateTempId();
        setSections((s) => [
            ...s,
            {id: tempId, title: "", sectionOrder: s.length + 1, lessons: [], isNew: true},
        ]);
        setActiveSectionId(tempId);
        markDirty();
    };

    const deleteSection = (sectionId) => {
        const nextActive = sections.find((s) => s.id !== sectionId)?.id ?? null;
        setSections((s) =>
            s.filter((sec) => sec.id !== sectionId)
             .map((sec, i) => ({...sec, sectionOrder: i + 1}))
        );
        if (activeSectionId === sectionId) setActiveSectionId(nextActive);
        markDirty();
    };

    const addLesson = (sectionId) => {
        const target = sections.find((s) => s.id === sectionId);
        if (!target) return;
        const tempId = generateTempId();
        setSections((s) =>
            s.map((sec) => {
                if (sec.id !== sectionId) return sec;
                return {
                    ...sec,
                    lessons: [
                        ...sec.lessons,
                        {id: tempId, title: "", lessonOrder: sec.lessons.length + 1, type: "Video", isPreview: false, resources: [], isNew: true},
                    ],
                };
            })
        );
        markDirty();
    };

    const deleteLesson = (sectionId, lessonId) => {
        setSections((s) =>
            s.map((sec) => {
                if (sec.id !== sectionId) return sec;
                return {
                    ...sec,
                    lessons: sec.lessons
                        .filter((l) => l.id !== lessonId)
                        .map((l, i) => ({...l, lessonOrder: i + 1})),
                };
            })
        );
        markDirty();
    };

    const updateSectionTitle = (sectionId, title) => {
        setSections((s) =>
            s.map((sec) => (sec.id === sectionId ? {...sec, title} : sec))
        );
        markDirty();
    };

    const updateLessonTitle = (sectionId, lessonId, title) => {
        setSections((s) =>
            s.map((sec) => {
                if (sec.id !== sectionId) return sec;
                return {
                    ...sec,
                    lessons: sec.lessons.map((l) => (l.id === lessonId ? {...l, title} : l)),
                };
            })
        );
        markDirty();
    };

    const updateLessonType = (sectionId, lessonId, type) => {
        setSections((s) =>
            s.map((sec) => {
                if (sec.id !== sectionId) return sec;
                return {
                    ...sec,
                    lessons: sec.lessons.map((l) => (l.id === lessonId ? {...l, type} : l)),
                };
            })
        );
    };

    const updateLessonSource = (sectionId, lessonId, source) => {
        setSections((s) =>
            s.map((sec) => {
                if (sec.id !== sectionId) return sec;
                return {
                    ...sec,
                    lessons: sec.lessons.map((l) =>
                        l.id === lessonId ? {...l, sourceKey: source.key, sourceName: source.name} : l
                    ),
                };
            })
        );
        markDirty();
    };

    const setLessonVideo = (sectionId, lessonId, video) => {
        setSections((s) =>
            s.map((sec) => {
                if (sec.id !== sectionId) return sec;
                return {
                    ...sec,
                    lessons: sec.lessons.map((l) =>
                        l.id === lessonId
                            ? {
                                ...l,
                                videoKey: video.key,
                                videoName: video.name,
                                videoContentType: video.contentType,
                                videoSizeBytes: video.sizeBytes,
                                durationSeconds: video.durationSeconds,
                              }
                            : l
                    ),
                };
            })
        );
        markDirty();
    };

    const updateLessonResources = (sectionId, lessonId, resources) => {
        setSections((s) =>
            s.map((sec) => {
                if (sec.id !== sectionId) return sec;
                return {
                    ...sec,
                    lessons: sec.lessons.map((l) =>
                        l.id === lessonId
                            ? {...l, resources: [...(l.resources || []), ...resources]}
                            : l
                    ),
                };
            })
        );
        markDirty();
    };

    const removeLessonResource = (sectionId, lessonId, resourceIndex) => {
        setSections((s) =>
            s.map((sec) => {
                if (sec.id !== sectionId) return sec;
                return {
                    ...sec,
                    lessons: sec.lessons.map((l) =>
                        l.id === lessonId
                            ? {...l, resources: l.resources.filter((_, i) => i !== resourceIndex)}
                            : l
                    ),
                };
            })
        );
        markDirty();
    };

    const reorderSections = (newOrder) => {
        setSections(newOrder.map((sec, i) => ({...sec, sectionOrder: i + 1})));
        markDirty();
    };

    const reorderLessons = (sectionId, newOrder) => {
        setSections((s) =>
            s.map((sec) =>
                sec.id === sectionId
                    ? {...sec, lessons: newOrder.map((l, i) => ({...l, lessonOrder: i + 1}))}
                    : sec
            )
        );
        markDirty();
    };

    const removeThumbnail = () => {
        setCourse((c) => ({...c, thumbnailKey: "", thumbnailPreviewUrl: ""}));
        markDirty();
    };

    const saveCourseDraft = async () => {
        if (course.id) return course.id;

        const payload = {
            title: course.title,
            description: course.description,
            language: course.language || "vi",
            level: course.level || "Beginner",
            basePrice: Number(course.basePrice) || 0,
            thumbnailKey: course.thumbnailKey,
            requirements: course.requirements.filter(Boolean),
            whatYouLearn: course.whatYouLearn.filter(Boolean),
            categoryId: course.category ? Number(course.category) : null,
        };

        const data = await createDraftCourse(payload);
        setCourse((c) => ({...c, id: data.courseId}));
        return data.courseId;
    };

    const saveSectionsAndLessons = async () => {
        for (const section of sections) {
            let actualSectionId = section.id;

            if (section.isNew) {
                const sectionData = await createSection(course.id, {
                    title: section.title || "Untitled Section",
                    sectionOrder: section.sectionOrder,
                });
                actualSectionId = sectionData.sectionId;
            } else if (section.title) {
                await updateSection(section.id, {title: section.title});
            }

            for (const lesson of section.lessons) {
                let actualLessonId = lesson.id;

                if (lesson.isNew) {
                    const lessonData = await createLesson(actualSectionId, {
                        title: lesson.title || "Untitled Lesson",
                        lessonOrder: lesson.lessonOrder,
                        isPreview: lesson.isPreview || false,
                    });
                    actualLessonId = lessonData.lessonId;

                    setSections((s) =>
                        s.map((sec) => {
                            if (sec.id !== section.id) return sec;
                            return {
                                ...sec,
                                id: actualSectionId,
                                isNew: false,
                                lessons: sec.lessons.map((l) =>
                                    l.id === lesson.id ? {...l, id: actualLessonId, isNew: false} : l
                                ),
                            };
                        })
                    );
                } else if (lesson.title) {
                    await updateLesson(lesson.id, {title: lesson.title});
                }

                if (lesson.videoKey) {
                    await updateLessonVideo(actualLessonId, {
                        videoKey: lesson.videoKey,
                        videoOriginalFilename: lesson.videoName,
                        videoContentType: lesson.videoContentType,
                        videoSizeBytes: lesson.videoSizeBytes,
                        durationSeconds: lesson.durationSeconds || null,
                    });
                }

                if (lesson.resources?.length > 0) {
                    for (const resource of lesson.resources) {
                        try {
                            await createLessonSource(actualLessonId, {
                                fileKey: resource.fileKey,
                                originalFileName: resource.fileName,
                                contentType: resource.fileType || null,
                                fileSizeBytes: resource.fileSize || null,
                                resourceType: "Resources",
                            });
                        } catch (err) {
                            console.error("Failed to save resource:", resource.fileName, err);
                        }
                    }
                }
            }
        }
    };

    const handleCourseInfoNext = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            await saveCourseDraft();
            setIsDirty(false);
            clearDraft();
            setCurrentStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to save course draft");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSectionsNext = async () => {
        if (isSubmitting) return;

        const emptySections = sections.filter((s) => !s.title?.trim());
        if (emptySections.length > 0) {
            toast.error("Please enter titles for all sections before proceeding.");
            return;
        }

        for (const section of sections) {
            const emptyLessons = section.lessons.filter((l) => !l.title?.trim());
            if (emptyLessons.length > 0) {
                toast.error(`Please enter titles for all lessons in "${section.title}" before proceeding.`);
                return;
            }
        }

        setIsSubmitting(true);
        try {
            await saveSectionsAndLessons();
            setIsDirty(false);
            clearDraft();
            setCurrentStep(3);
        } catch (error) {
            let message = "Failed to save sections and lessons";
            if (error.response?.status === 403) message = "Access denied. Please log in again.";
            else if (error.response?.status === 401) message = "Session expired. Please log in again.";
            else if (error.response?.data?.message) message = error.response.data.message;
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveDraft = async () => {
        if (isSubmitting) return;
        if (course.id) {
            toast.info("Draft is already saved in the cloud.");
            return;
        }
        setIsSubmitting(true);
        try {
            await toast.promise(saveCourseDraft(), {
                pending: "Saving draft...",
                success: "Draft saved!",
                error: {render: ({data}) => data?.response?.data?.message || data?.message || "Failed to save draft"},
            });
            setIsDirty(false);
            clearDraft();
            navigate("/learnova/teacher/courses");
        } catch {
            // handled by toast.promise
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePublish = async () => {
        if (isSubmitting) return;
        if (!course.id) {
            toast.error("Save the course draft before publishing.");
            return;
        }
        setIsSubmitting(true);
        try {
            await toast.promise(updateCourseStatusApi(course.id, course.status), {
                pending: "Updating course status...",
                success: course.status === "PUBLISHED" ? "Course published!" : "Status updated!",
                error: {render: ({data}) => data?.response?.data?.message || "Failed to update status"},
            });
            setIsDirty(false);
            clearDraft();
            navigate("/learnova/teacher/courses");
        } catch {
            // handled by toast.promise
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        currentStep,
        setCurrentStep,
        course,
        sections,
        activeSectionId,
        setActiveSectionId,
        isSubmitting,
        isDirty,
        updateCourse,
        updateListItem,
        addListItem,
        addSection,
        deleteSection,
        addLesson,
        deleteLesson,
        updateSectionTitle,
        updateLessonTitle,
        updateLessonType,
        updateLessonSource,
        setLessonVideo,
        updateLessonResources,
        removeLessonResource,
        reorderSections,
        reorderLessons,
        removeThumbnail,
        saveCourseDraft,
        handleCourseInfoNext,
        handleSectionsNext,
        handleSaveDraft,
        handlePublish,
    };
};
