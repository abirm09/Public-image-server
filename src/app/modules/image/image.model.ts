import { model, Schema } from "mongoose";
import { TImage } from "./image.interface";

const ImageSchema = new Schema<TImage>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    base64: {
      type: String,
      required: true,
    },
    imgFormat: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
    desc: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "categories",
    },
  },
  { timestamps: true, versionKey: false }
);

export const Image = model<TImage>("images", ImageSchema);
