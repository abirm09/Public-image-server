import httpStatus from "http-status";
import ApiError from "../../errorHandlers/ApiError";
import checkAuth from "../../utils/checkAuth";
import { notFoundImage } from "./image.const";
import { TImageData } from "./image.interface";
import { Image } from "./image.model";

/**
 * The function `uploadImageIntoDB` uploads an image file into a database along with additional
 * metadata.
 * @param file - The `file` parameter in the `uploadImageIntoDB` function is of type
 * `Express.Multer.File`, which represents a file uploaded via a form. It contains information about
 * the uploaded file such as the file buffer and mimetype.
 * @param {TImageData} payload - The `payload` parameter in the `uploadImageIntoDB` function represents
 * an object of type `TImageData`. This object likely contains information related to the image data
 * that needs to be uploaded into the database. The properties of `TImageData` could include:
 */
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
    slug: payload?.name?.split(" ").join("-").toLowerCase(),
    base64: base64Image,
    imgFormat: (file as Express.Multer.File).mimetype,
    isPrivate: payload?.isPrivate,
    desc: payload?.desc,
    category: payload?.category,
  });
  await image.save();
};

/**
 * The function `GetImageFileFromDB` retrieves an image file from a database based on a provided slug
 * and secret, handling private images and returning the image buffer and MIME type.
 * @param {string} slug - The `slug` parameter is a string that represents a unique identifier for the
 * image file in the database. It is used to retrieve the image file based on this identifier.
 * @param {string} secret - The `secret` parameter is a string that is used for authentication purposes
 * when checking if the image is private or not.
 * @returns The function `GetImageFIleFromDB` returns an object with two properties: `imgBuffer` and
 * `mimeType`. The `imgBuffer` property contains a Buffer object representing the image file retrieved
 * from the database or a default not found image if the image is not found. The `mimeType` property
 * contains a string representing the MIME type of the image file, either retrieved from the database
 */
const GetImageFIleFromDB = async (slug: string, secret: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let image: any = await Image.findOne({ slug: slug.toLowerCase() });

  if (image?.isPrivate) {
    const result = await checkAuth(secret);
    if (!result) image = undefined;
  }
  let imgBuffer;
  let mimeType;
  if (!image) {
    imgBuffer = Buffer.from(notFoundImage, "base64");
    mimeType = "image/jpeg";
  } else {
    imgBuffer = Buffer.from(image?.base64, "base64");
    mimeType = image?.imgFormat;
  }

  return { imgBuffer, mimeType };
};

const GetImageStringFromDB = async (slug: string, secret: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let image: any = await Image.findOne({ slug: slug.toLowerCase() });

  if (image?.isPrivate) {
    const result = await checkAuth(secret);
    if (!result) image = undefined;
  }
  let imgString;
  if (!image) {
    imgString = `data:image/jpeg;base64,${notFoundImage}`;
  } else {
    imgString = `data:${image.imgFormat};base64,${image?.base64}`;
  }

  return imgString;
};

export const ImageService = {
  uploadImageIntoDB,
  GetImageFIleFromDB,
  GetImageStringFromDB,
};
