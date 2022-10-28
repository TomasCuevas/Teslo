import { useContext, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";

//* icons *//
import { ErrorOutline } from "@mui/icons-material";

//* layout *//
import { AuthLayout, LoadingLayout } from "../../components/layouts";

//* components *//
import { ButtonPrimary, Chip } from "../../components";

//* utils *//
import { isEmail } from "../../utils/validations";

//* context *//
import { AuthContext } from "../../context/auth/AuthContext";

//* interfaces *//
interface Props {
  query: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: NextPage<Props> = ({ query = "/" }) => {
  const { onRegister } = useContext(AuthContext);
  const { status } = useSession();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onRegisterUser = async ({ name, email, password }: FormData) => {
    setShowError(false);

    const { hasError, message } = await onRegister(name, email, password);
    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 4000);
      return;
    }

    const destination = query || "/";
    router.replace(destination);
  };

  if (status === "authenticated") router.replace(query);
  if (status === "unauthenticated") {
    return (
      <AuthLayout title="Registro" pageDescription="Registrate en Teslo">
        <section className="flex w-[300px] flex-col items-center gap-5 sm:w-[350px]">
          <h1 className="text-5xl font-bold text-primary">Registro</h1>
          {showError && (
            <Chip text={errorMessage} status="error" icon={<ErrorOutline />} />
          )}
          <form className="w-full" onSubmit={handleSubmit(onRegisterUser)}>
            <div className="flex w-full flex-col gap-2">
              <TextField
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido.",
                  minLength: { value: 2, message: "Minimo 2 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Correo electronico"
                type="email"
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
                  required: "Este campo es requerido.",
                  minLength: { value: 6, message: "Minimo 6 caracteres." },
                })}
                error={!!errors.password}
                helperText={errors.email?.message}
              />
              <div className="my-3 h-[45px]">
                <ButtonPrimary text="Registrarse" color="blue" type="submit" />
              </div>
              <div className="flex w-full justify-end">
                <NextLink href={`/auth/login?p=${query}`} passHref>
                  <a className="text-secundary hover:underline">
                    ¿Ya tienes una cuenta?
                  </a>
                </NextLink>
              </div>
            </div>
          </form>
        </section>
      </AuthLayout>
    );
  }

  return <LoadingLayout title="Cargando" />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { p = "/" } = query;

  return {
    props: {
      query: p,
    },
  };
};

export default RegisterPage;
