const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  tel: { type: String, required: true },
  book1: { type: Number, required: true },
  book2: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  typeShipping: { type: String, default: "standard" }, // standard, express, etc.
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
