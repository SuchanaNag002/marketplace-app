import apiClient from "../ApiClient";

export const getProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const createProduct = async (product) => {
  const response = await apiClient.post('/products', product, {
    headers: { 'Content-Type': 'multipart/form-data' }, 
  });
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await apiClient.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await apiClient.delete(`/products/${id}`);
};