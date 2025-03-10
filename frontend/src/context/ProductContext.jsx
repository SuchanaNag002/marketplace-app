import React, { createContext, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/ProductsApi";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const addProduct = async (productData) => {
    try {
      setLoading(true);
      const newProduct = await createProduct(productData);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setLoading(false);
      return newProduct;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const editProduct = async (id, productData) => {
    try {
      setLoading(true);
      const updatedProduct = await updateProduct(id, productData);
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === id ? updatedProduct : p))
      );
      setLoading(false);
      return updatedProduct;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const removeProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        addProduct,
        editProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};