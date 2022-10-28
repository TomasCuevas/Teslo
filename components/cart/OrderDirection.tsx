/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import NextLink from "next/link";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

//* interface *//
import { ShippingAddress } from "../../interfaces/order";

interface Props {
  shippingAddressProps?: ShippingAddress;
}

export const OrderDirection: React.FC<Props> = ({ shippingAddressProps }) => {
  const { shippingAddress } = useContext(CartContext);

  const [
    { firstName, lastName, address, zip, city, country, phone },
    setShipping,
  ] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    const { firstName, lastName, address, zip, city, country, phone } =
      shippingAddressProps ? shippingAddressProps : shippingAddress;

    setShipping({ firstName, lastName, address, zip, city, country, phone });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <h2 className="text-primary">Direccion de entrega</h2>
        <NextLink href="/checkout/address" passHref>
          <a className="text-secundary hover:underline">Editar</a>
        </NextLink>
      </div>
      <div className="flex justify-between">
        <h3 className="text-gray">
          {firstName} {lastName}
        </h3>
      </div>
      <div className="flex justify-between">
        <h3 className="text-gray">{address}</h3>
      </div>
      <div className="flex justify-between">
        <h3 className="text-gray">
          {city}, {zip}
        </h3>
      </div>
      <div className="flex justify-between">
        <h3 className="text-gray">{country}</h3>
      </div>
      <div className="flex justify-between">
        <h3 className="text-gray">{phone}</h3>
      </div>
    </div>
  );
};
