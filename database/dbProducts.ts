//* database *//
import { connect } from "./config";
import ProductModel from "./models/Product";

//* interface *//
import { IProduct } from "../interfaces/products";

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await connect();

  const product = await ProductModel.findOne({ slug }).lean();
  if (!product) return null;

  product.images = product.images.map((image) => {
    return image.includes("http")
      ? image
      : `${process.env.HOST_NAME}products/${image}`;
  });

  return JSON.parse(JSON.stringify(product));
};

interface Returns {
  slug: string;
}

export const getAllProductSlugs = async (): Promise<Returns[]> => {
  await connect();

  const slugs = await ProductModel.find().select("slug -_id").lean();

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  term = term.toString().toLowerCase();

  await connect();
  const products = await ProductModel.find({
    $text: { $search: term },
  })
    .select("title images price inStock slug -_id")
    .lean();

  products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });
  });

  return products;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await connect();

  const products = await ProductModel.find().lean();

  products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });
  });

  return JSON.parse(JSON.stringify(products));
};
