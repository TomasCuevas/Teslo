import { NextApiRequest } from "next";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

//* config *//
cloudinary.config(process.env.CLOUDINARY_URL || "");

const saveFile = async (file: formidable.File): Promise<string> => {
  const { secure_url } = await cloudinary.uploader.upload(file.filepath, {
    folder: "Teslo-Shop",
  });

  return secure_url;
};

export const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return reject(error);
      }

      const filePath = await saveFile(files.file as formidable.File);
      resolve(filePath);
    });
  });
};
