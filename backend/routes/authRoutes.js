import express from "express";
import { login, register } from "../authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register); // optional
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });
  res.json({ message: "Logged out successfully" });
});
router.get("/check", verifyToken, (req, res) => {
  res.json({ user: req.user });
});
export default router;
