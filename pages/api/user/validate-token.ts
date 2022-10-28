import type { NextApiRequest, NextApiResponse } from "next";

//* database *//
import { connect } from "../../../database/config";
import UserModel from "../../../database/models/User";

//* utils *//
import { isValidToken, signToken } from "../../../utils/jwt";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return checkJWT(req, res);

    default:
      return res.status(200).json({ message: "Bad request" });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await isValidToken(token.toString());
  } catch (error) {
    return res.status(401).json({
      message: "Token de autorizacion no es valido.",
    });
  }

  await connect();

  const user = await UserModel.findById(userId).lean();
  if (!user) {
    return res.status(400).json({
      message: "No existe usuario con el ID ingresado en el token.",
    });
  }

  const { _id, email, name, role } = user;

  return res.status(200).json({
    token: signToken(_id, email),
    user: {
      email,
      role,
      name,
    },
  } as any);
};
