export const COURSE_DESCRIPTION_MAX_LENGTH = 2000;
export const THUMBNAIL_ACCEPTED_TYPES = "image/png,image/jpeg";

export const isValidUploadFile = (file) => Boolean(file);

export const getCourseCreationIssues = (course, sections) => {
    const issues = [];

    if (!course.title?.trim()) {
        issues.push("Course title is required.");
    }

    if (!course.description?.trim()) {
        issues.push("Course description is required.");
    }

    if (course.description?.length > COURSE_DESCRIPTION_MAX_LENGTH) {
        issues.push(`Course description must be ${COURSE_DESCRIPTION_MAX_LENGTH} characters or fewer.`);
    }

    sections.forEach((section, sectionIndex) => {
        if (!section.title?.trim()) {
            issues.push(`Section ${sectionIndex + 1} needs a title.`);
        }

        section.lessons.forEach((lesson, lessonIndex) => {
            if (!lesson.title?.trim()) {
                issues.push(`Lesson ${lessonIndex + 1} in section ${sectionIndex + 1} needs a title.`);
            }
        });
    });

    return issues;
};
