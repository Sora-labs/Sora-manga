import mongoose from "mongoose";

const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  }
}, { timestamps: true });

export default mongoose.models?.tags || mongoose.model("tags", tagSchema);