import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import { CheckCircle } from "@mui/icons-material";

const ProductForm = ({ onSubmit, product = {} }) => {
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price || 0);
  const [quantity, setQuantity] = useState(product.quantity || 0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true); 

    try {
      const productData = { name, description, price, quantity };

      if (image) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("image", image);

        await onSubmit(formData);
      } else {
        await onSubmit(productData);
      }
    } catch (err) {
      setError(err.message || "Could not add product to store!");
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (allowedTypes.includes(selectedFile.type)) {
        setImage(selectedFile);
        setIsFileSelected(true);
      } else {
        setError("Please select a valid image file (jpg, jpeg, or png).");
        setImage(null);
        setIsFileSelected(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center max-w-sm w-full mx-auto py-4 space-y-4"
    >
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Input label="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Input label="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <Input label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

      <div className="mb-4 w-full flex items-center justify-between">
        <label className="block text-left mb-2">Image</label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            id="file-input"
            className="hidden"
            onChange={handleImageChange}
            disabled={isFileSelected} s
          />
          <label
            htmlFor="file-input"
            className={`cursor-pointer w-full p-2 border border-gray-300 rounded-md text-center bg-gray-100 ${
              isFileSelected ? "bg-green-100" : ""
            }`}
          >
            {isFileSelected ? (
              <span className="flex items-center justify-center text-green-600">
                <CheckCircle className="mr-2" /> File chosen
              </span>
            ) : (
              "Choose File"
            )}
          </label>
        </div>
      </div>

      <Button
        type="submit"
        text={isSubmitting ? "Submitting..." : "Submit"}
        className={`flex justify-center mt-2 ${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default ProductForm;
