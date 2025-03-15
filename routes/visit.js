const express = require("express");
const router = express.Router();
const VisitLog = require("../models/visitLog"); // ถ้าใช้ MongoDB
// const db = require('../db'); // ถ้าใช้ PostgreSQL/MySQL

router.get("/", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // บันทึกลงฐานข้อมูล
    const log = new VisitLog({ ip_address: ip });
    await log.save();

    res.json({ message: "Visit logged", ip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
