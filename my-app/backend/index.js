// index.js
require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const multer = require('multer');
const path = require('path');

app.use(express.json());

app.use("/api", routes);


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

// Endpoint to upload file
app.post('/upload', upload.single('excel'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded or invalid file type.');
  }

  res.send(`File uploaded: ${req.file.filename}`);
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
