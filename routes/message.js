const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// GET - ดึงข้อความล่าสุด
router.get("/", async (req, res) => {
  try {
    const latest = await Message.findOne().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: latest?.text || "No message yet",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST - สร้างหรืออัปเดตข้อความ
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: "Message is required." });
    }

    const newMessage = new Message({ text: message });
    await newMessage.save();

    res.json({ success: true, message: newMessage.text });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
