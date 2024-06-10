const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seatController");

router.get("/", seatController.getSeats);
router.get("/grouped", seatController.getGroupedSeats);
router.post("/create-seats", seatController.createSeats);
router.delete("/delete-by-row/:row", seatController.deleteSeatsByRow);

module.exports = router;
