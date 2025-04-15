const mongoose = require("mongoose");

const floatingTokenSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const FloatingToken = mongoose.model("FloatingToken", floatingTokenSchema);
module.exports = FloatingToken;
