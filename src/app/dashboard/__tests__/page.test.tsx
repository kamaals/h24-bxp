import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Dashboard from "../page";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("Dashboard Page", () => {
  it("renders the Dashboard Page correctly", () => {
    const result = render(<Dashboard />);
    expect(result).toMatchSnapshot();
  });
});
