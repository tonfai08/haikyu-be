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
const FloatingToken = require("../models/floatingToken"); // import model

// ✅ route สำหรับ generate token 6 หลัก x500
// router.get("/generate-tokens", async (req, res) => {
//   try {
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     const generateCode = () => {
//       let code = "";
//       for (let i = 0; i < 6; i++) {
//         code += chars.charAt(Math.floor(Math.random() * chars.length));
//       }
//       return code;
//     };

//     const codes = new Set();
//     while (codes.size < 500) {
//       codes.add(generateCode());
//     }

//     const tokens = Array.from(codes).map((code) => ({ code }));
//     await FloatingToken.insertMany(tokens);

//     res.status(201).json({ message: "✅ Created 500 tokens", count: tokens.length });
//   } catch (err) {
//     console.error("❌ Error generating tokens:", err);
//     res.status(500).json({ error: "Failed to generate tokens" });
//   }
// });

router.get("/", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 30;
  
      const messages = await FloatingMessage.find()
        .sort({ createdAt: -1 })
        .limit(limit);
  
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

const allowedNames = ["pum", "film", "mint", "ton", "aom", "pond"];

router.post("/", async (req, res) => {
  try {
    const { name, detail, token } = req.body;

    if (!name || !detail || !token) {
      return res.status(400).json({ error: "Missing name, detail, or token" });
    }

    // ✅ ตรวจว่า name อยู่ในลิสต์ที่อนุญาตหรือไม่
    if (!allowedNames.includes(name)) {
      return res.status(400).json({ error: `Invalid name: ${name}` });
    }

    // ✅ ตรวจความยาว detail
    if (detail.length > 100) {
      return res.status(400).json({ error: "Detail must not exceed 100 characters" });
    }

    // ✅ ตรวจ token ว่า valid และยังไม่ถูกใช้
    const validToken = await FloatingToken.findOne({ code: token, used: false });
    if (!validToken) {
      return res.status(403).json({ error: "Invalid or already used token" });
    }

    // ✅ ลบข้อความเก่าสุดถ้าเกิน 7
    const count = await FloatingMessage.countDocuments({ name });
    if (count >= 7) {
      await FloatingMessage.findOneAndDelete({ name }, { sort: { createdAt: 1 } });
    }

    // ✅ บันทึกข้อความ
    const newMsg = new FloatingMessage({ name, detail });
    const result = await newMsg.save();

    // ✅ ทำเครื่องหมายว่า token ถูกใช้แล้ว
    validToken.used = true;
    await validToken.save();

    res.status(201).json(result);
  } catch (err) {
    console.error("❌ Error in POST /floating:", err);
    res.status(500).json({ error: "Failed to create message" });
  }
});


// router.delete("/", async (req, res) => {
//     try {
//       await FloatingMessage.deleteMany({});
//       res.status(200).json({ message: "All floating messages deleted." });
//     } catch (err) {
//       console.error("❌ Failed to delete all messages:", err);
//       res.status(500).json({ error: "Failed to delete all messages" });
//     }
//   });
    

module.exports = router;
