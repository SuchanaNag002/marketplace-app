import base from "../db_config/airtable.js";

const getOrdersByUserId = async (userId) => {
  const records = await base("Orders")
    .select({
      filterByFormula: `{buyerId} = "${userId}"`,
    })
    .all();
  return records.map((record) => ({ id: record.id, ...record.fields }));
};

const addOrderByProductIdAndUserId = async (
  productId,
  userId,
  additionalData = {}
) => {
  const orderData = { productId, userId, ...additionalData };
  const records = await base("Orders").create([
    { fields: { ...orderData, buyerId: orderData.userId } },
  ]);
  return { id: records[0].id, ...records[0].fields };
};

const updateOrderByOrderId = async (orderId, orderData) => {
  if (orderData.userId) {
    orderData.buyerId = orderData.userId;
  }
  const records = await base("Orders").update([
    { id: orderId, fields: orderData },
  ]);
  return { id: records[0].id, ...records[0].fields };
};

const deleteOrderByOrderId = async (orderId) => {
  await base("Orders").destroy([orderId]);
};

export default {
  getOrdersByUserId,
  updateOrderByOrderId,
  addOrderByProductIdAndUserId,
  deleteOrderByOrderId,
};
