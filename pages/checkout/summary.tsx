/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

//* layout *//
import { ShopLayout, LoadingLayout } from "../../components/layouts";

//* components *//
import {
  CardList,
  OrderSummary,
  OrderDirection,
  ButtonPrimary,
  Chip,
} from "../../components";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

const SummaryPage: NextPage = () => {
  const { status } = useSession();
  const {
    cart: { numberOfItems },
    createOrder,
  } = useContext(CartContext);

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

  if (status === "unauthenticated") {
    router.push("/auth/login?p=/checkout/summary");
  }
  if (status === "authenticated") {
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

  return <LoadingLayout title="Cargando" />;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { firstName, lastName, address, zip, city, country, phone } =
    req.cookies;

  if (
    !firstName ||
    !lastName ||
    !address ||
    !zip ||
    !city ||
    !country ||
    !phone
  ) {
    return {
      redirect: {
        destination: "/checkout/address",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SummaryPage;
