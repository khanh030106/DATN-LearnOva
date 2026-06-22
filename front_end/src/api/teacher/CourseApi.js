import api from "../AxiosClient.js";

export const createDraftCourse = async (payload) => {

    const response = await api.post(
        "/courses/create-draft-course",
        payload
    );

    return response.data;
};

export const createSection = async (courseId, payload) => {
    const response = await api.post(
        `/courses/${courseId}/sections`,
        payload
    );

    return response.data;
};

export const updateSection = async (sectionId, payload) => {
    const response = await api.put(
        `/courses/sections/${sectionId}`,
        payload
    );

    return response.data;
};

export const createLesson = async (sectionId, payload) => {
    const response = await api.post(
        `/courses/sections/${sectionId}/lessons`,
        payload
    );

    return response.data;
};

export const updateLesson = async (lessonId, payload) => {
    const response = await api.put(
        `/courses/lessons/${lessonId}`,
        payload
    );

    return response.data;
};

export const updateLessonVideo = async (lessonId, payload) => {
    console.log("🔵 API CALL - updateLessonVideo");
    console.log("URL:", `/courses/lessons/${lessonId}/video`);
    console.log("Payload:", JSON.stringify(payload, null, 2));
    
    try {
        const response = await api.put(
            `/courses/lessons/${lessonId}/video`,
            payload
        );

        console.log("🟢 API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("🔴 API Error - updateLessonVideo failed");
        console.error("Error status:", error.response?.status);
        console.error("Error data:", error.response?.data);
        console.error("Full error:", error);
        throw error;
    }
};

// Lesson Source APIs
export const createLessonSource = async (lessonId, payload) => {
    const response = await api.post(
        `/courses/lessons/${lessonId}/sources`,
        payload
    );

    return response.data;
};

export const getLessonSources = async (lessonId) => {
    const response = await api.get(
        `/courses/lessons/${lessonId}/sources`
    );

    return response.data;
};

export const deleteLessonSource = async (sourceId) => {
    const response = await api.delete(
        `/courses/lessons/sources/${sourceId}`
    );

    return response.data;
};
