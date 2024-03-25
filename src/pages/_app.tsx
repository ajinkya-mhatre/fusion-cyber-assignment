import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import * as BaseToast from "@radix-ui/react-toast";

const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  // This is to avoid hydration mismatch errors
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <BaseToast.Provider duration={5000} swipeDirection={"right"}>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </BaseToast.Provider>
      </QueryClientProvider>
    );
  }
}
