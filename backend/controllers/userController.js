import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

//@desc  Auth user & get token
//route POST /api/users/auth
//access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc  Register user
//route POST /api/users
//access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //becareful with find and findOne
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

//@desc  Logout user / clear cookies
//route POST /api/users/logout
//access Private
const logoutUser = asyncHandler(async (req, res) => {
  //clear cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "You have been logged out successfully" });
});

//@desc Get user profile
//route GET /api/users/profile
//access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user profile
//route PUT /api/users/profile
//access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get all users
//route GET /api/users
//access Private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get users");
});

//@desc Get user by ID
//route GET /api/users/:id
//access Private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get user by id");
});

//@desc Delete user
//route Delete /api/users/:id
//access Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete user");
});

//@desc Update user
//route PUT /api/users/:id
//access Private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
