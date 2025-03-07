import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";

const ProductForm = ({ onSubmit, product = {} }) => {
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price || 0);
  const [imageUrl, setImageUrl] = useState(product.imageUrl || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center max-w-sm w-full mx-auto py-4"
    >
      <Input
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        label="Image Url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Button type="submit" text="Submit" className="flex justify-center mt-2" />
    </form>
  );
};

export default ProductForm;
