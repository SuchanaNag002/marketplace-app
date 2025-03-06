import { useState } from "react";
import ProductCard from "../../components/ProductComponent/ProductCard";
import ProductForm from "../../components/ProductComponent/ProductForm";
import Button from "../../components/ui/button";

const Home = ({ onLogout }) => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const handleDeleteProduct = (product) => {
    setProducts(products.filter((p) => p.id !== product.id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <Button onClick={onLogout}>Logout</Button>
      </div>
      <ProductForm onSubmit={handleAddProduct} />
      <div className="flex flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
        ))}
      </div>
    </div>
  );
};

export default Home;
