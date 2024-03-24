import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import DesktopNav from "@/components/DesktopNav";
import Button from "@/components/Button";
import MobileNav from "@/components/MobileNav";

interface HeaderProps {
  isAuthenticated: boolean;
}
function Header(props: HeaderProps) {
  const { isAuthenticated } = props;
  const router = useRouter();
  const isAuthPage = router.pathname.startsWith("/auth");

  return (
    <div
      className={`h-[68px] fixed top-0 left-0 w-full z-10 bg-white sm:px-[100px] flex-ic p-4 font-medium sm:flex-initial ${
        isAuthPage ? "justify-center md:justify-start" : "justify-between"
      }`}
    >
      <div className="flex-ic gap-1 justify-center text-lg">
        <Image src="/logo.svg" alt="Logo" width={24} height={24} />
        Travel Companion
      </div>
      <div>
        {!isAuthPage && (
          <>
            <DesktopNav />
            <MobileNav isAuthenticated={isAuthenticated} />
          </>
        )}
      </div>
      {!isAuthPage && !isAuthenticated && (
        <div className="hidden md:flex-ic gap-[10px]">
          <Button
            type="secondary"
            text="Register"
            className="py3 px-3 md:py-[10px] md:px-[18px] text-[#2F80ED] text-sm md:text-[15px]"
            borderColorForSecondary="border-[#2F80ED]"
            onClick={() => router.push("/auth/register")}
          />
          <Button
            text="Sign In"
            className="py3 px-3 bg-[#2F80ED] md:py-[10px] md:px-[18px] text-sm md:text-[15px]"
            onClick={() => router.push("/auth/login")}
          />
        </div>
      )}
      {!isAuthPage && isAuthenticated && (
        <div className="hidden md:flex">
          <Button
            text="Dashboard"
            className="max-w-fit py3 px-3 bg-[#2F80ED] md:py-[10px] md:px-[18px] text-sm md:text-[15px]"
            onClick={() => router.push("/home")}
          />
        </div>
      )}
    </div>
  );
}

export default Header;
