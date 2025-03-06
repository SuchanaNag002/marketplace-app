import base from '../db_config/airtable.js';

const getOrders = async (buyerId) => {
  // Filter orders by matching the Buyer field (which is an array of IDs)
  const records = await base("Orders").select({
    filterByFormula: `FIND("${buyerId}", ARRAYJOIN({Buyer}))`
  }).all();
  return records.map(record => ({ id: record.id, ...record.fields }));
};

const addOrder = async (orderData) => {
  const records = await base("Orders").create([{ fields: orderData }]);
  return { id: records[0].id, ...records[0].fields };
};

export default { getOrders, addOrder };
