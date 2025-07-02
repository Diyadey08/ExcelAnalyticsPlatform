

import mongoose from "mongoose";

const chartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExcelRecord",
    required: true,
  },
  chartType: String,
  xKey: String,
  yKey: String,
}, { timestamps: true });

export default mongoose.model("Chart", chartSchema);
