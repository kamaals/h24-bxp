/* istanbul ignore file @preserve */
import env from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import type { DB } from "@/lib/types/db";

let db: null | DB = null;

export const connectDB = (url = env.DATABASE_URL) => {
  try {
    if (db) return db;
    db = drizzle(url) as DB;
    return db;
  } catch (e) {
    console.log(e);
  }
};
