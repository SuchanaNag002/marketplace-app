import base from '../db_config/airtable.js';
import fs from 'fs';

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

const storeImageLocally = async (image, assetsBaseDir) => {
  // Validate image format using the file's type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!validTypes.includes(image.mimetype)) {
    throw new Error("Invalid image format. Only .jpeg, .jpg, and .png are allowed.");
  }

  const assetsDir = path.join(assetsBaseDir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Generate a unique file name with timestamp and original name
  const uniquePrefix = Date.now();
  const storedFileName = `${uniquePrefix}-${image.originalname}`;
  const storedPath = path.join(assetsDir, storedFileName);

  // Write the image buffer to the file system
  await fs.promises.writeFile(storedPath, image.buffer);

  return `/assets/${storedFileName}`; // Return relative path for storage in Airtable
};

const getProducts = async () => {
  const records = await base("Products").select().all();
  return records.map((record) => ({ id: record.id, ...record.fields }));
};

const addProduct = async (productData, assetsBaseDir) => {
  validateProductData(productData);

  if (productData.image) {
    try {
      const localImagePath = await storeImageLocally(productData.image, assetsBaseDir);
      productData.imageUrl = localImagePath;
      delete productData.image; // Remove image after processing
    } catch (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
  }

  const records = await base("Products").create([{ fields: productData }]);
  return { id: records[0].id, ...records[0].fields };
};

const updateProduct = async (id, updatedFields, assetsBaseDir) => {
  if (updatedFields.name === undefined || updatedFields.description === undefined) {
    throw new Error("Name and description are mandatory fields.");
  }

  if (updatedFields.price === undefined || updatedFields.price < 0) {
    throw new Error("Price must be a positive number.");
  }

  if (updatedFields.quantity === undefined || updatedFields.quantity < 0) {
    throw new Error("Quantity must be a positive number.");
  }

  if (updatedFields.image) {
    try {
      const localImagePath = await storeImageLocally(updatedFields.image, assetsBaseDir);
      updatedFields.imageUrl = localImagePath;
      delete updatedFields.image; // Remove image after processing
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