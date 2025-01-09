const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
  const {
    email,
    name,
    address,
    tel,
    book1,
    book2,
    totalPrice,
    typeShipping,
    slip,
  } = req.body;

  // ตรวจสอบพารามิเตอร์ที่จำเป็น
  if (
    !email ||
    !name ||
    !address ||
    !tel ||
    book1 == null ||
    book2 == null ||
    totalPrice == null ||
    !slip // ตรวจสอบว่ามี Base64 Slip หรือไม่
  ) {
    return res.status(400).send("Missing required parameters.");
  }

  try {
    // ส่งข้อมูลไปยัง Service เพื่อบันทึกในฐานข้อมูล
    const order = await orderService.createOrder({
      email,
      name,
      address,
      tel,
      book1,
      book2,
      totalPrice,
      typeShipping: typeShipping || "standard",
      slip, // เก็บ Base64 Slip ในฐานข้อมูล
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Failed to create order: " + error.message);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { email, name, orderId, status } = req.query;

    // ส่งตัวกรองไปยัง Service
    const filter = {};
    if (email) filter.email = { $regex: email, $options: "i" }; // ค้นหา email แบบไม่สนตัวพิมพ์
    if (name) filter.name = { $regex: name, $options: "i" }; // ค้นหาชื่อแบบไม่สนตัวพิมพ์
    if (orderId) filter.orderId = Number(orderId); // ค้นหา orderId
    if (status) filter.status = status; // ค้นหา status

    const orders = await orderService.getAllOrders(filter);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Failed to fetch orders: " + error.message);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedOrder = await orderService.updateOrder(id, updateData);
    if (!updatedOrder) {
      return res.status(404).send("Order not found");
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Failed to update order: " + error.message);
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Missing order ID.");
  }

  try {
    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).send("Order not found.");
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).send("Failed to fetch order: " + error.message);
  }
};
