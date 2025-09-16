import mongoose from "mongoose";
import role from "./role";

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
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles',
  }
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  if (!this.role) {
    try {
      const defaultRole = await role.findOne({ name: 'Default user' });

      if (defaultRole) {
        this.role = defaultRole._id;
      } else {
        console.error("Default role 'Default user' not found.");
      }
    } catch (err: any) {
      return next(err);
    }
  }
  next();
});

export default mongoose.models.users || mongoose.model("users", userSchema);