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
  const { row, count, price } = req.body;
  if (!row) {
    return res.status(400).send("Missing parameter: row");
  }
  if (count == null) {
    return res.status(400).send("Missing parameter: count");
  }
  if (price == null) {
    return res.status(400).send("Missing parameter: price");
  }
  try {
    await seatService.createSeats(row, count, price);
    res.status(201).send(`Seats created for row ${row} with count ${count}`);
  } catch (error) {
    res.status(500).send("Error creating seats: " + error.message);
  }
};

exports.reserveSeats = async (req, res) => {
  const seats = req.body.seats;
  const token = req.body.token;

  if (!seats || seats.length === 0) {
    return res.status(400).send("No seats provided for reservation.");
  }

  try {
    const reservationResults = await seatService.reserveSeats(seats, token);
    if (reservationResults.error) {
      return res.status(400).send(reservationResults.message);
    }
    res.status(200).json({
      message: `Successfully reserved ${reservationResults.length} seats.`,
      reservedSeats: reservationResults,
    });
  } catch (error) {
    console.error("Error reserving seats:", error);
    res.status(500).send("Failed to reserve seats due to an error.");
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
exports.updateSeat = async (req, res) => {
  console.log("req", req);
  const { seatName } = req.params;
  const { price, reservedBy, status } = req.body;

  try {
    const updatedSeat = await seatService.updateSeatDetails(seatName, {
      price,
      reservedBy,
      status,
    });
    res.json(updatedSeat);
  } catch (error) {
    console.error("Error updating seat:", error);
    res.status(500).send(error.message);
  }
};
