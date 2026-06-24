import axiosClient from "./AxiosClient.js";

export const getInstructorsApi = async () => {
  const response = await axiosClient.get("/instructors");
  return response.data;
};
