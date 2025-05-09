/* istanbul ignore file @preserve */
import env from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import type { DB } from "@/lib/types/db";
import * as schema from "@/lib/db/schemas";

let db: null | DB = null;

export const connectDB = () => {
  try {
    if (db) return db;
    db = drizzle(env.DATABASE_URL, { schema }) as DB;
    return db;
  } catch (e) {
    console.log(e);
  }
};
