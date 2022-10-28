//* components *//
import { ProductCard } from "../";

//* interfaces *//
import { IProduct } from "../../interfaces/products";

interface Props {
  products: IProduct[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <section className="grid grid-cols-2 gap-6 sm:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.slug} />
      ))}
    </section>
  );
};
