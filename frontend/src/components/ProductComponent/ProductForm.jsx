import React, { useState, useEffect } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import { CheckCircle } from "@mui/icons-material";

const ProductForm = ({ onSubmit, product = {}, setAlert }) => {
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price || 0);
  const [quantity, setQuantity] = useState(product.quantity || 0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!hasSubmitted) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || 0);
      setQuantity(product.quantity || 0);
      setError("");
      setImage(null);
      setIsFileSelected(false);
    }
  }, [product, hasSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setHasSubmitted(true);
    try {
      const productData = {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      };
      if (image) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", productData.price);
        formData.append("quantity", productData.quantity);
        formData.append("image", image);
        await onSubmit(formData);
        setIsUploading(false);
      } else {
        await onSubmit(productData);
      }
      setAlert({
        severity: "success",
        message: product.id ? "Product updated successfully" : "Product added successfully",
      });
      setName("");
      setDescription("");
      setPrice(0);
      setQuantity(0);
      setImage(null);
      setIsFileSelected(false);
      setError("");
      setHasSubmitted(false);
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.error || "Could not add product to store!";
      setError(errorMessage);
      setAlert({
        severity: "error",
        message: errorMessage,
      });
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
        setError("");
      } else {
        const imageError = "Please select a valid image file (jpg, jpeg, or png).";
        setError(imageError);
        setImage(null);
        setIsFileSelected(false);
        setAlert({
          severity: "error",
          message: imageError,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-sm w-full mx-auto py-4 space-y-4">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Input label="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Input label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <Input label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <div className="mb-4 w-full flex items-center justify-between">
        <label className="block text-left mb-2">Image</label>
        <div className="flex items-center space-x-2">
          <input type="file" accept="image/*" id="file-input" className="hidden" onChange={handleImageChange} disabled={isFileSelected} />
          <label
            htmlFor="file-input"
            className={`cursor-pointer w-full p-2 border border-gray-300 rounded-md text-center bg-gray-100 ${
              isFileSelected ? (isUploading ? "bg-yellow-100" : "bg-green-100") : ""
            }`}
          >
            {isUploading ? (
              "Uploading..."
            ) : isFileSelected ? (
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
        className={`flex justify-center mt-2 ${isSubmitting ? "bg-gray-300 cursor-not-allowed" : ""}`}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default ProductForm;
