import axiosClient from "./AxiosClient.js";

export const getCurrentUserApi = async (accessToken) => {
    const response = await axiosClient.get("/user/me", {
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
export const createUserApi = async (payload, client = axiosClient) => {
  const response = await client.post("/admin/create/users", payload);
  return response.data;
};

export const updateUserApi = async (id, payload) => {
  const response = await axiosClient.put(`/admin/update/users/${id}`, payload);
  return response.data;
};

export const deleteUserApi = async (id) => {
  const response = await axiosClient.delete(`/admin/delete/users/${id}`);
  return response.data;
};
