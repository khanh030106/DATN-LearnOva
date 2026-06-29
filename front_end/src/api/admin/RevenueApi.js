import axiosClient from "../AxiosClient.js";

export const getAdminTopRevenueCoursesApi = async (
  { page = 0, size = 5 } = {},
  client = axiosClient
) => {
  const response = await client.get("/admin/revenue/top-courses", {
    params: { page, size },
  });
  return response.data;
};

export const getAdminTopEarningInstructorsApi = async (
  { page = 0, size = 5 } = {},
  client = axiosClient
) => {
  const response = await client.get("/admin/revenue/top-instructors", {
    params: { page, size },
  });
  return response.data;
};
