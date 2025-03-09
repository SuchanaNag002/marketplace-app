import base from "../db_config/airtable.js";

const getProducts = async () => {
  const records = await base("Products").select().all();
  return records.map((record) => ({ id: record.id, ...record.fields }));
};

const addProduct = async (productData) => {
  const { userId, ...rest } = productData;
  const records = await base("Products").create([
    { fields: { ...rest, sellerId: [userId] } },
  ]);
  return { id: records[0].id, ...records[0].fields };
};

const updateProduct = async (id, updatedFields) => {
  if (updatedFields.userId) {
    updatedFields.sellerId = [updatedFields.userId];
    delete updatedFields.userId;
  }
  const records = await base("Products").update([
    { id, fields: updatedFields },
  ]);
  return { id: records[0].id, ...records[0].fields };
};

const deleteProduct = async (id) => {
  await base("Products").destroy([id]);
};

export default { getProducts, addProduct, updateProduct, deleteProduct };
