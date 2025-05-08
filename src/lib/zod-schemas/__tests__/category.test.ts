import { describe, it, expect } from "vitest";
import { categorySchema } from "@/lib/zod-schemas/category";

describe(`Testing zod schema CATEGORY`, () => {
  it(`Should pass for valid category`, () => {
    const validCategory = {
      name: "Test Category",
    };

    const result = categorySchema.safeParse(validCategory);
    expect(result.success).toBe(true);
  });

  it(`Should fail for invalid category`, () => {
    const validCategory = {
      name: 2,
    };
    const result = categorySchema.safeParse(validCategory);
    expect(result.success).toBe(false);
  });
});
