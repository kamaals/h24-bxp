import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import Logout from "@/components/molecules/auth/logout";
import { LogInIcon } from "lucide-react";

export function NavLoggedOut() {
  return (
    <ul className="flex gap-4 items-center">
      <li>
        <Link href={"/register"}>Register</Link>
      </li>
      <li className={"flex items-center gap-2"}>
        <LogInIcon size={16} />
        <Link href={"/login"}>Login</Link>
      </li>
    </ul>
  );
}

export function NavLoggedIn() {
  return (
    <ul className="flex gap-4 items-center">
      <li>
        <Link href={"/dashboard"}>Dashboard</Link>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}
/* istanbul ignore next @preserve */
export async function GreetingMenu() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  /* istanbul ignore next */
  return !session ? <NavLoggedOut /> : <NavLoggedIn />;
}

export function UserGreet() {
  return (
    <h1 className="text-4xl">
      Hej! welcome back, please continue to{" "}
      <Link href={"/dashboard"}>Dashboard</Link>
    </h1>
  );
}

export function AnonGreet() {
  return (
    <h1 className="text-4xl">
      Hej! welcome back, please continue to{" "}
      <Link href={"/dashboard"}>Dashboard</Link>
    </h1>
  );
}
/* istanbul ignore next @preserve */
async function Greeting() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  /* istanbul ignore next @preserve */
  return !session ? <AnonGreet /> : <UserGreet />;
}

export default Greeting;
