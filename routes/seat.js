const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seatController");

router.get("/", seatController.getSeats);
router.get("/grouped", seatController.getGroupedSeats);
router.post("/create-seats", seatController.createSeats);
router.post("/reserve-seats", seatController.reserveSeats);
router.put("/update-seat", seatController.updateSeats);
router.delete("/delete-by-row/:row", seatController.deleteSeatsByRow);

module.exports = router;
