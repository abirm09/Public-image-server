import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const env = process.env;

const envMode = env.NODE_ENV || "production";

export default {
  ENV: envMode,
  PORT: env.PORT || 800,
  DBURL:
    envMode === "development"
      ? env.DBURL_DEV ||
        "mongodb://localhost:27017/img_server_DB?replicaSet=rs1"
      : env.DBURL,
  MAX_FILE_UPLOAD_COUNT: env.MAX_FILE_UPLOAD_COUNT || 5,
};
