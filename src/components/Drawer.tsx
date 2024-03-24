import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Drawer(props: Props) {
  const { children, isOpen, onClose } = props;
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-base-300 bg-opacity-90 bg-white z-20"
          onClick={onClose}
        />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full max-w-[900px] overflow-auto bg-base-100 p-6 outline-none z-30">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Drawer;
