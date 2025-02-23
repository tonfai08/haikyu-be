// const customerService = require("../services/customerService");
// const multer = require("multer");

// const upload = multer({ dest: "uploads/" }); // ตั้งค่าการอัปโหลดไฟล์ CSV

// const uploadCSV = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const result = await customerService.updateCustomersFromCSV(req.file.path);
//     return res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   uploadCSV,
//   upload, // Export `multer` เพื่อใช้ใน Route
// };
