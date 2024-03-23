import React from "react";
import { CgClose } from "react-icons/cg";
import * as BaseToast from "@radix-ui/react-toast";

export type ToastType = "alert-success" | "alert-error";

interface Props {
  title: string;
  toastType?: ToastType;
}

function Toast(props: Props) {
  const { title, toastType = "alert-success" } = props;
  return (
    <>
      <BaseToast.Root className={`alert ${toastType}`}>
        <BaseToast.Title>{title}</BaseToast.Title>
        <BaseToast.Close asChild>
          <button>
            <CgClose size={14} />
          </button>
        </BaseToast.Close>
      </BaseToast.Root>

      <BaseToast.Viewport className="toast z-20" />
    </>
  );
}

export default Toast;
