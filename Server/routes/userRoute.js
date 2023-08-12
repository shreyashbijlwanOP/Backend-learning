import express, { Router } from "express";
// we need to give .js for modules
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

// created a router Instance
const userRouter = express.Router();

// Create New User
userRouter.post("/", registerUser);

// Login User
userRouter.post("/auth", authUser);

// logout User
userRouter.post("/logout", logoutUser);

// Action Related to userProfile Which is a Protected Route
userRouter
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default userRouter;
