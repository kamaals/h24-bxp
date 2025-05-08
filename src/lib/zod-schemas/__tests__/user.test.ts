import { describe, it, expect } from "vitest";
import { userSchema } from "@/lib/zod-schemas/user";

describe(`Testing zod schema USER`, () => {
  it(`Should pass for valid user`, () => {
    const validCategory = {
      email: "john@doe.com",
      name: "John Doe",
      emailVerified: false,
      password: "SupaerPass@456",
    };

    const result = userSchema.safeParse(validCategory);
    expect(result.success).toBe(true);
  });

  it(`Should fail for invalid user`, () => {
    const validCategory = {
      name: 2,
    };
    const result = userSchema.safeParse(validCategory);
    expect(result.success).toBe(false);
  });
});
