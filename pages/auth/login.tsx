/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signIn, getProviders } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";

//* icons *//
import { ErrorOutline } from "@mui/icons-material";

//* layout *//
import { AuthLayout } from "../../components/layouts";

//* components *//
import { ButtonPrimary, Chip, FullScreenLoading } from "../../components";

//* utils *//
import { isEmail } from "../../utils/validations";

//* hooks *//
import { useAuthenticated } from "../../hooks/useAuthenticated";

//* interfaces *//
interface FormData {
  email: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const { isAuthenticated } = useAuthenticated();

  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const query = router.query.p ? router.query.p.toString() : "/";

  useEffect(() => {
    if (isAuthenticated === "unauthenticated") {
      getProviders().then((prov) => {
        setProviders(prov);
      });
    }
  }, [isAuthenticated]);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const signInStatus = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if ((signInStatus as any).ok === false) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
    }
  };

  if (isAuthenticated === "authenticated") router.replace(query);
  if (isAuthenticated === "unauthenticated") {
    return (
      <AuthLayout title="Ingresar" pageDescription="Inicia sesion en Teslo">
        <section className="flex w-[300px] flex-col items-center gap-5 sm:w-[350px]">
          <h1 className="text-5xl font-bold text-primary">Iniciar Sesion</h1>
          {showError && (
            <Chip
              status="error"
              text="No reconocemos ese usuario / contraseña"
              icon={<ErrorOutline />}
            />
          )}

          <form className="w-full" onSubmit={handleSubmit(onLoginUser)}>
            <div className="flex w-full flex-col gap-2">
              <TextField
                label="Correo electronico"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Minimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <div className="my-3 h-[45px]">
                <ButtonPrimary text="Ingresar" color="blue" type="submit" />
              </div>
            </div>
            <div className="flex w-full justify-end">
              <NextLink href={`/auth/register?p=${query}`} passHref>
                <a className="text-secundary hover:underline">
                  ¿No tienes cuenta?
                </a>
              </NextLink>
            </div>
            <div className="flex flex-col items-center">
              <hr className="my-5 w-full text-gray/30" />
              {Object.values(providers).map((provider: any) => {
                if (provider.id! === "credentials")
                  return <div key={provider.id}></div>;

                return (
                  <Button
                    key={provider.id}
                    variant="outlined"
                    fullWidth
                    color="primary"
                    sx={{ mb: 1, borderRadius: "30px" }}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </Button>
                );
              })}
            </div>
          </form>
        </section>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Ingresar" pageDescription="Inicia sesion en Teslo">
      <FullScreenLoading />
    </AuthLayout>
  );
};

export default LoginPage;
