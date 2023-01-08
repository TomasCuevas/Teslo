import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { IOrder } from "../../../interfaces/order";

//* database *//
import { connect } from "../../../database/config";
import Order from "../../../database/models/Order";
import { IUser } from "../../../interfaces/user";

type Data = { message: string } | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad request!" });
  }
}

const getOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const session = await getToken({ req });
    if (!session) {
      return res.status(401).json({
        message: "Debe de estar autenticado",
      });
    }

    await connect();

    const order = await Order.findById(req.query.id);
    if (!order) {
      return res.status(404).json({
        message: "No se encontro orden con el ID ingresado.",
      });
    }

    if (order.user?.toString() !== (session.user as IUser).id) {
      return res.status(404).json({
        message: "No posee los permisos necesarios.",
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
