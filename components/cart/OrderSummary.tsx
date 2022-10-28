/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

//* interface *//
interface Props {
  summary?: {
    numberOfItems: number;
    subtotal: number;
    taxes: number;
    total: number;
  };
}

export const OrderSummary: React.FC<Props> = ({ summary }) => {
  const { numberOfItems, subtotal, taxes, total } = summary
    ? summary
    : useContext(CartContext);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h3 className="text-primary">No. Productos</h3>
        <h4>{numberOfItems} productos</h4>
      </div>
      <div className="flex justify-between">
        <h3 className="text-gray">Subtotal</h3>
        <h4>
          {subtotal.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h4>
      </div>
      <div className="flex justify-between">
        <h3 className="text-gray">Impuestos (%15)</h3>
        <h4>
          {taxes.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h4>
      </div>
      <div className="mt-5 flex justify-between">
        <h3 className="font-bold">Total: </h3>
        <h4 className="font-bold">
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h4>
      </div>
    </div>
  );
};
