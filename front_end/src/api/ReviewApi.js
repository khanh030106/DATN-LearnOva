import axiosClient from "./axiosClient.js";

export const getCourseReviewsApi = async (courseId) => {
    const response = await axiosClient.get(
        `/course/${courseId}`   //review/course/${courseId}
    );
    return response.data;
};
// update
export const updateReviewApi = async (data) => {
    const response = await axiosClient.put(
        "/review/update",   // /review/update/${courseId}
        data
    );
    return response.data;
};
// DELETE REVIEW
export const deleteReviewApi = async (reviewId) => {
    await axiosClient.delete(
        `/review/delete/${reviewId}`
    );
};
// rating
export const getRatingSummaryApi = async (courseId) => {
    const response = await axiosClient.get(
        `/review/summary/${courseId}`
    );
    return response.data;
};
// CREATE REVIEW
export const createReviewApi = async (data) => {
    const response = await axiosClient.post(
        "/review/post",
        data
    );
    return response.data;
};