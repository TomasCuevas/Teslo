import type { NextApiRequest, NextApiResponse } from "next";

//* utils *//
import { verifyAdmin } from "../../../utils/verifyAdmin";

//* database *//
import ProductModel from "../../../database/models/Product";
import UserModel from "../../../database/models/User";
import OrderModel from "../../../database/models/Order";

type Data =
  | {
      numberOfClients: number;
      numberOfProducts: number;
      lowInventory: number;
      productsWithNoInventory: number;
      numberOfOrders: number;
      paidOrders: number;
      notPaidOrders: number;
    }
  | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getData(req, res);

    default:
      return res.status(400).json({ message: "Bad request!" });
  }
}
const getData = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await verifyAdmin(req, res);

    const [
      numberOfClients,
      numberOfProducts,
      lowInventory,
      productsWithNoInventory,
      numberOfOrders,
      paidOrders,
      notPaidOrders,
    ] = await Promise.all([
      UserModel.countDocuments({ role: "client" }),
      ProductModel.countDocuments(),
      ProductModel.countDocuments({ inStock: { $lte: 10 } }),
      ProductModel.countDocuments({ inStock: 0 }),
      OrderModel.countDocuments(),
      OrderModel.countDocuments({ isPaid: true }),
      OrderModel.countDocuments({ isPaid: false }),
    ]);

    return res.status(200).json({
      numberOfClients,
      numberOfProducts,
      lowInventory,
      productsWithNoInventory,
      numberOfOrders,
      paidOrders,
      notPaidOrders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revise los logs del servidor.",
    });
  }
};
