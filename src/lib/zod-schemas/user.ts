/* istanbul ignore file @preserve */
import { createInsertSchema } from "drizzle-zod";
import { user } from "@/lib/db/schemas";
import { z } from "zod";

export const userSchema = createInsertSchema(user).omit({
  id: true,
});

export const loginSchema = z.object({
  email: z.string().email("Email required"),
  password: z.string().min(6, "Password required"),
});
