import apiClient from "../ApiClient";

export const getOrders = async () => {
  const response = await apiClient.get("/orders");
  return response.data;
};

export const createOrder = async (order) => {
  const response = await apiClient.post("/orders", order);
  return response.data;
};

export const updateOrder = async (orderId, updatedOrderData) => {
  const response = await apiClient.put(`/orders/${orderId}`, updatedOrderData);
  return response.data;
};

export const deleteOrder = async (orderId) => {
  const response = await apiClient.delete(`/orders/${orderId}`);
  return response.data;
};

export const fetchRequestedOrders = async () => {
  const response = await apiClient.get("/orders/requested");
  return response.data;
};