import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import successResponse from "../../utils/successResponse";
import { ImageService } from "./images.service";

const getImageFIle = catchAsync(async (req, res) => {
  const { imgBuffer, mimeType } = await ImageService.GetImageFIleFromDB(
    req?.params?.slug,
    String(req.query.secret)
  );
  res.set("Content-Type", mimeType);
  res.set("Content-Length", imgBuffer.length.toString());
  res.send(imgBuffer);
});

const uploadImage = catchAsync(async (req, res) => {
  const file = req.file as Express.Multer.File;
  await ImageService.uploadImageIntoDB(file, req.body);

  successResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Image created successfully!",
  });
});

export const ImageController = { uploadImage, getImageFIle };
