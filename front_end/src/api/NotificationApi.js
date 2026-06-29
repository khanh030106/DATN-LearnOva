import axiosClient from "./AxiosClient.js";

export const getNotificationsApi = async () => {
  const response = await axiosClient.get("/user/notifications");
  return response.data;
};

export const getUnreadCountApi = async () => {
  const response = await axiosClient.get("/user/notifications/unread-count");
  return response.data;
};

export const markAsReadApi = async (notificationId) => {
  await axiosClient.put(`/user/notifications/${notificationId}/read`);
};

export const createNotificationApi = async (data) => {
  const response = await axiosClient.post("/notification/create", data);
  return response.data;
};
