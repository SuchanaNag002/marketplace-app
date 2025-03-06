import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductComponent/ProductCard';
import Button from '../components/ui/Button';
import { getProducts } from '../api/productApi';
import { createOrder } from '../api/orderApi';

const BuyerDashboard = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [orderMessage, setOrderMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const allProducts = await getProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePlaceOrder = async (product) => {
    try {
      await createOrder({ productId: product.id });
      setOrderMessage(`Order placed for ${product.name}`);
      setTimeout(() => {
        setOrderMessage("");
      }, 3000);
    } catch (error) {
      console.error('Error placing order', error);
      setOrderMessage("Error placing order");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <Button onClick={onLogout}>Logout</Button>
      </div>
      {orderMessage && (
        <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
          {orderMessage}
        </div>
      )}
      <div className="flex flex-wrap">
        {products.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <ProductCard
              product={product}
              onEdit={null}    // Buyers don’t get edit/delete options
              onDelete={null}
            />
            <div className="mt-2">
              <Button onClick={() => handlePlaceOrder(product)}>Place Order</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerDashboard;
