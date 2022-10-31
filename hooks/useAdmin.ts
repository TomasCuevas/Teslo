import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

//* interfaces *//
import { IUser } from "../interfaces/user";

type ValidUser = "loading" | "valid" | "invalid";

interface Return {
  isAdmin: boolean;
}

export const useAdmin = (redirectTo = "/", query = "/"): Return => {
  const { data: session, status } = useSession();
  const [isValidUser, setIsValidUser] = useState<ValidUser>("loading");

  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      if ((session?.user as IUser)?.role === "admin") {
        setIsValidUser("valid");
      } else {
        setIsValidUser("invalid");
      }
    }
  }, [session]);

  if (status === "authenticated" && isValidUser === "invalid") {
    router.push(redirectTo);
  }
  if (status === "unauthenticated") {
    router.push(`/auth/login?p=${query}`);
  }

  return {
    isAdmin: isValidUser === "valid",
  };
};
