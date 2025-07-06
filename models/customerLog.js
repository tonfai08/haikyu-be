const mongoose = require("mongoose");

const customerLogSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  twitter: { type: String, required: true },
  accessedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CustomerLog", customerLogSchema);
