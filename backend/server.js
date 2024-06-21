import express from "express";

import env from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

env.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running ....");
});

// any time we hit this route, no matter what is after it , it's going to call this productRoutes file.
app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
