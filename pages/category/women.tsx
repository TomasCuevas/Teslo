import { NextPage } from "next";

//* components *//
import { ProductList, FullScreenLoading } from "../../components";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* hooks
import { useGetProducts } from "../../hooks/useGetProducts";

const HomePage: NextPage = () => {
  const { products } = useGetProducts("/products?gender=women");

  return (
    <ShopLayout
      title="Teslo | Women"
      pageDescription="Encuentra los mejores productos para mujeres en Teslo"
    >
      <h2 className="mb-1 text-xl font-light">Productos de Mujeres</h2>

      {products.length < 1 ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products} />
      )}
    </ShopLayout>
  );
};

export default HomePage;
