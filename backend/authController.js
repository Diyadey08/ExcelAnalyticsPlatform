import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// 👤 Register (optional)
export const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ token, user: { email, role },id: newUser._id  });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// 🔐 Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
  // ✅ Set JWT cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set to true in production (HTTPS)
      sameSite: "Lax",
     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days// 1 hour
    });

    res.json({ message: "Login successful", token,  user: { email: user.email, role: user.role } });
    console.log(token);
    
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
