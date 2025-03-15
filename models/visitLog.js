const mongoose = require("mongoose");

const visitLogSchema = new mongoose.Schema({
  ip_address: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VisitLog", visitLogSchema);
