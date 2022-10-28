import mongoose, { Schema, model, Model } from "mongoose";

//* interface *//
import { IProduct } from "../../interfaces/products";

const productSchema = new Schema(
  {
    description: { type: String, required: true, default: "" },
    images: [{ type: String }],
    inStock: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    sizes: [
      {
        type: String,
        enum: {
          values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
          message: "{VALUE} no es un tamaño valido",
        },
      },
    ],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true, default: "" },
    type: {
      type: String,
      enum: {
        values: ["shirts", "pants", "hoodies", "hats"],
        message: "{VALUE} no es un tipo valido",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["men", "women", "kid", "unisex"],
        message: "{VALUE} no es un genero valido",
      },
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ title: "text", tags: "text", description: "text" });

const ProductModel: Model<IProduct> =
  mongoose.models.products || model("products", productSchema);

export default ProductModel;
