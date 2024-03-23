import React from "react";
import { useRouter } from "next/router";

import { MENU_ITEMS } from "@/utils/constants";

function DesktopNav() {
  const router = useRouter();

  return (
    <div className="hidden flex-wrap md:gap-2 lg:gap-12 md:flex-ic">
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
  );
}

export default DesktopNav;
