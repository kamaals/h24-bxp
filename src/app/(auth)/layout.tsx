import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex container items-center justify-center mx-auto max-w-sm">
      {children}
    </section>
  );
}
export default Layout;
