import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const env = process.env;

const envMode = env.NODE_ENV || "production";

export default {
  ENV: envMode,
  PORT: env.PORT || 800,
  DBURL: env.DBURL,
  MAX_FILE_UPLOAD_COUNT: env.MAX_FILE_UPLOAD_COUNT || 5,
  CLIENT_SIDE_DOMAINS: env.CLIENT_SIDE_DOMAINS,
  ADD_IMAGE_SECRET_HASHED: env.ADD_IMAGE_SECRET_HASHED,
  GET_IMAGE_SECRET_HASHED: env.GET_IMAGE_SECRET_HASHED,
};
