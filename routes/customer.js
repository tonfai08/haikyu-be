const express = require("express");
const Customer = require("../models/customer");

const router = express.Router();

router.post("/upload-bulk", async (req, res) => {
  try {
    const customers = req.body;

    if (!Array.isArray(customers) || customers.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid data format. Expected an array." });
    }

    console.log("✅ JSON Received:", customers);

    const operations = customers.map((data) => ({
      updateOne: {
        filter: { twitter: data.twitter },
        update: { $set: data },
        upsert: true,
      },
    }));

    await Customer.bulkWrite(operations);

    res.json({ message: "✅ Bulk upload successful!" });
  } catch (error) {
    console.error("❌ Error processing JSON:", error);
    res.status(500).json({ error: "Failed to process JSON data" });
  }
});

module.exports = router;
