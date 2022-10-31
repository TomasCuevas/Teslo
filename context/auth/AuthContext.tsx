import { createContext, useEffect, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import axios from "axios";
import Cookies from "js-cookie";

import tesloApi from "../../axios/tesloApi";
import { IUser } from "../../interfaces/user";

//* CONTEXT *//
//* CONTEXT *//
interface AuthContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  onLogout: () => void;
  onRegister: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
}

export const AuthContext = createContext({} as AuthContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    if (status === "authenticated") {
      setUser(data?.user as IUser);
      setIsLoggedIn(true);
    }
  }, [data, status]);

  const onRegister = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;

      Cookies.set("token", token);

      setIsLoggedIn(true);
      setUser(user);

      await signIn("credentials", { email, password });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data as { message: string };

        return {
          hasError: true,
          message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const onLogout = async () => {
    Cookies.remove("cart");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("phone");
    Cookies.remove("zip");

    await signOut();

    setIsLoggedIn(false);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        // properties
        isLoggedIn,
        user,

        // methods
        onLogout,
        onRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
