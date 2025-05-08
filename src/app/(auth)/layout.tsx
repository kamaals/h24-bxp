import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex container items-center justify-center px-6 ">
      {children}
    </section>
  );
}
export default Layout;
