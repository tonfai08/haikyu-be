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
    const seats = await Seat.aggregate([
      {
        $group: {
          _id: "$row", // กลุ่มตามแถว
          seats: {
            $push: {
              // สร้างอาร์เรย์ของที่นั่งในแต่ละกลุ่ม
              name: "$name",
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
