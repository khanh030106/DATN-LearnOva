import axiosClient from "./AxiosClient.js";

export const getWishlistApi = async () => {
  const response = await axiosClient.get("/user/wishlist");
  return response.data;
};

export const addToWishlistApi = async (courseId) => {
  await axiosClient.post(`/user/wishlist/${courseId}`);
};

export const removeFromWishlistApi = async (courseId) => {
  await axiosClient.delete(`/user/wishlist/${courseId}`);
};
