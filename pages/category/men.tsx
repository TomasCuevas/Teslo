import { NextPage } from "next";

//* components *//
import { ProductList, FullScreenLoading } from "../../components";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* hooks
import { useGetProducts } from "../../hooks/useGetProducts";

const MenPage: NextPage = () => {
  const { products } = useGetProducts("/products?gender=men");

  return (
    <ShopLayout
      title="Teslo | Men"
      pageDescription="Encuentra los mejores productos para hombres en Teslo"
    >
      <h2 className="mb-1 text-xl font-light">Productos de Hombres</h2>

      {products.length < 1 ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products} />
      )}
    </ShopLayout>
  );
};

export default MenPage;
