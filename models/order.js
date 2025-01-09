const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  tel: { type: String, required: true },
  book1: { type: Number, required: true },
  book2: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  typeShipping: { type: String, default: "standard" },
  status: {
    type: String,
    enum: ["pending", "paid", "preparing", "shipping", "delivered"],
    default: "pending",
  },
  postId: { type: String, default: null },
  orderId: { type: Number, unique: true },
  slip: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    const lastOrder = await this.constructor.findOne().sort({ orderId: -1 });
    console.log("Last Order:", lastOrder);
    this.orderId = lastOrder ? lastOrder.orderId + 1 : 1;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
