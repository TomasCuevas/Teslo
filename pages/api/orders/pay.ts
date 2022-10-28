import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

//* utils *//
import { getPaypalBearerToken } from "../../../utils/getPaypalBearerToken";

//* database *//
import { connect } from "../../../database/config";
import OrderModel from "../../../database/models/Order";

//* interfaces *//
import { IPayPalOrderStatus } from "../../../interfaces/paypal";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad request!" });
  }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const paypalBearerToken = await getPaypalBearerToken();

    if (!paypalBearerToken) {
      return res.status(400).json({
        message: "No se pudo confirmar el token de paypal.",
      });
    }

    const { transactionId = "", orderId = "" } = req.body;

    const { data } = await axios.get<IPayPalOrderStatus>(
      `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${paypalBearerToken}`,
        },
      }
    );

    if (data.status !== "COMPLETED") {
      return res.status(404).json({
        message: "Orden no reconocida",
      });
    }

    await connect();

    const dbOrder = await OrderModel.findById(orderId);
    if (!dbOrder) {
      return res.status(404).json({
        message: "Orden no existe en nuestra base de datos",
      });
    }

    if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
      return res.status(400).json({
        message: "Los montos de PayPal y nuestra orden, no coinciden.",
      });
    }

    dbOrder.transactionId = transactionId;
    dbOrder.isPaid = true;
    await dbOrder.save();

    return res.status(200).json({
      message: "Orden pagada exitosamente.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revise logs del servidor.",
    });
  }
};
