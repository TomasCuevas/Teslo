import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import { connect } from "../../../database/config";
import ProductModel from "../../../database/models/Product";

//* interfaces *//
import { IProduct } from "../../../interfaces/products";

type Data = { message: string } | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);

    default:
      return res.status(200).json({ message: "Bad request" });
  }
}

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    await connect();

    const { slug } = req.query;

    const product = await ProductModel.findOne({ slug })
      .select("title images price inStock slug -_id")
      .lean();

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}/products/${image}`;
    });

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revise logs del servidor.",
    });
  }
};
