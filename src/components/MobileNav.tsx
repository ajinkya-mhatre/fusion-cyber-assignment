import React, { useState } from "react";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import { MENU_ITEMS } from "@/utils/constants";
import { useRouter } from "next/router";
import { IoCloseCircleOutline } from "react-icons/io5";
import Image from "next/image";

function MobileNav() {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="md:hidden">
      <Button
        text="Options"
        className="bg-[#2F80ED]"
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      />
      {showOptions && (
        <Drawer
          isOpen={true}
          onClose={() => {
            setShowOptions(false);
          }}
        >
          <div className="flex-ic justify-between">
            <div className="flex-ic gap-1 justify-center text-lg">
              <Image src="/logo.svg" alt="Logo" width={24} height={24} />
              Travel Companion
            </div>
            <IoCloseCircleOutline
              size={32}
              onClick={() => {
                setShowOptions(false);
              }}
              className="text-[#000000] text-2xl"
            />
          </div>
          <div className="center flex flex-col gap-4 my-4">
            {MENU_ITEMS.map((menuItem) => {
              const selectedNav =
                router.pathname === menuItem.link
                  ? "text-[#000000] font-medium"
                  : "text-[#5C5C5C] font-normal";
              return (
                <div key={menuItem.name}>
                  <button
                    className={`self-center md:text-[14px] lg:text-[16px] ${selectedNav}`}
                  >
                    {menuItem.name}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex-ic flex-col gap-[10px]">
            <Button
              type="secondary"
              text="Register"
              className="py3 px-3 md:py-[10px] md:px-[18px] text-[#2F80ED] text-sm md:text-[15px]"
              borderColorForSecondary="border-[#2F80ED]"
            />
            <Button
              text="Sign In"
              className="py3 px-3 bg-[#2F80ED] md:py-[10px] md:px-[18px] text-sm md:text-[15px]"
              onClick={() => router.push("/auth/login")}
            />
          </div>
        </Drawer>
      )}
    </div>
  );
}

export default MobileNav;
