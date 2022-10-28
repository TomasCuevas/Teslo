import { GetServerSideProps } from "next";
import type { NextPage } from "next";

//* components *//
import { ProductList } from "../../components/products/ProductList";

//* layout *//
import { ShopLayout } from "../../components/layouts/ShopLayout";

//* database *//
import { getProductsByTerm, getAllProducts } from "../../database/dbProducts";

//* interfaces *//
import { IProduct } from "../../interfaces/products";

interface Props {
  foundProducts: boolean;
  products: IProduct[];
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, query, foundProducts }) => {
  return (
    <ShopLayout
      title={`Teslo - Search | ${query}`}
      pageDescription="Encuentra los mejores productos en Teslo Shop"
    >
      {!foundProducts && (
        <h2 className="mb-3 text-center text-2xl font-light">
          No encontramos ningun producto
        </h2>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

//* server side rendering *//
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.trim().length < 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let products = await getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await getAllProducts();
  }

  return {
    props: {
      foundProducts,
      products,
      query,
    },
  };
};

export default SearchPage;
