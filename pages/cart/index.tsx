import { useContext, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* layout *//
import { ShopLayout, LoadingLayout } from "../../components/layouts";

//* components *//
import { CardList, OrderSummary } from "../../components";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

const CartPage: NextPage = () => {
  const router = useRouter();
  const { numberOfItems, isLoaded } = useContext(CartContext);

  useEffect(() => {
    if (isLoaded && numberOfItems === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, numberOfItems, router]);

  if (isLoaded && numberOfItems > 0) {
    return (
      <ShopLayout
        title={`Carrito - ${numberOfItems} productos`}
        pageDescription="Carrito de compras de la tienda"
      >
        <h1 className="mb-1 text-3xl font-bold">Carrito</h1>
        <div className="flex flex-col gap-5 sm:flex-row">
          <section className="flex w-full animate-fadeIn flex-col gap-5 sm:w-8/12">
            <CardList editable />
          </section>
          <section className="w-full animate-fadeIn sm:w-4/12">
            <h2 className="text-lg text-gray sm:text-xl">Orden</h2>
            <hr className="my-2 text-gray/30" />
            <OrderSummary />
            <button
              onClick={() => router.push("/checkout/address")}
              className="mt-5 w-full rounded-lg bg-secundary py-[6px] text-sm font-bold text-white transition-all duration-300 hover:bg-secundary/80"
            >
              Checkout
            </button>
          </section>
        </div>
      </ShopLayout>
    );
  }

  return <LoadingLayout title="Cargando" />;
};

export default CartPage;
