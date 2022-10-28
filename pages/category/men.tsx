import type { NextPage } from "next";

//* components *//
import { ProductList, FullScreenLoading } from "../../components";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* hooks
import { useProducts } from "../../hooks/useProducts";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title="Teslo"
      pageDescription="Encuentra los mejores productos para hombres en Teslo"
    >
      <h2 className="mb-1 text-xl font-light">Productos de Hombres</h2>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
