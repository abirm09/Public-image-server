import { Router } from "express";
import { upload } from "../../config/multer";
import authGuard from "../../middlewares/authGuard";
import { ImageController } from "./image.controller";

const route = Router();

route.post(
  "/",
  authGuard(),
  upload.single("image"),
  ImageController.uploadImage
);

route.get("/:slug", ImageController.getImageFIle);

export const ImageRouter = route;
