import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import { connect } from "../../database/config";
import ProductModel from "../../database/models/Product";
import UserModel from "../../database/models/User";
import OrderModel from "../../database/models/Order";

//* seed data *//
import { initialData } from "../../database/seed-data";

type Data =
  | {
      ok: boolean;
    }
  | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res
      .status(401)
      .json({ message: "No tiene acceso a este servicio," });
  }

  await connect();

  await UserModel.deleteMany();
  await UserModel.insertMany(initialData.users);

  await ProductModel.deleteMany();
  await ProductModel.insertMany(initialData.products);

  await OrderModel.deleteMany();

  res.status(200).json({ ok: true });
}
