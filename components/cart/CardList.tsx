import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/future/image";

//* components *//
import { ItemCounter } from "../";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

//* interfaces *//
import { ICartProduct } from "../../interfaces/cart";
import { IOrderItem } from "../../interfaces/order";

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CardList: React.FC<Props> = ({ editable = false, products }) => {
  const {
    cart: { cartItems },
    updateCartQuantity,
    deleteCart,
  } = useContext(CartContext);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const productsToShow = products ? products : cartItems;

  return (
    <>
      {hasMounted &&
        productsToShow.map((product) => (
          <article
            key={`${product.slug}${product.size}`}
            className="flex gap-5"
          >
            <div className="group w-3/12">
              <NextLink href={`/product/${product.slug}`} passHref>
                <a className="relative h-full w-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={0}
                    height={0}
                    className=" w-full rounded-md"
                    sizes="100%"
                  />
                  <div className="absolute left-0 top-0 h-full w-full transition-all duration-300 group-hover:bg-primary/5" />
                </a>
              </NextLink>
            </div>
            <div className="flex w-8/12 flex-col gap-1">
              <h3 className="text-gray lg:text-xl xl:text-2xl">
                {product.title}
              </h3>
              <span className="text-gray lg:text-lg">
                Talla: <strong className="text-primary">{product.size}</strong>
              </span>
              {editable ? (
                <ItemCounter
                  count={product.quantity}
                  modifyCount={updateCartQuantity}
                  product={product as ICartProduct}
                />
              ) : (
                <span className="text-gray underline">
                  {product.quantity} productos
                </span>
              )}
            </div>
            <div className="flex w-3/12 flex-col items-center lg:gap-2">
              <span className="text-lg font-bold text-primary lg:text-xl">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
              {editable && (
                <button
                  onClick={() => deleteCart(product as ICartProduct)}
                  className="rounded-lg px-1 py-2 text-sm font-bold text-secundary transition-all duration-300 hover:bg-secundary/10 lg:text-base"
                >
                  Remover
                </button>
              )}
            </div>
          </article>
        ))}
    </>
  );
};
