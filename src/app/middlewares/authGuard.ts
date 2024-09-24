import { NextFunction, Request, Response } from "express";

import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../config";
import ApiError from "../errorHandlers/ApiError";

const authGuard =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const secret = String(req.query?.secret);
      const isMatch = await bcrypt.compare(
        secret,
        String(config.ADD_IMAGE_SECRET_HASHED)
      );
      if (!isMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
      }
      req.secret = secret;
      next();
    } catch (error) {
      next(error);
    }
  };

export default authGuard;
