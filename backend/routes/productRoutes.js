import express from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/prodcutController.js";
const router = express.Router();

// using async since mongoose is using async
router.route("/").get(getAllProducts);
router.route("/:id").get(getProductById);
export default router;
