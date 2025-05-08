import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import LoginPage from "../login/page";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("Login Page", () => {
  it("Should render Login Page Correctly", () => {
    const result = render(<LoginPage />);
    expect(result).toMatchSnapshot();
  });
});
