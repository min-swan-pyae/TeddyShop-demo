import mongoose from "mongoose";
import env from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

env.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUserId = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUserId };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const derstroyData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  derstroyData();
} else {
  importData();
}
