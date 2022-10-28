//* icons *//
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";

//* interfaces *//
import { ICartProduct } from "../../interfaces/cart";

interface Props {
  count: number;
  product: ICartProduct;
  modifyCount: (add: boolean, product: ICartProduct) => void;
}

export const ItemCounter: React.FC<Props> = ({
  modifyCount,
  count,
  product,
}) => {
  return (
    <div className="flex items-center">
      <RemoveCircleOutline
        className="cursor-pointer text-gray"
        onClick={() => modifyCount(false, product)}
      />
      <span className="w-10 text-center font-bold text-primary">{count}</span>
      <AddCircleOutline
        className="cursor-pointer text-gray"
        onClick={() => modifyCount(true, product)}
      />
    </div>
  );
};
