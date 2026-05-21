import axiosClient from "./AxiosClient.js";

export const Login = async (email, password) => {
    const response = await axiosClient.post('/api/learnova/auth/login', {
        email,
        password,
    });

    return response.data;
}