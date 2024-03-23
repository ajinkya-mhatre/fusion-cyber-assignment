import React from "react";

import Header from "@/components/Header";

interface Props {
  children: React.ReactNode;
}

function AuthPagesLayout(props: Props) {
  return (
    <div className="relative h-screen flex flex-col">
      <Header />
      <div className="flex flex-col center h-screen">
        <div className="space-y-4 max-w-[400px] w-full p-4 sm:p-0 select-none">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default AuthPagesLayout;
