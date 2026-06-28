export const getMyEnrolledCoursesApi = async (axiosPrivate, accessToken) => {
  const response = await axiosPrivate.get("/enrollments/my-courses", {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  return response.data;
};
