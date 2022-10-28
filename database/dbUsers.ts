import bcrypt from "bcryptjs";

//* database *//
import { connect } from "./config";
import UserModel from "./models/User";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await connect();

  const user = await UserModel.findOne({ email });
  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password!)) return null;

  const { name, role, _id } = user;

  return {
    _id,
    email: email.toLowerCase(),
    name,
    role,
  };
};

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await connect();

  const user = await UserModel.findOne({ email: oAuthEmail });

  if (user) {
    const { _id, name, email, role } = user;
    return { _id, name, email, role };
  }

  const newUser = await new UserModel({
    email: oAuthEmail,
    name: oAuthName,
    password: "@",
    role: "client",
  });
  await newUser.save();

  const { _id, name, email, role } = newUser;
  return { _id, name, email, role };
};
