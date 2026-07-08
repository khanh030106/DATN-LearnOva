import axiosClient from "../AxiosClient.js";

export const getAdminCoursesApi = async (client = axiosClient) => {
  const response = await client.get("/admin/courses-management");
  return response.data;
};

/** Full detail with sections/lessons for view popups and approval pages. */
export const getAdminCourseDetailApi = async (id, client = axiosClient) => {
  const response = await client.get(`/admin/courses-management/${id}/detail`);
  return response.data;
};

/** Approve a DRAFT course and publish it. */
export const approveAdminCourseApi = async (id, client = axiosClient) => {
  const response = await client.patch(`/admin/courses-management/${id}/approve`);
  return response.data;
};

/** Hide a DRAFT course by archiving it. */
export const hideAdminCourseApi = async (id, client = axiosClient) => {
  const response = await client.patch(`/admin/courses-management/${id}/hide`);
  return response.data;
};

