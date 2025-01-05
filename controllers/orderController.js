const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
  const { email, name, address, tel, book1, book2, totalPrice, typeShipping } =
    req.body;

  // ตรวจสอบพารามิเตอร์ที่จำเป็น
  if (
    !email ||
    !name ||
    !address ||
    !tel ||
    book1 == null ||
    book2 == null ||
    totalPrice == null
  ) {
    return res.status(400).send("Missing required parameters.");
  }

  try {
    const order = await orderService.createOrder({
      email,
      name,
      address,
      tel,
      book1,
      book2,
      totalPrice,
      typeShipping,
    });
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Failed to create order: " + error.message);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Failed to fetch orders: " + error.message);
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
