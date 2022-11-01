import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import { connect } from "../../../database/config";
import ProductModel from "../../../database/models/Product";

//* utils *//
import { verifyAdmin } from "../../../utils";

//* interfaces *//
import { IProduct } from "../../../interfaces/products";

type Data = { message: string } | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProduct(req, res);

    default:
      return res.status(400).json({ message: "Bad request!" });
  }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await verifyAdmin(req, res);
    await connect();

    let product = await new ProductModel();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor.",
    });
  }
};
