const Order = require("../models/order");

exports.createOrder = async (orderData) => {
  try {
    const order = new Order(orderData);
    return await order.save();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

exports.getAllOrders = async () => {
  try {
    return await Order.find().sort({ createdAt: -1 });
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
