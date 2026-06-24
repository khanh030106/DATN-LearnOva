import {useState} from "react";
import {
    createDraftCourse,
    createLesson,
    createLessonSource,
    createSection,
    updateLesson,
    updateLessonVideo,
    updateSection
} from "../../../../../api/teacher/CourseApi.js";

// Helper to generate temporary IDs
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


export const useCourseForm = () => {
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

    // Add section with temporary ID (no API call yet)
    const addSection = () => {
        if (!course.id) {
            alert("Please create course draft first.");
            return;
        }

        const tempId = generateTempId();
        const nextSection = {
            id: tempId,
            title: "",
            sectionOrder: sections.length + 1,
            lessons: [],
            isNew: true, // Flag to identify unsaved sections
        };

        setSections((currentSections) => [...currentSections, nextSection]);
        setActiveSectionId(tempId);
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

    // Add lesson with temporary ID (no API call yet)
    const addLesson = (sectionId) => {
        const targetSection = sections.find(
            (section) => section.id === sectionId
        );
        if (!targetSection) {
            return;
        }

        const tempId = generateTempId();
        const nextLesson = {
            id: tempId,
            title: "",
            lessonOrder: targetSection.lessons.length + 1,
            isPreview: false,
            resources: [],
            isNew: true, // Flag to identify unsaved lessons
        };

        setSections((currentSections) =>
            currentSections.map((section) => {
                if (section.id !== sectionId) {
                    return section;
                }
                return {
                    ...section,
                    lessons: [...section.lessons, nextLesson],
                };
            })
        );
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


    const saveCourseDraft = async () => {
        if (course.id) {
            return course.id;
        }
        const payload = {
            title: course.title,
            description: course.description,
            language: course.language || "vi",
            level: course.level || "Beginner",
            basePrice: Number(course.basePrice) || 0,
            thumbnailKey: course.thumbnailKey,
            requirements: course.requirements.filter(Boolean),
            whatYouLearn: course.whatYouLearn.filter(Boolean),
        };

        const data = await createDraftCourse(payload);

        setCourse((currentCourse) => ({
            ...currentCourse,
            id: data.courseId,
        }));

        console.log("Course created:", data.courseId);

        return data.courseId;
    };

    const handleCourseInfoNext = async () => {
        try {
            await saveCourseDraft();
            setCurrentStep(2);

        } catch (error) {
            console.error(error);
            alert(error.message || "Failed to create course draft");
        }
    };

    // Save all sections and lessons to database
    const saveSectionsAndLessons = async () => {
        console.log("Starting to save sections and lessons...");
        console.log("Course ID:", course.id);
        console.log("Sections:", sections);

        try {
            // Process each section
            for (const section of sections) {
                let actualSectionId = section.id;

                console.log(`Processing section: ${section.title} (ID: ${section.id}, isNew: ${section.isNew})`);

                // If section is new (has temp ID), create it
                if (section.isNew) {
                    const sectionPayload = {
                        title: section.title || "Untitled Section",
                        sectionOrder: section.sectionOrder,
                    };
                    console.log("Creating new section with payload:", sectionPayload);
                    const sectionData = await createSection(course.id, sectionPayload);
                    actualSectionId = sectionData.sectionId;
                    console.log("Section created with ID:", actualSectionId);
                } else if (section.title) {
                    // Update existing section if title changed
                    console.log("Updating existing section:", section.id);
                    await updateSection(section.id, { title: section.title });
                }

                // Process lessons for this section
                for (const lesson of section.lessons) {
                    console.log(`Processing lesson: ${lesson.title} (ID: ${lesson.id}, isNew: ${lesson.isNew})`);

                    let actualLessonId = lesson.id;

                    if (lesson.isNew) {
                        const lessonPayload = {
                            title: lesson.title || "Untitled Lesson",
                            lessonOrder: lesson.lessonOrder,
                            isPreview: lesson.isPreview || false,
                        };
                        console.log("Creating new lesson with payload:", lessonPayload);
                        const lessonData = await createLesson(actualSectionId, lessonPayload);
                        actualLessonId = lessonData.lessonId;
                        console.log("Lesson created with ID:", actualLessonId);

                        // Update local state with real IDs
                        setSections((currentSections) =>
                            currentSections.map((s) => {
                                if (s.id === section.id) {
                                    return {
                                        ...s,
                                        id: actualSectionId,
                                        isNew: false,
                                        lessons: s.lessons.map((l) => {
                                            if (l.id === lesson.id) {
                                                return {
                                                    ...l,
                                                    id: actualLessonId,
                                                    isNew: false,
                                                };
                                            }
                                            return l;
                                        }),
                                    };
                                }
                                return s;
                            })
                        );
                    } else if (lesson.title) {
                        // Update existing lesson if title changed
                        console.log("Updating existing lesson:", lesson.id);
                        await updateLesson(lesson.id, { title: lesson.title });
                    }

                    // Save video metadata if exists
                    if (lesson.videoKey) {
                        console.log("=== VIDEO METADATA DEBUG ===");
                        console.log("Lesson ID:", actualLessonId);
                        console.log("Video Key:", lesson.videoKey);
                        console.log("Video Name:", lesson.videoName);
                        console.log("Video Content Type:", lesson.videoContentType);
                        console.log("Video Size Bytes:", lesson.videoSizeBytes);
                        console.log("Duration Seconds:", lesson.durationSeconds);

                        const videoPayload = {
                            videoKey: lesson.videoKey,
                            videoOriginalFilename: lesson.videoName,
                            videoContentType: lesson.videoContentType,
                            videoSizeBytes: lesson.videoSizeBytes,
                            durationSeconds: lesson.durationSeconds || null,
                        };

                        console.log("Video Payload to send:", videoPayload);
                        console.log("🔵 About to call updateLessonVideo API with lessonId:", actualLessonId);

                        const result = await updateLessonVideo(actualLessonId, videoPayload);
                        console.log("🟢 Video metadata API response:", result);
                        console.log("✅ Video metadata saved successfully");
                    } else {
                        console.log("⚠️ No video key found for lesson:", actualLessonId);
                    }

                    // Save lesson resources (documents, files)
                    if (lesson.resources && lesson.resources.length > 0) {
                        console.log("=== RESOURCES DEBUG ===");
                        console.log(`Processing ${lesson.resources.length} resources for lesson:`, actualLessonId);
                        console.log("Resources array:", JSON.stringify(lesson.resources, null, 2));

                        for (let i = 0; i < lesson.resources.length; i++) {
                            const resource = lesson.resources[i];
                            console.log(`\n--- Resource ${i + 1} ---`);
                            console.log("File Key:", resource.fileKey);
                            console.log("File Name:", resource.fileName);
                            console.log("Content Type:", resource.fileType);
                            console.log("File Size:", resource.fileSize);

                            const resourcePayload = {
                                fileKey: resource.fileKey,
                                originalFileName: resource.fileName,
                                contentType: resource.fileType || null,
                                fileSizeBytes: resource.fileSize || null,
                                resourceType: "Resources",
                            };

                            console.log("Resource Payload to send:", resourcePayload);

                            try {
                                const result = await createLessonSource(actualLessonId, resourcePayload);
                                console.log(`✅ Resource ${i + 1} saved successfully:`, result);
                            } catch (error) {
                                console.error(`❌ Failed to save resource ${i + 1}:`, error);
                                console.error("Error response:", error.response?.data);
                            }
                        }
                    } else {
                        console.log("No resources found for lesson:", actualLessonId);
                    }
                }
            }

            console.log("All sections and lessons saved successfully");
        } catch (error) {
            console.error("Failed to save sections/lessons:", error);
            console.error("Error details:", error.response?.data);
            throw error;
        }
    };

    const handleSectionsNext = async () => {
        try {
            // Validate that sections have titles
            const emptySections = sections.filter((s) => !s.title || s.title.trim() === "");
            if (emptySections.length > 0) {
                alert("Please enter titles for all sections before proceeding.");
                return;
            }

            // Validate that lessons have titles
            for (const section of sections) {
                const emptyLessons = section.lessons.filter((l) => !l.title || l.title.trim() === "");
                if (emptyLessons.length > 0) {
                    alert(`Please enter titles for all lessons in "${section.title}" before proceeding.`);
                    return;
                }
            }

            await saveSectionsAndLessons();

            setCurrentStep(3);
        } catch (error) {
            console.error("Full error:", error);
            console.error("Error response:", error.response?.data);
            console.error("Error status:", error.response?.status);

            let errorMessage = "Failed to save sections and lessons";
            if (error.response?.status === 403) {
                errorMessage = "Access denied. Please login again.";
            } else if (error.response?.status === 401) {
                errorMessage = "Session expired. Please login again.";
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            alert(errorMessage);
        }
    };

    const updateSectionTitle = (sectionId, title) => {
        // Only update local state
        setSections((currentSections) =>
            currentSections.map((section) => {
                if (section.id !== sectionId) {
                    return section;
                }
                return {
                    ...section,
                    title: title,
                };
            })
        );
    };

    const updateLessonTitle = (sectionId, lessonId, title) => {
        // Only update local state
        setSections((currentSections) =>
            currentSections.map((section) => {
                if (section.id !== sectionId) {
                    return section;
                }
                return {
                    ...section,
                    lessons: section.lessons.map((lesson) => {
                        if (lesson.id !== lessonId) {
                            return lesson;
                        }
                        return {
                            ...lesson,
                            title: title,
                        };
                    }),
                };
            })
        );
    };

    const updateLessonSource = (sectionId, lessonId, source) => {
        setSections((currentSections) =>
            currentSections.map((section) => {
                if (section.id !== sectionId) {
                    return section;
                }
                return {
                    ...section,
                    lessons: section.lessons.map((lesson) => {
                        if (lesson.id !== lessonId) {
                            return lesson;
                        }
                        return {
                            ...lesson,
                            sourceKey: source.key,
                            sourceName: source.name,
                        };
                    }),
                };
            })
        );
    };

    const setLessonVideo = (sectionId, lessonId, video) => {
        setSections((currentSections) =>
            currentSections.map((section) => {
                if (section.id !== sectionId) {
                    return section;
                }
                return {
                    ...section,
                    lessons: section.lessons.map((lesson) => {
                        if (lesson.id !== lessonId) {
                            return lesson;
                        }
                        return {
                            ...lesson,
                            videoKey: video.key,
                            videoName: video.name,
                            videoContentType: video.contentType,
                            videoSizeBytes: video.sizeBytes,
                            durationSeconds: video.durationSeconds,
                        };
                    }),
                };
            })
        );
    };

    const updateLessonResources = (sectionId, lessonId, resources) => {
        setSections((currentSections) =>
            currentSections.map((section) => {
                if (section.id !== sectionId) {
                    return section;
                }
                return {
                    ...section,
                    lessons: section.lessons.map((lesson) => {
                        if (lesson.id !== lessonId) {
                            return lesson;
                        }
                        // Append new resources to existing ones
                        const existingResources = lesson.resources || [];
                        return {
                            ...lesson,
                            resources: [...existingResources, ...resources],
                        };
                    }),
                };
            })
        );
    };

    const removeLessonResource = (sectionId, lessonId, resourceIndex) => {
        setSections((currentSections) =>
            currentSections.map((section) => {
                if (section.id !== sectionId) {
                    return section;
                }
                return {
                    ...section,
                    lessons: section.lessons.map((lesson) => {
                        if (lesson.id !== lessonId) {
                            return lesson;
                        }
                        return {
                            ...lesson,
                            resources: lesson.resources.filter((_, index) => index !== resourceIndex),
                        };
                    }),
                };
            })
        );
    };

    const publishCourse = (status = "PUBLISHED") => {
        setCourse((currentCourse) => ({...currentCourse, status}));
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
        deleteLesson,
        updateSectionTitle,
        updateLessonTitle,
        updateLessonSource,
        setLessonVideo,
        updateLessonResources,
        removeLessonResource,
        publishCourse,
        saveCourseDraft,
        handleCourseInfoNext,
        handleSectionsNext,
        saveSectionsAndLessons,
    };
};
