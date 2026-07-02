export const createPaymentApi = async (axiosPrivate, payload, accessToken) => {
  const response = await axiosPrivate.post("/payments/create", payload, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  return response.data;
};

export const getPaymentStatusApi = async (axiosPrivate, orderId, accessToken) => {
  const response = await axiosPrivate.get(`/payments/status/${orderId}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  return response.data;
};
