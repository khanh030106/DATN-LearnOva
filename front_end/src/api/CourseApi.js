import axiosClient from "./AxiosClient.js";

export const getCoursesApi = async () => {
  const response = await axiosClient.get("/courses");
  return response.data;
};

export const getCourseByIdApi = async (id) => {
  // admin endpoint is available and returns course detail
  const response = await axiosClient.get(`/admin/courses-management/${id}`);
  return response.data;
};
