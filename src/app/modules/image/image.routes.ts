import { Router } from "express";
import { upload } from "../../config/multer";
import { ImageController } from "./image.controller";

const route = Router();

route.post("/", upload.single("image"), ImageController.uploadImage);

route.get("/:slug", ImageController.getImageFIle);

export const ImageRouter = route;
