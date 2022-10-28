import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SWRConfig } from "swr";

//* utils *//
import { fetcher } from "../utils";

//* providers *//
import { AuthProvider } from "../context/auth/AuthContext";
import { CartProvider } from "../context/cart/CartContext";
import { UiProvider } from "../context/ui/UiContext";

//* theme and styles *//
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIEND! }}
      >
        <SWRConfig
          value={{
            fetcher: fetcher,
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UiProvider>
                <Component {...pageProps} />
              </UiProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}

export default MyApp;
