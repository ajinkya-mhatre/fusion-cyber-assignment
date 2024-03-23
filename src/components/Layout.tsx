import React from "react";
import Header from "@/components/Header";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { children } = props;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-4 py-4 sm:px-8">{children}</main>
    </div>
  );
}

export default Layout;
