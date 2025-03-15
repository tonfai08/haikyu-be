const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const VisitLog = require("../models/visitLog");

// โหลดรายการ IP ที่ไม่ต้องบันทึกจาก JSON
const excludedIpsPath = path.join(__dirname, "../config/excluded_ips.json");
const excludedIps = JSON.parse(
  fs.readFileSync(excludedIpsPath, "utf8")
).excluded_ips;

router.get("/", async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.ip ||
      req.connection.remoteAddress;

    // ถ้า IP อยู่ในรายการ ไม่ต้องบันทึก
    if (excludedIps.includes(ip)) {
      return res.json({
        success: true,
        message: "IP is excluded from logging",
      });
    }

    // บันทึกลงฐานข้อมูล
    const log = new VisitLog({ ip_address: ip });
    await log.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
