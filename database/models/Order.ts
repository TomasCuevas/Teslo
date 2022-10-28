import mongoose, { Model, model, Schema } from "mongoose";

//* interfaces *//
import { IOrder } from "../../interfaces/order";

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    orderItems: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "products", required: true },
        title: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      address2: { type: String },
      city: { type: String, required: true },
      country: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
      zip: { type: String, required: true },
    },
    numberOfItems: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    total: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: String },
    transactionId: { type: String },
  },
  {
    timestamps: true,
  }
);

const OrderModel: Model<IOrder> =
  mongoose.models.orders || model("orders", OrderSchema);

export default OrderModel;
