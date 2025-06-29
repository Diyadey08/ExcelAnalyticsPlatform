import express from "express";
import { login, register } from "../authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register); // optional

export default router;
