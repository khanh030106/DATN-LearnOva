import axiosClient from "../AxiosClient.js";

export const getAdminInstructorsApi = async (client = axiosClient) => {
  const response = await client.get("/admin/instructors-management");
  const data = response.data;
  if (Array.isArray(data)) return data;
  if (data == null) return [];
  return [data];
};

export const getAdminInstructorByIdApi = async (id, client = axiosClient) => {
  const response = await client.get(`/admin/instructors-management/${id}`);
  return response.data;
};

export const createAdminInstructorApi = async (payload, client = axiosClient) => {
  const response = await client.post("/admin/instructors-management/create", payload);
  return response.data;
};

export const updateAdminInstructorApi = async (id, payload, client = axiosClient) => {
  const response = await client.put(`/admin/instructors-management/update/${id}`, payload);
  return response.data;
};

export const deleteAdminInstructorApi = async (id, client = axiosClient) => {
  const response = await client.delete(`/admin/instructors-management/delete/${id}`);
  return response.data;
};