import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductComponent/ProductCard';
import ProductForm from '../components/ProductComponent/ProductForm';
import Button from '../components/ui/Button';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';
import { UserContext } from '../context/UserContext';

const SellerDashboard = ({ onLogout }) => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const allProducts = await getProducts();
      // Filter products created by this seller using sellerId field
      const sellerProducts = allProducts.filter(product => product.sellerId === user.id);
      setProducts(sellerProducts);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (productData) => {
    try {
      const newProduct = await createProduct({ ...productData, sellerId: user.id });
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (updatedData) => {
    try {
      const updatedProduct = await updateProduct(editingProduct.id, updatedData);
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      await deleteProduct(product.id);
      setProducts(products.filter(p => p.id !== product.id));
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <Button onClick={onLogout}>Logout</Button>
      </div>
      <div className="mb-4">
        {editingProduct ? (
          <ProductForm onSubmit={handleUpdateProduct} product={editingProduct} />
        ) : (
          <ProductForm onSubmit={handleAddProduct} />
        )}
      </div>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
