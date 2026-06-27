import axiosClient from "./axiosClient.js";

export const getCurrentUserApi = async () => {
    const response = await axiosClient.get("/user/me");

    return response.data;
};