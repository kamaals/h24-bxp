import { createInsertSchema } from "drizzle-zod";
import { user } from "@/lib/db/schemas";

export const userSchema = createInsertSchema(user).omit({
  id: true,
});
