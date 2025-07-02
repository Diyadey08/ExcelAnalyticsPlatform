// middleware/authMiddleware.js

import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt; // 🧠 read from cookie

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    next();
  }
};


export const restrictTo = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: "Access denied: insufficient role" });
  }
  next();
};
