const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  twitter: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  tel: { type: String, required: true },
  books: {
    type: new mongoose.Schema({
      krtBook: { type: Number, default: 0 },
      khnBook: { type: Number, default: 0 }, 
      premiere: { type: Number, default: 0 },
      krtBox: { type: Number, default: 0 }, 
      khnBox: { type: Number, default: 0 }, 
      blockbuster: { type: Number, default: 0 },
      additional: { type: Number, default: 0 }, 
      additionalKRTSK: { type: Number, default: 0 }, 
      additionalKHN: { type: Number, default: 0 }, 
      additionalKRTSKKHN: { type: Number, default: 0 }, 
    }),
    default: {},
  },
  totalPrice: { type: Number, required: true },
  typeShipping: { type: String, default: "standard" },
  status: { type: String, default: "pending" },
  setBook: { type: String },
  postId: { type: String, default: null },
  postStatus: { type: String, default: null },
  slip: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;