import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Return {
  authenticated: "loading" | "authenticated" | "unauthenticated";
}

export const useAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState("loading");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") setIsAuthenticated("authenticated");
    if (status === "unauthenticated") setIsAuthenticated("unauthenticated");
  }, [status]);

  return {
    isAuthenticated,
  };
};
