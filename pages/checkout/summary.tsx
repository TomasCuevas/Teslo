/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* components *//
import {
  CardList,
  OrderSummary,
  OrderDirection,
  ButtonPrimary,
  Chip,
  FullScreenLoading,
} from "../../components";

//* hooks *//
import { useAuthenticated } from "../../hooks";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

const SummaryPage: NextPage = () => {
  const { isAuthenticated } = useAuthenticated();
  const { numberOfItems, createOrder } = useContext(CartContext);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onCreateOrder = async () => {
    setIsPosting(true);

    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };

  useEffect(() => {
    if (numberOfItems === 0) router.push("/");
  }, []);

  if (isAuthenticated === "unauthenticated") {
    router.push("/auth/login?p=/checkout/summary");
  }
  if (isAuthenticated === "authenticated" && numberOfItems > 0) {
    return (
      <ShopLayout
        title="Resumen de orden"
        pageDescription="Resumen de la orden"
      >
        <h1 className="mb-1 text-3xl font-bold text-primary">
          Resumen de la orden
        </h1>
        <div className="flex animate-fadeIn flex-col gap-5 sm:flex-row">
          <section className="flex w-full flex-col gap-5 sm:w-8/12">
            <CardList />
          </section>
          <section className="w-full sm:w-4/12">
            <h2 className="text-lg text-gray sm:text-xl">
              Resumen ({numberOfItems}) productos
            </h2>
            <hr className="my-4 text-gray/30" />
            <OrderDirection />
            <hr className="my-4 text-gray/30" />
            <div className="flex justify-end">
              <NextLink href="/cart" passHref>
                <a className="text-secundary hover:underline">Editar</a>
              </NextLink>
            </div>
            <OrderSummary />
            <div className="mt-5">
              <ButtonPrimary
                text="Confirmar orden"
                type="submit"
                disabled={isPosting}
                onClick={onCreateOrder}
              />
            </div>
            {errorMessage && <Chip text={errorMessage} status="error" />}
          </section>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout title="Resumen de orden" pageDescription="Resumen de la orden">
      <FullScreenLoading />
    </ShopLayout>
  );
};

export default SummaryPage;
