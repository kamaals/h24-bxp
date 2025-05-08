/* istanbul ignore file @preserve */
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { connectDB } from "@/lib/db/db-connect";
import type { DB } from "@/lib/types/db";
import * as schema from "@/lib/db/schemas";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const getAuth = () => {
  const db = connectDB() as DB;
  return betterAuth({
    emailAndPassword: {
      enabled: true,
    },
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: schema,
    }),
    plugins: [nextCookies()],
  });
};

export const auth = getAuth();
