import api from "../AxiosClient.js";

export const getMyPromotions = async () => {
    const response = await api.get("/promotions/my-courses");
    return response.data;
};

export const createPromotion = async (payload) => {
    const response = await api.post("/promotions", payload);
    return response.data;
};

export const updatePromotion = async (promotionId, payload) => {
    const response = await api.put(`/promotions/${promotionId}`, payload);
    return response.data;
};

export const deletePromotion = async (promotionId) => {
    await api.delete(`/promotions/${promotionId}`);
};
