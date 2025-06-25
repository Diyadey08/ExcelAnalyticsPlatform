// models/Chart.js
const chartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  uploadId: mongoose.Schema.Types.ObjectId,
  chartType: String,
  xKey: String,
  yKey: String,
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Chart || mongoose.model("Chart", chartSchema);