import axiosClient from "./AxiosClient.js";

export const getAdminCategoriesApi = async () => {
  const response = await axiosClient.get("/admin/categories");
  return response.data;
};

export const updateAdminCategoryApi = async (id, payload) => {
  const response = await axiosClient.put(`/admin/categories/${id}`, payload);
  return response.data;
};
