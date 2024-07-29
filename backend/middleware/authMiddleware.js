import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the JWT from the cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      //decoded will be an object which includes payload of jwt which is {userId:user._id}
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Creating req.user so now u can use req.user in anywhere
      //.select for excluding password
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, Token Failed!");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token!!");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };
