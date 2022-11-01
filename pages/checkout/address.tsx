/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

//* components *//
import { ButtonPrimary, FullScreenLoading } from "../../components";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* utils *//
import { countries, getAddressFromCookies } from "../../utils";

//* hooks *//
import { useAuthenticated } from "../../hooks";

//* context *//
import { CartContext } from "../../context/cart/CartContext";

//* interface *//
import { IAddress } from "../../interfaces/address";

const AddressPage: NextPage = () => {
  const { isAuthenticated } = useAuthenticated();
  const { updateAddress, numberOfItems } = useContext(CartContext);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddress>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmitAddress = (data: IAddress) => {
    updateAddress(data);
    return router.push("/checkout/summary");
  };

  useEffect(() => {
    if (numberOfItems === 0) router.push("/");
  }, [numberOfItems]);

  if (isAuthenticated === "unauthenticated") {
    router.push("/auth/login?p=/checkout/address");
  }
  if (isAuthenticated === "authenticated" && numberOfItems > 0) {
    return (
      <ShopLayout
        title="Direccion"
        pageDescription="Confirmar direccion del destino"
      >
        <h1 className="mb-2 text-3xl font-bold text-primary">Direccion</h1>

        <form
          className="flex flex-col gap-7"
          onSubmit={handleSubmit(onSubmitAddress)}
        >
          <div className="grid grid-flow-row gap-3 sm:grid-cols-2">
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register("firstName", {
                required: "Este campo es requerido",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register("lastName", {
                required: "Este campo es requerido",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
            <TextField
              label="Direccion"
              variant="filled"
              fullWidth
              {...register("address", {
                required: "Este campo es requerido",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
            <TextField
              label="Direccion 2 (opcional)"
              variant="filled"
              fullWidth
              {...register("adress2", {})}
              error={!!errors.adress2}
              helperText={errors.adress2?.message}
            />
            <TextField
              label="Codigo Postal"
              variant="filled"
              fullWidth
              {...register("zip", {
                required: "Este campo es requerido",
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              {...register("city", {
                required: "Este campo es requerido",
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
            <TextField
              select
              variant="filled"
              label="Pais"
              {...register("country", {
                required: "Este campo es requerido",
              })}
              error={!!errors.country}
              helperText={errors.country?.message}
            >
              {countries.map((contry) => (
                <MenuItem key={contry.code} value={contry.name}>
                  {contry.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Telefono"
              variant="filled"
              fullWidth
              {...register("phone", {
                required: "Este campo es requerido",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </div>
          <div className="flex h-10 w-full justify-center">
            <ButtonPrimary text="Revisar pedido" type="submit" />
          </div>
        </form>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout
      title="Direccion"
      pageDescription="Confirmar direccion del destino"
    >
      <FullScreenLoading />
    </ShopLayout>
  );
};

export default AddressPage;
