// middleware/authMiddleware.js

import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
   console.log("Cookies received:", req.cookies);
  const token = req.cookies.jwt; // 🧠 read from cookie

  if (!token) {
     console.warn("❌ No token in cookies");
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("✅ Token verified:", decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    next();
  }
};


