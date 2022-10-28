import type { NextPage } from "next";

//* components *//
import { ProductList, FullScreenLoading } from "../../components";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* hooks
import { useProducts } from "../../hooks/useProducts";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title="Teslo"
      pageDescription="Encuentra los mejores productos para mujeres en Teslo"
    >
      <h2 className="mb-1 text-xl font-light">Productos de Mujeres</h2>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
