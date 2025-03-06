import base from '../db_config/airtable.js';

const getOrders = async () => {
  const records = await base("Orders").select().all();
  return records.map((record) => ({ id: record.id, ...record.fields }));
};

const addOrder = async (orderData) => {
  // orderData includes fields such as Product (array), Buyer (array), OrderStatus, OrderDate, etc.
  const records = await base("Orders").create([{ fields: orderData }]);
  return { id: records[0].id, ...records[0].fields };
};

const updateOrder = async (id, updatedFields) => {
  const records = await base("Orders").update([{ id, fields: updatedFields }]);
  return { id: records[0].id, ...records[0].fields };
};

const deleteOrder = async (id) => {
  await base("Orders").destroy([id]);
};

export default { getOrders, addOrder, updateOrder, deleteOrder };
