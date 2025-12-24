import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} from "../controllers/authcontroller.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Get user route
router.get("/currentUser", getUser);

router.post("/logout", logoutUser);

export default router;
