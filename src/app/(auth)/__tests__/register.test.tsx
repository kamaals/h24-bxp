import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import RegisterPage from "../register/page";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("Register Page", () => {
  it("Should render Register Page Correctly", () => {
    const result = render(<RegisterPage />);
    expect(result).toMatchSnapshot();
  });
});
