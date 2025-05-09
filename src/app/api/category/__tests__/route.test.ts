import { describe, it, expect } from "vitest";
import { GET, POST } from "../route";
import { ReasonPhrases } from "http-status-codes";
import httpMocks from "node-mocks-http";

describe("Categories API", async () => {
  it("Should return success", async () => {
    const resp = await GET();
    const body = await resp.json();
    expect(body.ReasonPhrases).toBe(ReasonPhrases.OK);
  });

  describe("POST", async () => {
    it("Should return error for invalid data", async () => {
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/category",
        body: { key: "value" },
      });
      const resp = await POST(req);
      const body = await resp.json();
      expect(body.message).toBe(ReasonPhrases.INTERNAL_SERVER_ERROR);
    });
  });
});
