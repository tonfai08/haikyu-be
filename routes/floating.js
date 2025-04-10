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

router.post("/", async (req, res) => {
    try {
      const { name, detail } = req.body;
      if (!name || !detail) {
        return res.status(400).json({ error: "Missing name or detail" });
      }
  
      // ✅ ตรวจว่าคนนี้มีเกิน 15 ข้อความไหม
      const count = await FloatingMessage.countDocuments({ name });
  
      if (count >= 15) {
        // 🔥 ลบอันเก่าสุดของคนนั้น (เรียงจากเก่าไปใหม่)
        await FloatingMessage.findOneAndDelete({ name }, { sort: { createdAt: 1 } });
      }
  
      // ✅ เพิ่มข้อความใหม่
      const newMsg = new FloatingMessage({ name, detail });
      const result = await newMsg.save();
  
      res.status(201).json(result);
    } catch (err) {
      console.error("❌ Error in POST /floating:", err);
      res.status(500).json({ error: "Failed to create message" });
    }
  });

router.delete("/", async (req, res) => {
    try {
      await FloatingMessage.deleteMany({});
      res.status(200).json({ message: "All floating messages deleted." });
    } catch (err) {
      console.error("❌ Failed to delete all messages:", err);
      res.status(500).json({ error: "Failed to delete all messages" });
    }
  });
    

module.exports = router;
