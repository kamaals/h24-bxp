import { describe, it, expect } from "vitest";
import { GET } from "../route";
import { ReasonPhrases } from "http-status-codes";

describe("Categories API", async () => {
  it("Should return success", async () => {
    const resp = await GET();
    const body = await resp.json();
    expect(body.ReasonPhrases).toBe(ReasonPhrases.OK);
  });
});
