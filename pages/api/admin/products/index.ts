import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";

//* database *//
import { connect } from "../../../../database/config";
import ProductModel from "../../../../database/models/Product";

//* utils *//
import { verifyAdmin } from "../../../../utils/verifyAdmin";

//* interfaces *//
import { IProduct } from "../../../../interfaces/products";

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "POST":
      return createProduct(req, res);
    case "PUT":
      return updateProduct(req, res);

    default:
      return res.status(400).json({ message: "Bad request!" });
  }
}

//* GET *//
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await verifyAdmin(req, res);
    await connect();

    const products = await ProductModel.find().sort({ title: "asc" }).lean();

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Revisar logs del servidor.",
    });
  }
};

//* POST *//
const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    await verifyAdmin(req, res);

    const { images = [] } = req.body as IProduct;

    if (images.length < 2) {
      return res.status(400).json({
        message: "El producto necesita al menos 2 imagenes.",
      });
    }

    await connect();

    const productInDB = await ProductModel.findOne({ slug: req.body.slug });
    if (productInDB) {
      return res.status(400).json({
        message: "Ya existe un producto con ese slug.",
      });
    }

    const product = new ProductModel(req.body);
    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Revisar logs del servidor.",
    });
  }
};

//* PUT *//
const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    await verifyAdmin(req, res);

    const { _id = "", images = [] } = req.body as IProduct;

    if (!isValidObjectId(_id)) {
      return res.status(400).json({
        message: "El ID del producto no es valido.",
      });
    }

    if (images.length < 2) {
      return res.status(400).json({
        message: "Es necesario al menos 2 imagenes.",
      });
    }

    await connect();

    const product = await ProductModel.findById(_id);
    if (!product) {
      return res.status(404).json({
        message: "No existe producto con el ID ingresado.",
      });
    }

    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId] = image.substring(image.lastIndexOf("/") + 1).split(".");

        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.update(req.body);
    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor.",
    });
  }
};
