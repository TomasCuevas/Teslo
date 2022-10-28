import NextLink from "next/link";
import type { NextPage } from "next";

//* icons *//
import { RemoveShoppingCartOutlined } from "@mui/icons-material";

//* layout *//
import { ShopLayout } from "../../components/layouts/ShopLayout";

const EmptyPage: NextPage = () => {
  return (
    <ShopLayout
      title="Carrito vacio"
      pageDescription="No hay articulos en el carrito de compras"
    >
      <div className="flex h-[calc(100vh_-_200px)] animate-fadeIn flex-col items-center justify-center gap-2 sm:flex-row">
        <RemoveShoppingCartOutlined className="text-[100px] text-primary sm:text-[150px]" />
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="text-primary sm:text-2xl">Su carrito esta vacio</h1>
          <NextLink href="/" passHref>
            <a className="text-5xl text-secundary hover:underline">Regresar</a>
          </NextLink>
        </div>
      </div>
    </ShopLayout>
  );
};

export default EmptyPage;
