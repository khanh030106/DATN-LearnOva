import axiosClient from "./axiosClient";

export const getLessonQAApi = async (lessonId) => {
    const res = await axiosClient.get(`/qna/lesson/${lessonId}`);
    return res.data;
};
export const createQuestionApi = async (data) => {
    const res = await axiosClient.post("/qna/question", data);
    return res.data;
};
export const createAnswerApi = async (data) => {
    const res = await axiosClient.post("/qna/answer", data);
    return res.data;
};