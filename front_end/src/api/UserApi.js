import axiosClient from "./AxiosClient.js";

export const getCurrentUserApi = async () => {
    const response = await axiosClient.get("/user/me");


    return response.data;
};
