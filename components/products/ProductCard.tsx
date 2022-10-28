import { useState } from "react";
import NextLink from "next/link";
import Image from "next/future/image";

//* interfaces *//
import { IProduct } from "../../interfaces/products";

interface Props {
  product: IProduct;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className=" group overflow-hidden rounded-md shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
        <a className="flex flex-col gap-2">
          <div className="relative shadow-sm">
            <span
              className={
                product.inStock === 0
                  ? "absolute left-3 top-3 z-10 rounded-full bg-secundary py-2 px-3 text-center text-xs font-medium text-white"
                  : "hidden"
              }
            >
              No hay disponibles
            </span>
            <span className="absolute top-0 left-0 h-full w-full transition-all duration-300 group-hover:bg-gray/5"></span>
            <Image
              src={isHovered ? product.images[1] : product.images[0]}
              alt={product.title}
              className="w-full"
              sizes="100%"
              onLoadingComplete={() => setIsImageLoaded(true)}
              width={0}
              height={0}
            />
          </div>
          <footer
            className={
              isImageLoaded
                ? "block animate-fadeIn px-2 py-1 md:px-3 md:py-3"
                : "hidden"
            }
          >
            <h3 className="font-bold text-primary">{product.title}</h3>
            <span className="font-light text-primary/80">${product.price}</span>
          </footer>
        </a>
      </NextLink>
    </article>
  );
};
