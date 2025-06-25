// models/User.js
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.User || mongoose.model("User", userSchema);
