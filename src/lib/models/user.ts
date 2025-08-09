import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: false,
  },
  bg_url: {
    type: String,
    required: false,
  }
}, { timestamps: true });

export default mongoose.models.users || mongoose.model("users", userSchema);