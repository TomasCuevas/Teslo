import { NextPage } from "next";

//* components *//
import { ProductList, FullScreenLoading } from "../components";

//* layout *//
import { ShopLayout } from "../components/layouts";

//* hooks
import { useGetProducts } from "../hooks/useGetProducts";

const HomePage: NextPage = () => {
  const { products } = useGetProducts("/products");

  return (
    <ShopLayout
      title="Teslo"
      pageDescription="Encuentra los mejores productos en Teslo"
    >
      <h2 className="mb-1 text-xl font-light">Todos los productos</h2>

      {products.length < 1 ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products} />
      )}
    </ShopLayout>
  );
};

export default HomePage;
