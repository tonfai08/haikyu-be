const mongoose = require("mongoose");

const allowedNames = ["pum", "film", "mint", "ton", "aom", "pond"];
const floatingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      enum: allowedNames, 
    },
    detail: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  });

const FloatingMessage = mongoose.model("FloatingMessage", floatingSchema);
module.exports = FloatingMessage;
