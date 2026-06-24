import axiosClient from "./AxiosClient.js";

export const getCoursesApi = async () => {
  const response = await axiosClient.get("/courses");
  return response.data;
};
