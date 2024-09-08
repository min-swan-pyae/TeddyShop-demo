import express from "express";
import {
  getMyOrders,
  addOrderItems,
  updateOrderToPaid,
  updateOrderToDeliver,
  getOrderById,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// using async since mongoose is using async
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDeliver);

export default router;
