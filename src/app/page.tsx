import React from "react";
import Greeting, { GreetingMenu } from "@/components/molecules/greeting";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product CRUD",
  description: "Product Hompage",
};

export default function Home() {
  return (
    <section className={"container mx-auto max-w-xl p-5 space-y-10"}>
      <header>
        <nav>
          <GreetingMenu />
        </nav>
      </header>
      <main>
        <Greeting />
      </main>
    </section>
  );
}
