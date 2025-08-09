import mongoose from "mongoose";

const { Schema } = mongoose;

const mangaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false
  },
  tags: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }],
    required: true,
  },
  uploaderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: false,
  },
  cover_url: {
    type: String,
    required: true,
  },
  background_url: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ["series", "oneshot"],
    required: true,
  }
}, { timestamps: true });

export default mongoose.models.manga ?? mongoose.model("manga", mangaSchema);