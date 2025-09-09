import mongoose from "mongoose";

const { Schema } = mongoose;

const pageSchema = new Schema({
  pageNum: {
    type: String,
    required: true,
  },
  mangaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mangas',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.pages ?? mongoose.model("pages", pageSchema);