// models/Upload.js
import mongoose from "mongoose";
const uploadSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  fileName: String,
  fileSize: Number,
  uploadedAt: { type: Date, default: Date.now },
});
export default mongoose.models.Upload || mongoose.model("Upload", uploadSchema);
