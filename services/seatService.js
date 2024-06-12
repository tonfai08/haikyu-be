const Seat = require("../models/seat");

exports.createSeats = async (row, count, price) => {
  try {
    for (let i = 1; i <= count; i++) {
      const seatName = `${row}-${i}`;
      const seat = new Seat({
        row: row,
        number: i,
        name: seatName,
        price: price,
        status: { statusType: "available" },
      });
      await seat.save();
    }
    console.log(`Successfully created ${count} seats in row ${row}`);
  } catch (error) {
    console.error("Error creating seats:", error);
  }
};

exports.getSeats = async () => {
  try {
    const seats = await Seat.find();
    return seats;
  } catch (error) {
    console.error("Error creating seats:", error);
  }
};

exports.deleteSeatsByRow = async (row) => {
  try {
    const result = await Seat.deleteMany({ row: row });
    console.log(
      `Successfully deleted ${result.deletedCount} seats in row ${row}`
    );
    return result.deletedCount; // ส่งกลับจำนวนที่นั่งที่ลบ
  } catch (error) {
    console.error("Error deleting seats:", error);
    throw error;
  }
};

exports.getSeatsGroupedByRow = async () => {
  try {
    await resetExpiredReservations();
    const seats = await Seat.aggregate([
      {
        $group: {
          _id: "$row", // กลุ่มตามแถว
          seats: {
            $push: {
              // สร้างอาร์เรย์ของที่นั่งในแต่ละกลุ่ม
              name: "$name",
              price: "$price",
              reservedBy: "$reservedBy",
              status: "$status",
            },
          },
        },
      },
      {
        $sort: { _id: 1 }, // เรียงลำดับตามแถวจาก A ถึง Z
      },
      {
        $project: {
          _id: 0,
          row: "$_id",
          seats: 1,
        },
      },
    ]);
    return seats;
  } catch (error) {
    console.error("Error getting grouped seats:", error);
    throw error;
  }
};

exports.reserveSeats = async (seats, token) => {
  try {
    // Check if any seat is not available
    const unavailableSeats = await Seat.find({
      name: { $in: seats.map((seat) => seat.name) },
      "status.statusType": { $ne: "available" },
    });

    // If there are unavailable seats, return an error message
    if (unavailableSeats.length > 0) {
      return {
        error: true,
        message: "One or more seats are not available for reservation.",
      };
    }

    // Update each seat to be reserved if they are available
    const updatePromises = seats.map((seat) => {
      return Seat.findOneAndUpdate(
        { name: seat.name, "status.statusType": "available" },
        {
          $set: {
            "status.statusType": "reserved",
            "reservedBy.token": token,
            "status.time": new Date(),
          },
        },
        { new: true, runValidators: true }
      );
    });

    // Wait for all updates to complete
    const updatedSeats = await Promise.all(updatePromises);

    // Filter out any null responses (if a seat was not found or not updated)
    const successfullyReservedSeats = updatedSeats.filter(
      (seat) => seat !== null
    );

    return {
      success: true,
      message: `Successfully reserved ${successfullyReservedSeats.length} seats.`,
      seats: successfullyReservedSeats,
    };
  } catch (error) {
    console.error("Error reserving seats:", error);
    return { error: true, message: "Failed to reserve seats due to an error." };
  }
};

async function resetExpiredReservations() {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  try {
    const results = await Seat.updateMany(
      {
        "status.statusType": "reserved",
        "status.time": { $lt: fiveMinutesAgo },
      },
      {
        $set: {
          "status.statusType": "available",
          "reservedBy.token": "",
        },
      }
    );

    console.log(`Expired reservations reset: ${results.modifiedCount}`);
  } catch (error) {
    console.error("Error resetting expired reservations:", error);
  }
}
