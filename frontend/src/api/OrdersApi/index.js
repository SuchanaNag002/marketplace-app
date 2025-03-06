import apiClient from "../ApiClient";

export const getOrders = async () => {
  const response = await apiClient.get('/orders');
  return response.data;
};

export const createOrder = async (order) => {
  const response = await apiClient.post('/orders', order);
  return response.data;
};