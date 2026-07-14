import axiosClient from "./AxiosClient.js";

export const searchCourses = (query) =>
    axiosClient.get("/search", { params: { q: query } }).then((r) => r.data);
