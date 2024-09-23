import multer from "multer";

const storage = multer.memoryStorage(); // Store image in memory
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});
