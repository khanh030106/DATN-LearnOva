import axiosClient from "./AxiosClient.js";

export const checkEnrollment = (courseId) =>
    axiosClient.get("/enrollments/check", { params: { courseId } }).then((r) => r.data.enrolled);
