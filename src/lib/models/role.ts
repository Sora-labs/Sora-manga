import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false
  },
}, { timestamps: true });

export default mongoose.models?.roles || mongoose.model("roles", roleSchema);