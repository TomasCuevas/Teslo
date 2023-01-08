import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { IOrder } from "../../../interfaces/order";
import { IUser } from "../../../interfaces/user";

//* database *//
import { connect } from "../../../database/config";
import Product from "../../../database/models/Product";
import Order from "../../../database/models/Order";

type Data = { message: string } | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad request!" });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const session = await getToken({ req });
    if (!session) {
      return res.status(400).json({
        message: "Debe de estar autenticado.",
      });
    }

    const { orderItems, total } = req.body as IOrder;

    const productsIds = orderItems.map((product) => product._id);
    await connect();

    const dbProducts = await Product.find({ _id: { $in: productsIds } });

    const subtotal = orderItems.reduce((prevState, current) => {
      const currentPrice = dbProducts.find(
        (product) => product.id.toString() === current._id
      )?.price;
      if (!currentPrice) {
        throw new Error("Verifique el carrito. Producto no existe.");
      }

      return currentPrice * current.quantity + prevState;
    }, 0);

    const taxes = Number(((subtotal * 15) / 100).toFixed(2));
    const backendTotal = Number((subtotal + taxes).toFixed(2));

    if (total !== backendTotal) {
      return res.status(400).json({
        message: "El total no cuadra con el monto.",
      });
    }

    const { id } = session.user as IUser;
    const newOrder = new Order({ ...req.body, isPaid: false, user: id });
    await newOrder.save();

    return res.status(200).json(newOrder);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Revise logs del servidor.",
    });
  }
};
