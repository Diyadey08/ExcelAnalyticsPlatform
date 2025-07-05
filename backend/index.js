// index.js
import Chart from './models/Chart.js'
import express from "express";
import mongoose from "mongoose";
import routes from "./routes.js";  
import multer from 'multer';
import path from 'path';
import XLSX from 'xlsx';
import fs from 'fs';  
import cors from 'cors';
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/authMiddleware.js";
import ExcelRecod from './models/ExcelRecod.js';
import User from './models/User.js';
import jwt from "jsonwebtoken";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // exact origin of frontend
  credentials: true                // allow sending of cookies
}));
app.use(cookieParser());
app.use("/api", routes);
app.use("/api-auth", authRoutes);      // Auth routes (login, register)



const PORT = 3000;
// 📌 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});


// Filter to accept only Excel files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.xls', '.xlsx'];
  const ext = path.extname(file.originalname);
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .xls and .xlsx files are allowed!'));
  }
};

const upload = multer({ storage, fileFilter });
app.post("/save-chart", verifyToken, async (req, res) => {
  const { uploadId, chartType, xKey, yKey } = req.body;

  const newChart = new Chart({
    userId: new mongoose.Types.ObjectId(req.user.id),
    uploadId: new mongoose.Types.ObjectId(uploadId),
    chartType,
    xKey,
    yKey,
  });

  await newChart.save();
  res.json({ message: "Chart saved" });
});

// Endpoint to upload file
app.post("/upload", verifyToken, upload.single("excel"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");
console.log("Authenticated user:", req.user);  
  try {
     const { token } = req.body;

    // 🔐 Verify token from request body
    if (!token) return res.status(403).json({ message: "No token provided" });
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const userId = decoded.id;
      const userId = req.user.id;
    if (!req.file) return res.status(400).send("No file uploaded");

    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const result = {};

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { defval: null });
      result[sheetName] = data;
    });

    fs.unlinkSync(filePath); // Optional: cleanup uploaded file

    // Save only selected sheet's data
    const selectedSheetName = workbook.SheetNames[0];
    const selectedData = result[selectedSheetName];

    const record = new ExcelRecod({
      user: userId,
      fileName: req.file.originalname,
      sizeKB: req.file.size / 1024,
      data: selectedData,
    });

    await record.save();

    res.json({ sheets: result });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Error processing Excel file" });
  }
});

app.get('/user/history', verifyToken, async (req, res) => {
  const records = await ExcelRecod.find({ user: req.user.id })
    .sort({ uploadedAt: -1 })
    .select('-data'); // exclude full data
  res.json(records);
});



// ✅ Delete an uploaded ExcelRecord by ID
app.delete("/upload/:id", verifyToken, async (req, res) => {
  try {
    const recordId = req.params.id;

    // Ensure the user owns the record before deleting
    const record = await ExcelRecod.findOne({ _id: recordId, user: req.user.id });
    if (!record) {
      return res.status(404).json({ message: "Record not found or unauthorized" });
    }

    await ExcelRecod.deleteOne({ _id: recordId });
    res.json({ message: "Upload deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete record" });
  }
});
// ✅ Get full ExcelRecord data by ID
app.get("/upload/:id", verifyToken, async (req, res) => {
  try {
    const record = await ExcelRecod.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!record) return res.status(404).json({ message: "Not found" });
    res.json(record);
  } catch (err) {
    console.error("Error loading Excel data:", err);
    res.status(500).json({ error: "Failed to fetch record" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));