import httpStatus from "http-status";
import ApiError from "../../errorHandlers/ApiError";
import { TImageData } from "./image.interface";
import { Image } from "./image.model";

const uploadImageIntoDB = async (
  file: Express.Multer.File,
  payload: TImageData
) => {
  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No file found");
  }

  const base64Image = (file as Express.Multer.File)?.buffer?.toString("base64");

  const image = new Image({
    name: payload.name,
    slug: payload?.name?.split(" ").join("-"),
    base64: base64Image,
    imgFormat: (file as Express.Multer.File).mimetype,
  });
  await image.save();
};

const GetImageFIleFromDB = async (slug: string) => {
  const image = await Image.findOne({ slug });
  let imgBuffer;
  let mimeType;
  if (!image) {
    imgBuffer = Buffer.from("oiwee", "base64");
    mimeType = "image/jpeg";
  } else {
    imgBuffer = Buffer.from(image?.base64, "base64");
    mimeType = image?.imgFormat;
  }

  return { imgBuffer, mimeType };
};

export const ImageService = {
  uploadImageIntoDB,
  GetImageFIleFromDB,
};
