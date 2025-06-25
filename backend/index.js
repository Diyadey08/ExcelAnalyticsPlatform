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
dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", routes);

app.use(cors());

const PORT = 3000;

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
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
app.post("/save-chart", async (req, res) => {
  const { userId, uploadId, chartType, xKey, yKey } = req.body;

  const newChart = new Chart({
    userId: new mongoose.Types.ObjectId(userId), 
    uploadId: new mongoose.Types.ObjectId(uploadId),
    chartType,
    xKey,
    yKey,
  });

  await newChart.save();

  res.json({ message: "Chart saved" });
});

// Endpoint to upload file
app.post('/upload', upload.single('excel'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded or invalid file type.');
  }
try {
    const filePath = req.file.path;

    // Read the uploaded Excel file
    const workbook = XLSX.readFile(filePath);

    // // Get first sheet name
    // const sheetName = workbook.SheetNames[0];

    // // Convert sheet to JSON
    // const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

     const result = {};

    // Loop through all sheets
    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { defval: null }); // include nulls for empty cells
      result[sheetName] = data;
    });
    // Optional: Delete file after reading
    fs.unlinkSync(filePath);

    res.json({ sheets: result });
  } catch (error) {
    console.error('Error parsing Excel:', error);
    res.status(500).json({ error: 'Error parsing Excel file.' });
  }
  
});





app.listen(3000, () => console.log("Server running on http://localhost:3000"));
