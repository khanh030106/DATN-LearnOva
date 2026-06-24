import axiosClient from "./axiosClient.js";


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
export const registerApi = async (data) => {
    const response = await axiosClient.post("/auth/register", data);
    return response.data;
};
export const resendVerifyEmailApi = async (email) => {
    const res = await axiosClient.post("/auth/resend-verification", {
        email
    });
    return res.data;
};


