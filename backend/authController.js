// authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const usersDB = [  // mock DB
  { id: 1, email: "user@example.com", password: bcrypt.hashSync("user123", 8), role: "user" },
  { id: 2, email: "admin@example.com", password: bcrypt.hashSync("admin123", 8), role: "admin" }
];

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = usersDB.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token, user: { email: user.email, role: user.role } });
};
