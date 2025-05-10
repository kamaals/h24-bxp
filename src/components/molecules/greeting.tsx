import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import Logout from "@/components/molecules/auth/logout";
import { LogInIcon } from "lucide-react";

export async function GreetingMenu() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
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
  return (
    <ul className="flex gap-4 items-center">
      <li>
        <Link href={"/register"}>Dashboard</Link>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

async function Greeting() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return (
      <h1 className="text-4xl">
        Hej! Please <Link href={"/login"}>Login</Link> to continue
      </h1>
    );
  }
  return (
    <h1 className="text-4xl">
      Hej! welcome back, please continue to{" "}
      <Link href={"/dashboard"}>Dashboard</Link>
    </h1>
  );
}

export default Greeting;
