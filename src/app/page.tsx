import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>Welcome!</h1>
      <header>
        <Link href={"/dashboard"}>Dash</Link>
        <Link href={"/login"}>Login</Link>
      </header>
      <main>
        <p>Hello and welcome!</p>
      </main>
      <footer>Hi</footer>
    </section>
  );
}
