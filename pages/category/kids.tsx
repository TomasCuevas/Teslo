import { NextPage } from "next";

//* components *//
import { ProductList, FullScreenLoading } from "../../components";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* hooks
import { useGetProducts } from "../../hooks/useGetProducts";

const HomePage: NextPage = () => {
  const { products } = useGetProducts("/products?gender=kid");

  return (
    <ShopLayout
      title="Teslo"
      pageDescription="Encuentra los mejores productos para niños en Teslo"
    >
      <h2 className="mb-1 text-xl font-light">Productos de Niños</h2>

      {products.length < 1 ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products} />
      )}
    </ShopLayout>
  );
};

export default HomePage;
