import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import { connect } from "../../../database/config";
import { SHOP_CONTANTS } from "../../../database/constants";
import ProductModel from "../../../database/models/Product";

//* interfaces *//
import { IProduct } from "../../../interfaces/products";

type Data = { message: string } | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await connect();

    const { gender = "all" } = req.query;
    let condition = {};

    if (gender !== "all" && SHOP_CONTANTS.valid_genders.includes(`${gender}`)) {
      condition = { gender };
    }

    const products = await ProductModel.find(condition)
      .select("title images price inStock slug -_id")
      .lean();

    products.map((product) => {
      product.images = product.images.map((image) => {
        return image.includes("http")
          ? image
          : `${process.env.HOST_NAME}products/${image}`;
      });
    });

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revise logs del servidor.",
    });
  }
};
