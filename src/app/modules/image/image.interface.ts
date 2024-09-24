import { Document, Types } from "mongoose";
import { TCategory } from "../category/category.interface";

export type TImageData = {
  name: string;
  slug: string;
  base64: string;
  imgFormat: string;
  isPrivate: boolean;
  desc?: string;
  category: Types.ObjectId | TCategory;
};

export type TImage = TImageData & Document;
