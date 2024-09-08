import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Get logged in user orders
// @route GET/api/orders/mine
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc Create new order
// @route POST/api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  console.log("Request Body:", req.body);

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order items");
  } else {
    try {
      const order = new Order({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      console.log("Created Order:", createdOrder);
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error("Error Saving Order:", error.message || error);
      res
        .status(500)
        .json({ message: "Error saving order", error: error.message || error });
    }
  }
});

// @desc Update Order to Paid
// @route PUT/api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc Update Order to Delivered
// @route PUT/api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDeliver = asyncHandler(async (req, res) => {
  res.send("update order to deliver");
});

// @desc Get order by Id
// @route GET/api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  //I also want to add the user, the user name and email to the order and that's not stored in the order collection
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Get All orders
// @route GET/api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("Get All Orders");
});

export {
  getMyOrders,
  addOrderItems,
  updateOrderToPaid,
  updateOrderToDeliver,
  getOrderById,
  getOrders,
};
