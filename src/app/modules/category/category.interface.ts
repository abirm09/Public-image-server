import { Document } from "mongoose";

export type TCategoryData = {
  name: string;
  slug: string;
};

export type TCategory = TCategoryData & Document;
