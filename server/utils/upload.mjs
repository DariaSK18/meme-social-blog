// not checked yet (still in progress)
import { v2 as cloudinary } from "./cloudinaryConfig.mjs";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "memes",
    allowed_formats: ["jpg","jpeg","png","gif"],
    transformation: [{ width: 800, crop: "limit" }],
  },
});

const parser = multer({ storage });

export default parser;
