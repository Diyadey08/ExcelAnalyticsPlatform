// middleware/authMiddleware.js

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = null;

  // 1️⃣ Try Authorization header
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2️⃣ Try cookie
  else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // 3️⃣ Try body (for FormData token)
  else if (req.body?.token) {
    token = req.body.token;
  }

  if (!token) {
    return res.status(403).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Invalid token:", err);
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};
