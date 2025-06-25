import multer from "multer";
import mongoose from "mongoose";
import Upload from "../models/Upload.js";

const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  const { userId } = req.body;

  const newUpload = new Upload({
    userId: new mongoose.Types.ObjectId(userId),
    fileName: req.file.originalname,
    fileSize: req.file.size,
  });

  await newUpload.save();

  res.json({ uploadId: newUpload._id });
});
