import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { IOrder } from "../../../interfaces/order";
import { IUser } from "../../../interfaces/user";

//* database *//
import { connect } from "../../../database/config";
import Order from "../../../database/models/Order";

type Data = { message: string } | IOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getAllOrders(req, res);

    default:
      return res.status(400).json({ message: "Bad request!" });
  }
}

const getAllOrders = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const session = await getToken({ req });
    if (!session) {
      return res.status(401).json({
        message: "Debe de estar autenticado",
      });
    }

    await connect();

    const { id } = session.user as IUser;
    const orders = await Order.find({ user: id })
      .lean()
      .populate("user", "name email");

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Revise logs del servidor.",
    });
  }
};
