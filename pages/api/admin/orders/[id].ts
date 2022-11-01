import type { NextApiRequest, NextApiResponse } from "next";

//* utils *//
import { verifyAdmin } from "../../../../utils/verifyAdmin";

//* database *//
import { connect } from "../../../../database/config";
import OrderModel from "../../../../database/models/Order";

//* interfaces *//
import { IOrder } from "../../../../interfaces/order";

type Data = { message: string } | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getOrder(req, res);

    default:
      return res.status(200).json({ message: "Bad request!" });
  }
}
const getOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await verifyAdmin(req, res);
    await connect();

    const order = await OrderModel.findById(req.query.id)
      .populate("user", "name email")
      .lean();
    if (!order) {
      return res.status(404).json({
        message: "No se encontro orden con el ID ingresado.",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revise los logs del servidor.",
    });
  }
};
