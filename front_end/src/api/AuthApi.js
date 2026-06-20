import axiosClient from "./AxiosClient.js";

export const loginApi = async (email, password, rememberMe) => {
    const response = await axiosClient.post("/auth/login", {
        email,
        password,
        rememberMe
    });

    return response.data;
};

export const refreshApi = async () => {
    const response = await axiosClient.post("/auth/refresh");
    return response.data;
};

export const logoutApi = async () => {
    await axiosClient.post("/auth/logout");
};



