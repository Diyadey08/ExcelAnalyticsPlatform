// routes.js
import express from "express";
import {login} from "./authController.js";
import { verifyToken, restrictTo } from "./middleware/authMiddleware.js";

const router = express.Router();


router.post("/login", login);

// Protected routes
router.get("/dashboard", verifyToken, (req, res) => {
  return res.send(`Welcome, ${req.user.email}`);
});

router.get("/admin-panel", verifyToken, restrictTo("admin"), (req, res) => {
  return res.send("Welcome to admin panel");
});
export default router;
