const mongoose = require("mongoose");

const floatingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  detail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const FloatingMessage = mongoose.model("FloatingMessage", floatingSchema);
module.exports = FloatingMessage;
