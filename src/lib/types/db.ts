import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "@/lib/db/schemas";

export type DB = PostgresJsDatabase<typeof schema>;
