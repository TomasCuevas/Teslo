//* interfaces *//
import { IValidSizes } from "../../interfaces/products";

interface Props {
  selectedSize?: IValidSizes;
  sizes: IValidSizes[];
  changeSize: (size: IValidSizes) => void;
}

export const SizeSelector: React.FC<Props> = ({
  selectedSize,
  sizes,
  changeSize,
}) => {
  return (
    <div>
      {sizes.map((size) => (
        <button
          className={
            selectedSize === size
              ? "min-w-[65px] rounded-xl bg-primary px-5 py-1 text-center text-sm font-bold text-white"
              : "min-w-[65px] animate-fadeIn rounded-xl px-5 py-1 text-center text-sm font-bold text-primary transition-all duration-300 hover:bg-primary/10"
          }
          onClick={() => changeSize(size)}
          key={size}
        >
          {size}
        </button>
      ))}
    </div>
  );
};
