import base from '../db_config/airtable.js';
import fs from 'fs';
import path from 'path';

const validateProductData = (productData) => {
  const { name, description, price, quantity } = productData;
  if (!name || !description) {
    throw new Error("Name and description are mandatory fields.");
  }
  if (price === undefined || price < 0) {
    throw new Error("Price must be a positive number.");
  }
  if (quantity === undefined || quantity < 0) {
    throw new Error("Quantity must be a positive number.");
  }
};

const storeImageLocally = async (imageFile, imageName) => {
  const validExtensions = ['.jpeg', '.jpg', '.png'];
  const ext = path.extname(imageName).toLowerCase();
  if (!validExtensions.includes(ext)) {
    throw new Error("Invalid image format. Only .jpeg, .jpg, and .png are allowed.");
  }

  const assetsDir = path.join(__dirname, '../assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  const storedFileName = `${Date.now()}-${imageName}`;
  const storedPath = path.join(assetsDir, storedFileName);

  await fs.promises.writeFile(storedPath, imageFile);

  return `/assets/${storedFileName}`;
};

const getProducts = async () => {
  const records = await base("Products").select().all();
  return records.map((record) => ({ id: record.id, ...record.fields }));
};

const addProduct = async (productData) => {
  validateProductData(productData);

  if (productData.imageFile && productData.imageName) {
    try {
      const localImagePath = await storeImageLocally(productData.imageFile, productData.imageName);
      productData.imageUrl = localImagePath;
    } catch (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
  }

  const records = await base("Products").create([{ fields: productData }]);
  return { id: records[0].id, ...records[0].fields };
};

const updateProduct = async (id, updatedFields) => {
  if (updatedFields.name === undefined || updatedFields.description === undefined) {
    throw new Error("Name and description are mandatory fields.");
  }

  if (updatedFields.price === undefined || updatedFields.price < 0) {
    throw new Error("Price must be a positive number.");
  }

  if (updatedFields.quantity === undefined || updatedFields.quantity < 0) {
    throw new Error("Quantity must be a positive number.");
  }

  if (updatedFields.imageFile && updatedFields.imageName) {
    try {
      const localImagePath = await storeImageLocally(updatedFields.imageFile, updatedFields.imageName);
      updatedFields.imageUrl = localImagePath;
    } catch (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
  }

  const records = await base("Products").update([{ id, fields: updatedFields }]);
  return { id: records[0].id, ...records[0].fields };
};

const deleteProduct = async (id) => {
  await base("Products").destroy([id]);
};

export default { getProducts, addProduct, updateProduct, deleteProduct };
