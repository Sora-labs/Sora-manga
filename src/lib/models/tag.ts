import mongoose from "mongoose";

const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false
  },
}, { timestamps: true });

export default mongoose.model("tags", tagSchema);