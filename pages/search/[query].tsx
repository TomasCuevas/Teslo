import { NextPage } from "next";
import { useRouter } from "next/router";

//* components *//
import { ProductList, FullScreenLoading } from "../../components";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* hooks *//
import { useSearchProducts } from "../../hooks";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { query } = router.query as { query: string };

  const { error, products } = useSearchProducts(query);

  if (products.length > 0) {
    return (
      <ShopLayout
        title={`Teslo - Search | ${query}`}
        pageDescription="Encuentra los mejores productos en Teslo Shop"
      >
        {error && (
          <h2 className="mb-3 text-center text-2xl font-light">
            No encontramos ningun producto
          </h2>
        )}

        <ProductList products={products} />
      </ShopLayout>
    );
  }

  return (
    <ShopLayout
      title="Teslo | Search"
      pageDescription="Encuentra los mejores productos en Teslo Shop"
    >
      <FullScreenLoading />
    </ShopLayout>
  );
};

export default SearchPage;
