const Order = require("../models/order");

exports.createOrder = async (orderData) => {
  try {
    const order = new Order(orderData);
    await order.save();
    return order;
  } catch (error) {
    console.error("Error creating order in service:", error);
    throw error;
  }
};
exports.getAllOrders = async (filter) => {
  try {
    return await Order.find(filter).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

exports.getOrderById = async (id) => {
  try {
    return await Order.findById(id);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};

exports.updateOrder = async (id, updateData) => {
  try {
    return await Order.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};
