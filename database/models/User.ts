import mongoose, { Model, model, Schema } from "mongoose";

//* interfaces *//
import { IUser } from "../../interfaces/user";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "client"],
        message: "{VALUE} no es un rol valido",
      },
      default: "client",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.method("toJSON", function () {
  const user = this.toObject();

  user.id = user._id;
  delete user._id;

  return user;
});

const UserModel: Model<IUser> =
  mongoose.models.users || model("users", UserSchema);

export default UserModel;
