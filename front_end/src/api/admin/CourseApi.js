import axiosClient from "../AxiosClient.js";

export const getAdminCoursesApi = async (client = axiosClient) => {
  const response = await client.get("/admin/courses-management");
  return response.data;
};

export const getAdminCourseByIdApi = async (id, client = axiosClient) => {
  const response = await client.get(`/admin/courses-management/${id}`);
  return response.data;
};

export const createAdminCourseApi = async (payload, client = axiosClient) => {
  const response = await client.post("/admin/courses-management/create", payload);
  return response.data;
};

export const updateAdminCourseApi = async (id, payload, client = axiosClient) => {
  const response = await client.put(`/admin/courses-management/update/${id}`, payload);
  return response.data;
};

export const restoreAdminCourseApi = async (id, client = axiosClient) => {
  const response = await client.put(`/admin/courses-management/restore/${id}`);
  return response.data;
};

export const deleteAdminCourseApi = async (id, client = axiosClient) => {
  const response = await client.delete(`/admin/courses-management/delete/${id}`);
  return response.data;
};
