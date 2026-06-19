import axiosClient from "./axiosClient.js";

export const getCurrentUserApi = async (accessToken) => {
    const response = await axiosClient.get("/user/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data;
};