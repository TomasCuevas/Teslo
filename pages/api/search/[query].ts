import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import { connect } from "../../../database/config";
import ProductModel from "../../../database/models/Product";

//* interfaces *//
import { IProduct } from "../../../interfaces/products";

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProduct(req, res);

    default:
      return res.status(200).json({ message: "Bad request" });
  }
}

const searchProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    let { query = "" } = req.query;
    query = query.toString().toLowerCase();

    if (query.length < 1) {
      return res.status(400).json({
        message: "Debe de especificar el query a buscar",
      });
    }

    await connect();

    const products = await ProductModel.find({ $text: { $search: query } })
      .select("title images price inStock slug -_id")
      .lean();
    if (!products) {
      return res.status(404).json({
        message: "No se encontraron productos que coincidan con la busqueda.",
      });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revise logs del servidor.",
    });
  }
};
