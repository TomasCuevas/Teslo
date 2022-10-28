import { isValidObjectId } from "mongoose";
import { IOrder } from "../interfaces/order";
import { connect } from "./config";
import OrderModel from "./models/Order";

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await connect();

  const order = await OrderModel.findById(id).lean();
  if (!order) {
    return null;
  }

  order.orderItems = order.orderItems.map((item) => {
    item.image = item.image.includes("http")
      ? item.image
      : `${process.env.HOST_NAME}/products/${item.image}`;
    return item;
  });

  return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUser = async (
  userId: string
): Promise<IOrder[] | []> => {
  if (!isValidObjectId(userId)) {
    return [];
  }

  await connect();

  const orders = await OrderModel.find({ user: userId })
    .lean()
    .populate("user", "name email");
  if (!orders) {
    return [];
  }

  return JSON.parse(JSON.stringify(orders));
};
