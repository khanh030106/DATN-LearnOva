import api from "../AxiosClient.js";
import axiosClient from "../AxiosClient.js";


export const getMyCourse = async () => {
    const response = await axiosClient.get("/courses/my-courses");
    return response.data;
};

export const getActiveCategories = async () => {
    const response = await axiosClient.get("/courses/categories");
    return response.data;
};

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
    try {
        const response = await api.put(
            `/courses/lessons/${lessonId}/video`,
            payload
        );
        return response.data;
    } catch (error) {
        console.error("Error status:", error.response?.status);;
        throw error;
    }
};

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

export const updateCourseStatus = async (courseId, status) => {
    const response = await api.patch(`/courses/${courseId}/status`, { status });
    return response.data;
};

export const updateCourse = async (courseId, payload) => {
    const response = await api.put(`/courses/${courseId}`, payload);
    return response.data;
};

export const softDeleteCourse = async (courseId) => {
    const response = await api.delete(`/courses/${courseId}`);
    return response.data;
};

export const toggleCourseVisibility = async (courseId) => {
    const response = await api.patch(`/courses/${courseId}/visibility`);
    return response.data;
};

export const getCourseForEdit = async (courseId) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
};

export const getMyStudents = async () => {
    const response = await api.get("/courses/my-students");
    return response.data;
};

export const getFileUrl = async (fileKey) => {
    const response = await api.get("/courses/video-url", { params: { fileKey } });
    return response.data.url;
};

export const getCourseReviews = async (courseId) => {
    const response = await api.get(`/course/${courseId}`);
    return response.data;
};

export const getCourseRatingSummary = async (courseId) => {
    const response = await api.get(`/review/summary/${courseId}`);
    return response.data;
};
