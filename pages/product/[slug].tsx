import { useContext, useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";

//* database *//
import {
  getAllProductSlugs,
  getProductBySlug,
} from "../../database/dbProducts";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* components *//
import { ProductSlideshow, SizeSelector, ItemCounter } from "../../components";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

//* interfaces *//
import { ICartProduct } from "../../interfaces/cart";
import { IValidSizes, IProduct } from "../../interfaces/products";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    gender: product.gender,
    image: product.images[0],
    inStock: product.inStock,
    price: product.price,
    quantity: 1,
    slug: product.slug,
    title: product.title,
    size: undefined,
  });

  const onSelectedSize = (size: IValidSizes) => {
    setTempCartProduct({ ...tempCartProduct, size: size });
  };

  const onSelectedQuantity = (add: boolean) => {
    let quantity = add
      ? tempCartProduct.quantity + 1
      : tempCartProduct.quantity - 1;

    if (quantity > tempCartProduct.inStock) quantity = tempCartProduct.inStock;
    if (quantity < 1) quantity = 1;

    setTempCartProduct({ ...tempCartProduct, quantity });
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;

    addProductToCart(tempCartProduct);
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <article className="flex w-full flex-col gap-10 sm:flex-row">
        <section className="sm:w-7/12">
          <ProductSlideshow images={product.images} />
        </section>
        <section className="flex flex-col gap-5 sm:w-5/12">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-primary">{product.title}</h1>
            <span className="text-lg font-bold">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span>Cantidad</span>
            <ItemCounter
              modifyCount={onSelectedQuantity}
              count={tempCartProduct.quantity}
              product={tempCartProduct}
            />
            <SizeSelector
              sizes={product.sizes}
              selectedSize={tempCartProduct.size}
              changeSize={onSelectedSize}
            />
          </div>
          <div>
            {product.inStock > 0 ? (
              <button
                onClick={onAddProduct}
                className="w-full rounded-lg bg-secundary py-[6px] text-sm font-bold text-white transition-all duration-300 hover:bg-secundary/80"
              >
                {tempCartProduct.size
                  ? "Agregar al Carrito"
                  : "Seleccione una talla"}
              </button>
            ) : (
              <span className="flex h-10 w-full items-center justify-center rounded-3xl border border-red-700 font-bold text-red-700">
                No hay disponibles
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-primary">
              Descripcion
            </span>
            <p className="text-sm font-normal leading-5 text-gray">
              {product.description}
            </p>
          </div>
        </section>
      </article>
    </ShopLayout>
  );
};

//* static side generation *//
//* static side generation *//
export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllProductSlugs();

  return {
    paths: slugs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
