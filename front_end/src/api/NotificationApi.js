import axiosClient from "./AxiosClient.js";

export const getMyNotificationsApi = async (page = 0, size = 20, client = axiosClient) => {
  const response = await client.get("/notifications", { params: { page, size } });
  return response.data;
};

export const getUnreadCountApi = async (client = axiosClient) => {
  const response = await client.get("/notifications/unread-count");
  return response.data;
};

export const markNotificationReadApi = async (id, client = axiosClient) => {
  const response = await client.patch(`/notifications/${id}/read`);
  return response.data;
};

export const markAllNotificationsReadApi = async (client = axiosClient) => {
  const response = await client.patch("/notifications/read-all");
  return response.data;
};
