import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { TErrorMessages } from "../types/response";

export const notFoundRoute = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const message = "Not found";
  const errorMessages: TErrorMessages[] = [
    {
      path: req.originalUrl,
      message,
    },
  ];
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message,
    errorMessages,
  });
};
