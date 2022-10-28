import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

//* interfaces *//
import { IUser } from "../interfaces/user";

type ValidUser = "loading" | "valid" | "invalid";

interface Props {
  query?: string;
}

interface Return {
  isValid: boolean;
  userId: string;
}

export const useValidUser = ({ query = "/" }: Props): Return => {
  const { data: session, status } = useSession();
  const [isValidUser, setIsValidUser] = useState<ValidUser>("loading");
  const [userId, setUserId] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setUserId((session.user as IUser)._id);
      setIsValidUser("valid");
    }
  }, [session]);

  if (status === "unauthenticated") {
    router.push(`/auth/login?p=${query}`);
  }

  return {
    isValid: isValidUser === "valid",
    userId,
  };
};
