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
  const orderData = {
    productId: [productId], 
    buyerId: [userId], 
    status: "Pending",
    ...additionalData, 
  };
  const records = await base("Orders").create([{ fields: orderData }]);
  return { id: records[0].id, ...records[0].fields };
};

const updateOrderByOrderId = async (orderId, orderData) => {
  if (orderData.userId) {
    orderData.buyerId = [orderData.userId]; 
  }
  const records = await base("Orders").update([
    { id: orderId, fields: orderData },
  ]);
  return { id: records[0].id, ...records[0].fields };
};

const deleteOrderByOrderId = async (orderId) => {
  await base("Orders").destroy([orderId]);
};

const fetchRequestedOrders = async (userId) => {
  try {
    // Step 1: Fetch all products where sellerId matches userId
    const productRecords = await base("Products")
      .select({
        filterByFormula: `{sellerId} = "${userId}"`,
      })
      .all();
    const sellerProductIds = productRecords.map((record) => record.id);

    if (!sellerProductIds.length) {
      return []; // No products found for this seller, so no orders
    }

    // Step 2: Fetch orders where productId includes any of the seller's product IDs
    const ordersRecords = await base("Orders")
      .select({
        filterByFormula: `OR(${sellerProductIds
          .map((id) => `FIND("${id}", ARRAYJOIN({productId}, ",")) > 0`)
          .join(",")})`,
      })
      .all();

    // Step 3: Map orders and include only required fields
    const orders = ordersRecords.map((record) => {
      const product = productRecords.find((p) =>
        record.fields.productId?.includes(p.id)
      );

      return {
        name: product?.fields?.name || "Unknown Product",
        url: product?.fields?.image?.[0]?.url || "No Image",
        status: record.fields.status,
        orderDate: record.fields.orderDate,
      };
    });

    return orders;
  } catch (error) {
    console.error("Error fetching requested orders:", error);
    throw new Error("Failed to fetch requested orders");
  }
};

export default {
  getOrdersByUserId,
  updateOrderByOrderId,
  addOrderByProductIdAndUserId,
  deleteOrderByOrderId,
  fetchRequestedOrders,
};