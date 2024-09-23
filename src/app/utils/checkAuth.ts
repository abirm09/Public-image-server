import bcrypt from "bcrypt";
import config from "../config";

const checkAuth = async (secret: string) => {
  const isMatch = await bcrypt.compare(
    secret,
    String(config.ADD_IMAGE_SECRET_HASHED)
  );
  return isMatch;
};

export default checkAuth;
