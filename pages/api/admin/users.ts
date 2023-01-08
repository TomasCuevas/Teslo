import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";

//* utils *//
import { verifyAdmin } from "../../../utils/verifyAdmin";

//* database *//
import { connect } from "../../../database/config";
import UserModel from "../../../database/models/User";

//* interfaces *//
import { IUser } from "../../../interfaces/user";

type Data = { message: string } | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);

    case "PUT":
      return updateUser(req, res);

    default:
      return res.status(400).json({ message: "Example" });
  }
}
const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await verifyAdmin(req, res);
    await connect();

    const users = await await UserModel.find().select("-password").lean();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revise los logs del servidor",
    });
  }
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await verifyAdmin(req, res);

    const { userId = "", newRole = "" } = req.body;
    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        message: "El ID ingresado no es un ID de mongo valido.",
      });
    }

    const validRoles = ["admin", "client"];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({
        message: "Rol no permitido. [admin, client]",
      });
    }

    await connect();

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: `Usuario no encontrado con el ID ingresado: ${userId}`,
      });
    }

    user.role = newRole;
    await user.save();

    return res.status(200).json({
      message: "Usuario actualizado.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revise los logs del servidor",
    });
  }
};
