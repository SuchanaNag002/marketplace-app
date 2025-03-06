import base from "../db_config/airtable.js";

const getOrders = async () => {
  const records = await base("Orders").select().all();
  return records.map((record) => ({ id: record.id, ...record.fields }));
};

const placeOrder = async (orderData) => {
  const record = await base("Orders").create([{ fields: orderData }]);
  return { id: record[0].id, ...record[0].fields };
};

export default { getOrders, placeOrder };
