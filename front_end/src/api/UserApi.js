import axiosClient from "./axiosClient.js";

export const getCurrentUserApi = async (accessToken) => {
    const response = await axiosClient.get("/users/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data;
};

export const getAdminUsersApi = async () => {
  const response = await axiosClient.get("/admin/users");
  return response.data;
};