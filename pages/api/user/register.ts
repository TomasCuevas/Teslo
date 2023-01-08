import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

//* database *//
import { connect } from "../../../database/config";
import UserModel from "../../../database/models/User";

//* utils *//
import { signToken } from "../../../utils/jwt";
import { isValidEmail } from "../../../utils/validations";

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
      return registerUser(req, res);

    default:
      return res.status(200).json({ message: "Bad request" });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    name = "",
    password = "",
  } = req.body as { email: string; name: string; password: string };

  await connect();

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: "El correo ingresado, no es un correo valido.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "La contraseña debe de ser de 6 caracteres como minimo.",
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: "El nombre debe de ser de 2 caracteres como minimo.",
    });
  }

  const user = await UserModel.findOne({ email: email.toLowerCase() });
  if (user) {
    return res.status(400).json({
      message: "El correo ingresado ya se encuentra registrado.",
    });
  }

  const newUser = new UserModel({
    email: email.toLowerCase(),
    name,
    password: bcrypt.hashSync(password),
    role: "client",
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }

  const { id, role } = newUser;

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
