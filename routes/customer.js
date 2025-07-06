const express = require("express");
const Customer = require("../models/customer");
const CustomerLog = require("../models/customerLog");

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
router.get("/:twitter", async (req, res) => {
  try {
    const { twitter } = req.params;

    const customer = await Customer.findOne({ twitter });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    await CustomerLog.create({
      customerId: customer._id,
      twitter: customer.twitter
    });

    res.json(customer);
  } catch (error) {
    console.error("❌ Error fetching customer:", error);
    res.status(500).json({ error: "Failed to fetch customer data" });
  }
});
module.exports = router;
