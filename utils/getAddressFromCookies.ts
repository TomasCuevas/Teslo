import Cookies from "js-cookie";

//* interface *//
import { IAddress } from "../interfaces/address";

export const getAddressFromCookies = (): IAddress => {
  return {
    firstName: Cookies.get("firstName") || "",
    lastName: Cookies.get("lastName") || "",
    address: Cookies.get("address") || "",
    adress2: Cookies.get("adress2") || "",
    zip: Cookies.get("zip") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};
