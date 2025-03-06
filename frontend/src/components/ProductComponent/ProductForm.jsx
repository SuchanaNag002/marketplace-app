import { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";

const ProductForm = ({ onSubmit, product = {} }) => {
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(product.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <Input label="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ProductForm;