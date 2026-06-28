import axiosClient from "./AxiosClient.js";

export const checkEnrollment = (courseId) =>
    axiosClient.get("/enrollments/check", { params: { courseId } }).then((r) => r.data.enrolled);
export const getMyEnrolledCoursesApi = async (axiosPrivate, accessToken) => {
  const response = await axiosPrivate.get("/enrollments/my-courses", {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  return response.data;
};
