import base from "../db_config/airtable.js";

const getProducts = async () => {
  const records = await base("Products").select().all();
  return records.map((record) => ({ id: record.id, ...record.fields }));
};

const addProduct = async (productData) => {
  const record = await base("Products").create([{ fields: productData }]);
  return { id: record[0].id, ...record[0].fields };
};

const updateProduct = async (id, updatedFields) => {
  await base("Products").update([{ id, fields: updatedFields }]);
};

const deleteProduct = async (id) => {
  await base("Products").destroy([id]);
};

export default { getProducts, addProduct, updateProduct, deleteProduct };
