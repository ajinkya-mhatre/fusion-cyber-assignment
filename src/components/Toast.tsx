import React from "react";
import { CgClose } from "react-icons/cg";
import * as BaseToast from "@radix-ui/react-toast";

export type ToastType = "alert-success" | "alert-error";

interface ToastProps {
  title: string;
  toastType?: ToastType;
}

const Toast: React.FC<ToastProps> = ({
  title,
  toastType = "alert-success",
}) => {
  return (
    <>
      <BaseToast.Root
        className={`${toastType === "alert-success" ? "text-green-500" : "text-red-600"} bg-white shadow-2xl shadow-black rounded-md p-[15px] flex-ic gap-2"`}
      >
        <BaseToast.Title className="text-sm">{title}</BaseToast.Title>
        <BaseToast.Close asChild>
          <button className="ml-2">
            <CgClose size={16} color="black" />
          </button>
        </BaseToast.Close>
      </BaseToast.Root>
      <BaseToast.Viewport className="fixed bottom-12 right-4 md:right-12 flex flex-col gap-[10px] w-fit max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </>
  );
};

export default Toast;
