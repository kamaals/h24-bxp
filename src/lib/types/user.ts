import { userSchema } from "@/lib/zod-schemas/user";
import { z } from "zod";

export type UserType = z.infer<typeof userSchema>;
