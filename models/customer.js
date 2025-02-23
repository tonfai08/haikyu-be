const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  twitter: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  tel: { type: String, required: true },
  book1: { type: Number, required: true },
  book2: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  typeShipping: { type: String, default: "standard" },
  status: {
    type: String,

    default: "pending",
  },
  postId: { type: String, default: null },
  postStatus: { type: String, default: null },
  slip: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
