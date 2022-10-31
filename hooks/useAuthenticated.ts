import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

//* interfaces *//
type status = "loading" | "authenticated" | "unauthenticated";

interface Return {
  isAuthenticated: status;
}

export const useAuthenticated = (): Return => {
  const [isAuthenticated, setIsAuthenticated] = useState<status>("loading");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") setIsAuthenticated("authenticated");
    if (status === "unauthenticated") setIsAuthenticated("unauthenticated");
  }, [status]);

  return {
    isAuthenticated,
  };
};
