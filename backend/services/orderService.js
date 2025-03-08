import base from "../db_config/airtable.js";

const getOrdersByUserId = async (userId) => {
  const records = await base("Orders").select({
    filterByFormula: `{userId} = "${userId}"`
  }).all();
  return records.map((record) => ({ id: record.id, ...record.fields }));
};

const updateOrderByOrderId = async (orderId, orderData) => {
  const records = await base("Orders").update([{ id: orderId, fields: orderData }]);
  return { id: records[0].id, ...records[0].fields };
};

const addOrderByProductIdAndUserId = async (productId, userId, additionalData = {}) => {
  const orderData = { productId, userId, ...additionalData };
  const records = await base("Orders").create([{ fields: orderData }]);
  return { id: records[0].id, ...records[0].fields };
};

const deleteOrderByOrderId = async (orderId) => {
  const deletedRecord = await base("Orders").destroy(orderId);
  return { id: deletedRecord.id, ...deletedRecord.fields };
};

export default {
  getOrdersByUserId,
  updateOrderByOrderId,
  addOrderByProductIdAndUserId,
  deleteOrderByOrderId
};
