import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/prodcutController.js";
import { protect,admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// route api/products
router.route("/").get(getAllProducts).post(protect,admin,createProduct);
router.route("/:id").get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);
export default router;
