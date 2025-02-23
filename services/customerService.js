// const Customer = require("../models/customer");
// const Papa = require("papaparse");
// const fs = require("fs");

// const updateCustomersFromCSV = async (csvFilePath) => {
//   try {
//     const fileContent = fs.readFileSync(csvFilePath, "utf8");

//     // แปลง CSV เป็น JSON
//     const parsedData = Papa.parse(fileContent, {
//       header: true,
//       skipEmptyLines: true,
//     });

//     const customers = parsedData.data;
//     console.log("customers", customers);

//     for (const data of customers) {
//       // เช็คว่า Twitter มีค่าหรือไม่
//       if (!data.twitter || data.twitter.trim() === "") {
//         console.warn("Skipping entry due to missing Twitter:", data);
//         continue; // ข้ามถ้าไม่มี Twitter
//       }

//       const filter = { twitter: data.twitter.trim() }; // ใช้ Twitter เป็นตัวระบุ
//       const update = {
//         name: data.name || "Unknown", // ถ้าไม่มีชื่อให้ใช้ "Unknown"
//         tel: data.tel || "0000000000", // ถ้าไม่มีเบอร์ให้ใช้ค่าดีฟอลต์
//         book1: parseInt(data.book1) || 0,
//         book2: parseInt(data.book2) || 0,
//         typeShipping: data.typeShipping || "standard",
//         totalPrice: parseFloat(data.totalPrice) || 0,
//         status: data.status || "pending",
//         postId: data.postId || null,
//       };

//       // ถ้าไม่มี Twitter ในฐานข้อมูล → สร้างใหม่
//       await Customer.findOneAndUpdate(filter, update, {
//         upsert: true, // ✅ ถ้าไม่มีให้สร้างใหม่
//         new: true,
//         setDefaultsOnInsert: true, // ✅ ตั้งค่า default fields เมื่อสร้างใหม่
//       });
//     }

//     fs.unlinkSync(csvFilePath); // ลบไฟล์ CSV หลังจากอัปโหลดเสร็จ

//     return {
//       success: true,
//       message: "CSV uploaded and data updated successfully",
//     };
//   } catch (error) {
//     console.error("Error processing CSV:", error);
//     throw new Error("Failed to process CSV");
//   }
// };

// module.exports = {
//   updateCustomersFromCSV,
// };
