const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/message.json");

// สร้างไฟล์ถ้ายังไม่มี
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify({ message: "Hello ESP32!" }, null, 2));
}

router.get("/", async (req, res) => {
  try {
    const raw = fs.readFileSync(dataPath);
    const { message } = JSON.parse(raw);
    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: "Message is required." });
    }

    fs.writeFileSync(dataPath, JSON.stringify({ message }, null, 2));
    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
