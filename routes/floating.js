const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ สร้าง Schema และ Model ในตัว
const floatingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  detail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const FloatingMessage = mongoose.model("FloatingMessage", floatingSchema);

// ✅ GET: ดึงข้อความทั้งหมด
router.get("/", async (req, res) => {
  try {
    const messages = await FloatingMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST: เพิ่มข้อความใหม่
router.post("/", async (req, res) => {
  try {
    const { name, detail } = req.body;
    if (!name || !detail) {
      return res.status(400).json({ error: "Missing name or detail" });
    }

    const newMsg = new FloatingMessage({ name, detail });
    const result = await newMsg.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create message" });
  }
});

module.exports = router;
