import base from '../db_config/airtable.js';
import fs from 'fs';
import path from 'path';

const storeImageLocally = async (image, assetsBaseDir) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!validTypes.includes(image.mimetype)) throw new Error("Invalid image format. Only .jpeg, .jpg, and .png are allowed.");

  const assetsDir = path.join(assetsBaseDir, 'assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  const uniquePrefix = Date.now();
  const storedFileName = `${uniquePrefix}-${image.originalname}`;
  const storedPath = path.join(assetsDir, storedFileName);

  await fs.promises.writeFile(storedPath, image.buffer);

  return `/assets/${storedFileName}`;
};

const getProducts = async () => {
  const records = await base("Products").select().all();
  return records.map((record) => ({ id: record.id, ...record.fields }));
};

const addProduct = async (productData, assetsBaseDir) => {
  if (productData.image) {
    try {
      const localImagePath = await storeImageLocally(productData.image, assetsBaseDir);
      productData.imageUrl = localImagePath;
      delete productData.image;
    } catch (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
  }

  const records = await base("Products").create([{ fields: productData }]);
  return { id: records[0].id, ...records[0].fields };
};

const updateProduct = async (id, updatedFields, assetsBaseDir) => {
  if (updatedFields.image) {
    try {
      const localImagePath = await storeImageLocally(updatedFields.image, assetsBaseDir);
      updatedFields.imageUrl = localImagePath;
      delete updatedFields.image;
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