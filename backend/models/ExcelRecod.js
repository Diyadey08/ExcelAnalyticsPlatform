import mongoose from "mongoose";

const ExcelRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  data: {
    type: Array, // full sheet data
    required: true
  },
  sizeKB: {
    type: Number,
    default: 0
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  ipfsHash: {
  type: String
},
pinataUrl: {
  type: String
}

});

export default mongoose.model('ExcelRecord', ExcelRecordSchema);
