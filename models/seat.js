const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  row: { type: String, required: true },
  number: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  reservedBy: {
    name: String,
    email: String,
    token: String,
    slip: String,
  },
  status: {
    statusType: { type: String, default: "available" },
    time: { type: Date },
  },
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
