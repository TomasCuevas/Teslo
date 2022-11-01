import type { NextApiRequest, NextApiResponse } from "next";

//* utils *//
import { verifyAdmin } from "../../../../utils/verifyAdmin";

//* database *//
import { connect } from "../../../../database/config";
import OrderModel from "../../../../database/models/Order";

//* interfaces *//
import { IOrder } from "../../../../interfaces/order";

type Data = { message: string } | IOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getOrders(req, res);

    default:
      return res.status(200).json({ message: "Bad request!" });
  }
}
const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await verifyAdmin(req, res);
    await connect();

    const orders = await OrderModel.find()
      .sort({ createdAt: "desc" })
      .populate("user", "name email")
      .lean();

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revise los logs del servidor.",
    });
  }
};
