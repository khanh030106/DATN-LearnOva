import axiosClient from "../AxiosClient.js";

export const getTeacherDashboard = async () => {
  const response = await axiosClient.get("/teacher/dashboard");
  return response.data;
};
