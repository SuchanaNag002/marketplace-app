import ProductCard from "../../components/ProductComponent/ProductCard";
import ProductForm from "../../components/ProductComponent/ProductForm";
import { useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const handleDeleteProduct = (product) => {
    setProducts(products.filter((p) => p.id !== product.id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
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