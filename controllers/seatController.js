const seatService = require("../services/seatService");

exports.getSeats = async (req, res) => {
  try {
    const seats = await seatService.getSeats();
    res.json(seats);
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).send("Error fetching seats: " + error.message);
  }
};
exports.createSeats = async (req, res) => {
  const { row, count } = req.body;
  try {
    await seatService.createSeats(row, count);
    res.status(201).send(`Seats created for row ${row} with count ${count}`);
  } catch (error) {
    res.status(500).send("Error creating seats: " + error.message);
  }
};

exports.deleteSeatsByRow = async (req, res) => {
  const row = req.params.row; // รับ row จาก parameter
  try {
    const deletedCount = await seatService.deleteSeatsByRow(row);
    res.status(200).send(`Deleted ${deletedCount} seats in row ${row}`);
  } catch (error) {
    res.status(500).send("Error deleting seats: " + error.message);
  }
};

exports.getGroupedSeats = async (req, res) => {
  try {
    const groupedSeats = await seatService.getSeatsGroupedByRow();
    res.json(groupedSeats);
  } catch (error) {
    console.error("Error fetching grouped seats:", error);
    res.status(500).send("Error fetching grouped seats: " + error.message);
  }
};
