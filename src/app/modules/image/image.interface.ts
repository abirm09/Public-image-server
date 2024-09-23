import { Document } from "mongoose";

export type TImageData = {
  name: string;
  slug: string;
  base64: string;
  imgFormat: string;
};

export type TImage = TImageData & Document;
