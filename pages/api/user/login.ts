import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

//* database *//
import { connect } from "../../../database/config";
import UserModel from "../../../database/models/User";

//* utils *//
import { signToken } from "../../../utils/jwt";

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
      return loginUser(req, res);

    default:
      return res.status(200).json({ message: "Bad request" });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "" } = req.body;

  await connect();

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Correo o contraseña no validos.",
    });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({
      message: "Correo o contraseña no validos.",
    });
  }

  const { role, name, id } = user;

  const token = signToken(id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      name,
      role,
    },
  });
};
