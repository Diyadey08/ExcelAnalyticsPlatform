// routes.js
const express = require("express");
const router = express.Router();
const authController = require("./authController");
const { verifyToken, restrictTo } = require("./middleware/authMiddleware");

router.post("/login", authController.login);

// Protected routes
router.get("/dashboard", verifyToken, (req, res) => {
  res.send(`Welcome, ${req.user.email}`);
});

router.get("/admin-panel", verifyToken, restrictTo("admin"), (req, res) => {
  res.send("Welcome to admin panel");
});

module.exports = router;
