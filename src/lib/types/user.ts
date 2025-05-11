/* istanbul ignore file @preserve */
import { loginSchema, userSchema } from "@/lib/zod-schemas/user";
import { z } from "zod";

export type UserType = z.infer<typeof userSchema>;

export type LoginType = z.infer<typeof loginSchema>;
