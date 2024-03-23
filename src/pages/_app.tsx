import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import * as BaseToast from "@radix-ui/react-toast";

import Toast, { ToastType } from "@/components/Toast";

export type SetToastTextType = (text: string, type?: ToastType) => void;

export const GlobalStateContext = createContext({
  setToastText: (() => undefined) as SetToastTextType,
});
export default function App({ Component, pageProps }: AppProps) {
  const [toastText, setToastText] = useState("");
  const [toastType, setToastType] = useState<ToastType>("alert-success");
  useEffect(() => {
    setTimeout(() => {
      if (!!toastText) setToastText("");
    }, 5000);
  }, [toastText]);

  const setToast = (text: string, type: ToastType = "alert-success") => {
    setToastText(text);
    setToastType(type);
  };
  return (
    <GlobalStateContext.Provider
      value={{
        setToastText: setToast,
      }}
    >
      <BaseToast.Provider duration={5000}>
        {!!toastText && <Toast title={toastText} toastType={toastType} />}
        <Component {...pageProps} />
      </BaseToast.Provider>
    </GlobalStateContext.Provider>
  );
}
