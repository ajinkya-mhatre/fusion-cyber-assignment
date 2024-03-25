import { useEffect, useState } from "react";
import { ToastType } from "@/components/Toast";

export function resolveDotPath(path: string, obj: object, separator = ".") {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev?.[curr], obj);
}

export const useToast = () => {
  const [toastText, setToastText] = useState("");
  const [toastType, setToastType] = useState<ToastType>("alert-success");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!!toastText) setToastText("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [toastText]);

  const setToast = (text: string, type: ToastType = "alert-success") => {
    setToastText(text);
    setToastType(type);
  };

  return { toastText, toastType, setToast };
};
